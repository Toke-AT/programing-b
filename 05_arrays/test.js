let campaigns = [
  {id:'s',n:'Sikkerhed', proto:[0.3,0.4,0.2,0.8,0.9], col:[200,60,60], head:'Tryghed først', txt:(p)=>`${p.name}, vi prioriterer ro og sikkerhed.`},
  {id:'e',n:'Økonomi',  proto:[0.4,0.7,0.6,0.8,0.3], col:[40,120,200], head:'Vækst og job', txt:(p)=>`${p.name}, fokus på job og økonomisk fremgang.`},
  {id:'f',n:'Frihed',   proto:[0.7,0.8,0.8,0.4,0.3], col:[80,190,120], head:'Frihed og valg', txt:(p)=>`${p.name}, frihed og muligheder for alle.`},
  {id:'c',n:'Fællesskab',proto:[0.9,0.4,0.5,0.6,0.2], col:[180,100,200], head:'Sammenhold', txt:(p)=>`${p.name}, fællesskab skaber tryghed.`}
];

let sliders = {}, nameIn, result=null;

function setup(){
  createCanvas(windowWidth,windowHeight);
  textFont('Arial');
  // Inputs
  nameIn = createInput('Mig').position(12,17).size(160);
  sliders.a = createSlider(0,100,50).position(12,40).style('width','200px');
  sliders.e = createSlider(0,100,50).position(12,72).style('width','200px');
  sliders.o = createSlider(0,100,50).position(12,104).style('width','200px');
  sliders.c = createSlider(0,100,50).position(12,136).style('width','200px');
  sliders.n = createSlider(0,100,50).position(12,168).style('width','200px');
  createP('Navn').position(12, -2).style('margin','0 0 0 0');
  createP('Venlighed').position(220,34).style('margin','0');
  createP('Udadvendthed').position(220,66).style('margin','0');
  createP('Nysgerrig/Åbenhed').position(220,98).style('margin','0');
  createP('Ordenlighed').position(220,130).style('margin','0');
  createP('Følsomhed').position(220,162).style('margin','0');
  createButton('Generer kampagne').position(12,200).mousePressed(onGen);
  createButton('Reset').position(160,200).mousePressed(()=>{result=null; nameIn.value('Mig'); for(let k in sliders) sliders[k].value(50);});
}

function draw(){
  background(250);
  textSize(16); fill(0); text('Spørgeskema (Big Five)', 12, 240);
  // Vis kampagner kort til højre
  let cx = width - 320, cy = 20;
  textSize(14); text('Kampagnetemaer', cx, cy+12);
  for(let i=0;i<campaigns.length;i++){
    let c = campaigns[i];
    fill(c.col); rect(cx, cy+30+i*60, 300,46,6);
    fill(255); textSize(16); textAlign(LEFT, CENTER); text(c.head, cx+12, cy+30+i*60+23);
  }
  // Vis resultat hvis genereret
  if(result){
    drawCard(result);
  } else {
    textAlign(LEFT); textSize(13); fill(80);
    text('Udfyld felter og tryk "Generer kampagne" for at se dit skræddersyede kampagnekort (fiktivt).',12, 290);
  }
}

function onGen(){
  let p = {
    name: nameIn.value() || 'Uden navn',
    agreeable: sliders.a.value()/100,
    extra: sliders.e.value()/100,
    open: sliders.o.value()/100,
    consc: sliders.c.value()/100,
    neuro: sliders.n.value()/100
  };
  // find nærmeste kampagne (Euclidisk distance)
  let best=null;
  for(let c of campaigns){
    let proto = c.proto;
    let d = Math.sqrt(
      sq(p.agreeable-proto[0]) + sq(p.extra-proto[1]) + sq(p.open-proto[2]) + sq(p.consc-proto[3]) + sq(p.neuro-proto[4])
    );
    if(best===null || d<best.d) best = {camp:c, d:d};
  }
  result = {profile:p, campaign:best.camp, score:best.d};
}

function drawCard(r){
  let cx = 12, cy = 320, w = min(640, width-40), h = 220;
  let c = r.campaign;
  // baggrund
  noStroke(); fill(245); rect(cx-6,cy-6,w+12,h+12,8);
  // banner
  fill(c.col); rect(cx,cy,w,80,6);
  fill(255); textSize(22); textAlign(LEFT, CENTER); text(c.head, cx+12, cy+40);
  // profil
  fill(255); rect(cx+12, cy+96, 260,28,14);
  fill(20); textSize(13); text(`${r.profile.name} • match-score ${nf(r.score,1,3)}`, cx+20, cy+116);
  // body
  fill(30); textSize(14); textAlign(LEFT, TOP);
  let body = c.txt(r.profile);
  text(body + '\n\nMatch forklaret: ' + explain(r.profile, c.proto), cx+12, cy+140, w-24, h-120);
}

// enkel forklaring: top-2 alignments
function explain(p, proto){
  let traits = ['agreeable','extra','open','consc','neuro'];
  let names = ['Samarbejdsvillig','Udadvendt','Nysgerrig','Struktureret','Følsom'];
  let arr = [];
  for(let i=0;i<traits.length;i++) arr.push({n:names[i],score:1 - Math.abs(p[traits[i]]-proto[i])});
  arr.sort((a,b)=>b.score-a.score);
  return arr[0].n + ' og ' + arr[1].n;
}
