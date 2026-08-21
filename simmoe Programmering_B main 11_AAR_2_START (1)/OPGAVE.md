# MQTT: send & skift side

**Programmering B — 2. år**  
**Udgangspunkt:** denne mappe (`11_AAR_2_START`)  
**Setup:** [Læringsrum](../11_0_LAERINGSRUM/README.md) (VS Code til kode · Cursor til spørgsmål)

---

## Opgaven

Lav et lille projekt med **mindst to sider**:

1. **Send-side** — her **publisher** du noget via MQTT (knap, input, valg …)
2. **Reaktion-side(r)** — her sker der noget synligt, når beskeden lander  
   (skift side med `shiftPage`, åbn/vis indhold, toast, lyd …)

Du skal både **sende** og **modtage** — i samme projekt.

Idéen er den samme som i timen: beskeder på et topic kan styre, hvad der sker på skærmen.

---

## Krav til produktet

### To roller på siden
- Mindst **én send-side** med tydelig UI til at sende (fx knapper eller tekstfelt + send)
- Mindst **én reaktion**, når MQTT-besked modtages — fx:
  - `shiftPage` til en bestemt side
  - vise/skjule et element
  - `showToast` med beskeden
  - starte lyd / animation
- Det skal virke, når **du selv** sender fra din send-side  
  (bonus: det virker også fra MQTT Explorer / en kammerats side på samme topic)

### Sider & navigation
- Mindst **2 sider** (`.page`) — gerne flere, hvis reaktionerne har egne skærme
- Hver side har `id` og `title`
- Menu fra DOM med `selectAll('.page')` + `shiftPage()`
- `shiftPage()` bruger `addClass('show')` / `removeClass('show')`

### MQTT
- Connect til `wss://mqtt.nextservices.dk`
- Subscribe på et topic (fx `programmering` eller dit eget hold-topic)
- Publish fra send-siden med `client.publish(topic, besked)`
- I `message`-callbacken: læs teksten og **reager** (side-skift / UI)

### Feedback
- Brug gerne toast, når du forbinder eller modtager en besked
- Mindst én synlig reaktion ud over “tekst i konsollen”

---

## Tips

- Start med: knap → `publish` → se beskeden i toast eller på siden
- Så: hvis besked er `2` (eller `rum2`, `åbn`, …) → `shiftPage(...)`
- Aftal topic med dem, du tester med — ellers får I hinandens beskeder
- Kør via Live Server (ikke `file://`)

---

## Du skal kunne forklare

- Forskellen på **publish** og **subscribe**
- Hvor i koden du **sender**, og hvor du **modtager**
- Hvordan en MQTT-besked får siden til at skifte / åbne noget
- Hvordan menuen bygges fra `selectAll('.page')`
- Hvad `addClass` / `removeClass` gør i `shiftPage()`

---

## Aflevering

- Færdigt projekt i mappen
- Kort fremvisning: **send noget** → **vis reaktionen** (side-skift eller åbning) live
