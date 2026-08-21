# 11. MQTT: send & skift side (2. år)

Én side **sender** MQTT. En anden **skifter / åbner**, når beskeden lander.  
Plus menu fra DOM, `shiftPage` og toast.

**Demo:** [https://simmoe.github.io/Programmering_B/11_AAR_2_START/](https://simmoe.github.io/Programmering_B/11_AAR_2_START/)  
**Opgave:** [OPGAVE.md](OPGAVE.md)  
**Læringsrum:** [11_0_LAERINGSRUM](../11_0_LAERINGSRUM/README.md) — VS Code uden AI + Cursor som lærer

---

## Sådan virker MQTT

MQTT er beskeder via en **broker**.  
Nogen **publisher** en besked på et **topic**. Alle der **subscriber** på samme topic, modtager den.

![MQTT-oversigt: Publisher sender til broker på et topic, subscriber modtager beskeden](assets/mqtt-oversigt.png)

I vores eksempel:

- Publisher = din **send-side** (eller MQTT Explorer / senere en M5)
- Broker = `mqtt.nextservices.dk`
- Topic = `programmering` (eller dit eget)
- Subscriber = samme hjemmeside, som kalder `shiftPage` / viser noget

---

## Menu fra et DOM-array

```js
let allPages = selectAll('.page')

allPages.map(p => {
  let m = createDiv(p.attribute('title'))
  m.mousePressed(() => shiftPage('#' + p.attribute('id')))
  select('footer').child(m)
})
```

HTML-siderne **bliver** menuen. Tilføj en side → menuen følger med.

**Reference:** [p5 selectAll](https://p5js.org/reference/p5/selectAll/) · [p5 createDiv](https://p5js.org/reference/p5/createDiv/)

---

## `shiftPage`

```js
let currentPage = '#page1'

function shiftPage(newId) {
  select(currentPage).removeClass('show')
  select(newId).addClass('show')
  currentPage = newId
}
```

**Reference:** [p5 addClass](https://p5js.org/reference/p5.Element/addClass/) · [p5 removeClass](https://p5js.org/reference/p5.Element/removeClass/)

---

## Send MQTT fra en knap

```js
select('#sendBtn').mousePressed(() => {
  let tekst = select('#msgInput').value()
  client.publish('programmering', tekst)
  showToast('Sendt: ' + tekst)
})
```

---

## Modtag → skift side

```js
client.on('message', (topic, message) => {
  let msg = message.toString().trim()
  showToast('Modtog: ' + msg)

  if (msg === '2' || msg === 'page2') {
    shiftPage('#page2')
  }
})
```

Publish `1`, `2`, `page2` — eller dine egne koder — og lad siden reagere.

**Reference:** [mqtt.js](https://github.com/mqttjs/MQTT.js)

---

← [Forrige: Læringsrum](../11_0_LAERINGSRUM/README.md) · [Pensum](../PENSUM.md) · → [Næste: Personligt API](../12_PERSONLIGT_API/README.md)
