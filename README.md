# Lee Jia Xian — Marine Engineering & Design Portfolio

A 14-page engineering portfolio built as a simple website.
It works three ways:

1. **Website** — hosted free on GitHub Pages.
2. **PDF** — click **Save as PDF** (bottom-right) and choose *Save as PDF* in the print dialog. Each section becomes one A4 landscape page, ready to upload to LinkedIn.
3. **Phone** — the pages reflow automatically on small screens.

No build tools, no frameworks — just HTML, CSS and a little JavaScript for the charts.

---

## Folder structure

```
index.html          ← all 14 portfolio pages
css/style.css       ← colours, fonts and layout
js/charts.js        ← charts drawn from real project data
assets/img/         ← images
.nojekyll           ← tells GitHub Pages to serve files as-is
```

---

## Put it on GitHub Pages (about 5 minutes)

1. Go to **github.com → New repository**. Name it e.g. `portfolio` and set it to **Public**.
2. Click **uploading an existing file**, drag in *everything inside this folder* (keep the folders), then **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

Add that link to your LinkedIn *Featured* section and your resume header.

---

## Finish the content before sharing

### 1. Replace the orange dashed boxes with your images
Search `index.html` for `class="placeholder"`. Replace each whole block, e.g.

```html
<div class="placeholder"> … </div>
```

with

```html
<figure><img src="assets/img/lobe-pump-render.jpg" alt="Final lobe pump design in Fusion 360"><figcaption><b>FIG 4.1</b> Final design</figcaption></figure>
```

Put the image file in `assets/img/`. Images still needed:

All charts and images are filled in from your own files. The only things left are a few highlighted gaps:

| Page | To fill in |
|---|---|
| 10 | Your part in the NME2111 analytics project |
| 13 | Your part in the Arduino autonomous ship |

### 2. Fill in the highlighted text
Search for `class="todo"`. These are details only you know — your exact contribution to group work, key results, dataset names. Write them in, then delete the `<span class="todo">` and `</span>` tags around them.

### 3. Rewrite the reflections in your own voice
The italic lines — and the occasional labels like *What surprised me*, *If I did this again…*, *What didn't go as expected* — are starting drafts. Change them so they sound like you, and keep them honest. They appear on only a few pages on purpose.

### 4. Check these facts
- **Crane capacity (page 08):** the chart uses **250 MT** from your report's crane-capacity section (39% margin over the 180 MT heaviest block). The shipyard layout slide lists a **300 MT** Goliath crane. Pick one and make both match — change `CRANE_MT` in `js/charts.js`.
- **Tools on page 11:** Python, pandas and scikit-learn are listed, as named in your report.
- **Email (page 14):** check `leejiiaxiann@gmail.com` is correct.

---

## Data used

All numbers come from your own project files:

- **Maxsurf (pages 04–05):** hydrostatics and Holtrop resistance/power table from `04_Offset_Table_Lee_Jia_Xian_finish_final.xlsx` — 126 m LBP, 30.24 m beam, 7 m draft, 16,626 t displacement, C<sub>B</sub> 0.577, 847.3 kN and 8,717 kW at 20 kn.
- **Resistance prediction (page 06):** your Holtrop–Mennen tab in `NME2107_Project_156m_Group2.xlsx` — total resistance 10–16 kn vs Maxsurf (within 1.6%), viscous/wave shares.
- **Towing tank (page 06):** `Resistance_OIP` workbooks and your OIP report — 1.0 m/s run, R_TM 3.016 N, (1+k) 1.6119, full-scale 2.13 kN / 7.25 kW; company A3 results for the chart.
- **Body plan (page 04):** drawn directly from the scaled offset table (half-breadths at 21 stations).
- **Block weights (page 09):** block breakdown table from the Production Design report.
- **Block arrangement & shipyard layout images:** from the group presentation deck.

To change a chart, edit the arrays at the top of `js/charts.js`.

---

## Customising the look

The colour palette matches my 2025 design portfolio: warm grey-cream pages, deep navy text, a dark portfolio blue for key results and periwinkle for second data series.

Colours are defined once at the top of `css/style.css`:

```css
--paper:  #F2EEEB;   /* warm grey-cream page */
--ink:    #171E47;   /* deep navy */
--accent: #24579E;   /* portfolio blue — key results */
--blue:   #7F90D2;   /* periwinkle — second data series */
```

Chart colours are set in the `C` object at the top of `js/charts.js`.

### Preview locally
Double-click `index.html` to open it in your browser. That's it.
