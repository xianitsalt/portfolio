/* Charts drawn as plain SVG from real project data — no libraries needed.
   To change a chart, edit the DATA section below. */

/* ===================== DATA ===================== */

// Maxsurf Resistance — Holtrop method (126 m LBP hull, 7 m draft)
const SPEED_KN = [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20];
const RESIST_KN = [0.5,1.7,3.7,6.3,9.5,13.4,18,23.1,28.9,35.2,42.2,49.7,57.9,66.6,75.9,85.7,96.2,107.2,118.9,131.2,144.2,158,172.7,188.4,205.2,223.4,243.3,265,289,315.6,345.2,377.9,413.8,453.7,498.8,551,612,682.7,762,847.3];
const POWER_KW = [0.12,0.879,2.817,6.448,12.262,20.742,32.357,47.572,66.843,90.622,119.357,153.49,193.461,239.71,292.675,352.805,420.565,496.456,581.038,674.964,779.017,894.161,1021.595,1162.81,1319.649,1494.373,1689.683,1908.789,2155.723,2435.371,2752.423,3110.336,3512.794,3967.72,4490.339,5102.064,5824.898,6672.931,7644.124,8717.326];

// Offset table — half-breadths (m) at waterlines 0–9 m. null = no hull at that point.
const WL = [0,0.5,1,2,3,4,5,6,7,8,9];
const OFFSETS = {
  "AP":   [null,null,null,null,null,null,2.17,4.97,6.98,8.42,9.39],
  "1":    [0.37,0.98,1.10,1.24,1.31,2.58,5.56,8.25,10.09,11.12,11.55],
  "2":    [0.71,2.04,2.46,2.90,3.67,5.58,8.29,10.59,12.07,12.91,13.34],
  "3":    [1.68,3.29,4.16,5.19,6.49,8.41,10.50,12.20,13.38,14.03,14.37],
  "4":    [2.90,4.72,6.09,7.85,9.22,10.77,12.21,13.38,14.28,14.74,14.97],
  "5":    [3.86,6.60,8.31,10.30,11.53,12.65,13.54,14.23,14.75,15.01,15.12],
  "6":    [5.66,8.58,10.52,12.32,13.24,13.86,14.34,14.73,14.95,15.12,15.12],
  "7":    [7.58,10.71,12.46,13.91,14.40,14.68,14.98,15.12,15.12,15.12,15.12],
  "8":    [9.39,12.40,13.84,14.76,14.93,15.12,15.12,15.12,15.12,15.12,15.12],
  "9":    [10.17,12.89,14.20,14.99,15.12,15.12,15.12,15.12,15.12,15.12,15.12],
  "10":   [10.49,13.25,14.36,15.12,15.12,15.12,15.12,15.12,15.12,15.12,15.12],
  "11":   [8.95,11.87,13.57,14.75,14.98,14.98,15.01,15.01,15.01,15.12,15.12],
  "12":   [6.62,10.33,12.52,13.90,14.32,14.36,14.50,14.57,14.75,14.95,15.12],
  "13":   [4.67,8.37,10.89,12.60,13.17,13.45,13.59,13.72,14.02,14.46,15.12],
  "14":   [2.96,6.55,9.09,10.89,11.62,11.92,12.16,12.52,12.99,13.69,14.72],
  "15":   [1.58,4.79,7.02,9.02,9.68,10.05,10.39,10.70,11.48,12.51,13.99],
  "16":   [0.84,3.09,4.92,6.81,7.54,7.96,8.31,8.81,9.58,10.80,12.70],
  "17":   [0.57,1.96,3.13,4.71,5.30,5.74,6.14,6.67,7.60,8.91,10.70],
  "18":   [0.15,1.00,1.70,2.73,3.25,3.59,3.91,4.48,5.30,6.60,8.49],
  "19":   [null,null,0.57,1.13,1.45,1.68,1.98,2.37,3.08,4.05,5.52],
  "FP":   [null,null,null,null,null,null,0,0.47,0.91,1.59,2.49]
};
const AFT = ["AP","1","2","3","4","5","6","7","8","9"];
const FWD = ["10","11","12","13","14","15","16","17","18","19","FP"];

// Shipyard Production Design — estimated block weights (MT)
const BLOCKS = [
  ["F1 · Fore body", 116], ["CH1 · Cargo hold 1", 180], ["CH2 · Cargo hold 2", 180],
  ["CH3 · Cargo hold 3", 180], ["CH4 · Cargo hold 4", 180], ["A1 · Engine room bottom", 95],
  ["A2 · Aft body / stern", 105], ["SS1 · Superstructure", 55], ["SS2 · Superstructure", 50], ["SS3 · Superstructure", 35]
];
const CRANE_MT = 250;

// NME2107 — 156 m ship: my Holtrop–Mennen hand calculation vs Maxsurf (total resistance, kN)
const HM_SPEED = [10, 11, 12, 13, 14, 15, 16];
const HM_MINE = [183.4, 220.2, 260.9, 306.5, 358.5, 418.0, 488.2];
const HM_MAXSURF = [181.2, 217.5, 257.7, 302.6, 353.4, 412.0, 480.6];

// Newcastle towing tank — company results, extrapolated to full scale (ITTC-57, 1+k = 1.6119)
// [Froude number, total resistance kN, mine?]
const TANK = [[0.2562, 2.13, true], [0.3078, 6.79], [0.3571, 11.18], [0.5418, 29.03], [0.6187, 31.22], [0.6425, 31.95]];

// NME2109 inclining experiment: heeling moment w·d (kg·m) vs heel (deg)
const INCLINE = { pts: [[0.048,0.75],[0.096,1.45],[0.144,2.0]], spts: [[0.048,0.7],[0.096,1.4],[0.144,2.15]] };
// NME2109 cross-flooding: [label, calculated, measured, unit]
const FLOOD = [["Aft draught", 7.45, 6.00, "cm"], ["Fwd draught", 4.08, 4.70, "cm"], ["Trim by stern", 3.37, 1.30, "cm"], ["GMT", 12.63, 12.29, "cm"]];

// NME2111 — MLR test metrics (L/100 km) and K-means clusters
const MLR = { mae: 0.894, rmse: 1.194, baseline: 2.253 };
const KMEANS = [["Small engines", 2.06, 8.64, 11189], ["Mid-size", 3.39, 11.29, 10985], ["Large engines", 5.28, 14.66, 6900]];

// NME2103 pump lab: flow (LPM) vs head (m)
const PUMP_Q = [40, 50, 60, 70, 80, 90];
const PUMP_SINGLE = [8.67, 7.44, 6.42, 5.40, 4.59, 3.47];
const PUMP_SERIES = [16.41, 14.17, 13.46, 10.40, 8.26, 5.91];
// NME2103 heat exchanger: [test, Qh W, Qc W]
const HX = [["1 · 45°C", 2327, 1171], ["2 · 50°C", 2687, 1561], ["3 · 55°C", 3027, 1951], ["4 · 60°C", 3453, 2464], ["5 · 50°C P", 2589, 1134]];

// Lobe pump design iterations — paste your rows from the Excel iteration sheet.
// One object per iteration: { it: iteration number, thrust: Thrust Ideal (N), note: what you changed }
// Example: { it: 1, thrust: 68.2, note: "4 lobes, Rr 0.30 m" }
const LOBE_ITERATIONS = [
  // { it: 1, thrust: 0, note: "" },
];

/* ===================== HELPERS ===================== */
const C = { ink: "#171E47", steel: "#6B6F86", line: "#D9D3CD", accent: "#24579E", blue: "#7F90D2", paper: "#F2EEEB" };
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs, text) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text !== undefined) e.textContent = text;
  return e;
}
function svg(w, h) { return el("svg", { viewBox: `0 0 ${w} ${h}`, role: "img" }); }
const MONO = "JetBrains Mono, monospace";
const HALO = { stroke: "#F2EEEB", "stroke-width": 5, "paint-order": "stroke", "stroke-linejoin": "round" };

/* Line chart: speed vs value, with the 20 kn point highlighted */
function lineChart(id, xs, ys, opts) {
  const host = document.getElementById(id); if (!host) return;
  const W = 520, H = 330, m = { l: 52, r: 18, t: 22, b: 40 };
  const s = svg(W, H);
  const xmax = 20, ymax = opts.ymax;
  const X = v => m.l + (v / xmax) * (W - m.l - m.r);
  const Y = v => H - m.b - (v / ymax) * (H - m.t - m.b);
  // grid
  for (let i = 0; i <= 4; i++) {
    const v = ymax * i / 4, y = Y(v);
    s.append(el("line", { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: C.line, "stroke-width": 1 }));
    s.append(el("text", { x: m.l - 8, y: y + 4, "text-anchor": "end", "font-family": MONO, "font-size": 11, fill: C.steel }, opts.fmt(v)));
  }
  for (let k = 0; k <= 20; k += 5) {
    s.append(el("text", { x: X(k), y: H - m.b + 18, "text-anchor": "middle", "font-family": MONO, "font-size": 11, fill: C.steel }, k));
  }
  s.append(el("text", { x: W - m.r, y: H - 6, "text-anchor": "end", "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "SPEED (KN)"));
  s.append(el("text", { x: m.l, y: 12, "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, opts.ylabel));
  // design-speed marker region
  s.append(el("line", { x1: X(20), x2: X(20), y1: m.t, y2: H - m.b, stroke: C.accent, "stroke-dasharray": "3 4", "stroke-width": 1 }));
  // line
  const d = xs.map((x, i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(ys[i]).toFixed(1)}`).join("");
  s.append(el("path", { d, fill: "none", stroke: opts.color, "stroke-width": 2.4, "stroke-linejoin": "round" }));
  // endpoint
  const lx = X(20), ly = Y(ys[ys.length - 1]);
  s.append(el("circle", { cx: lx, cy: ly, r: 5, fill: C.accent }));
  s.append(el("text", { x: lx - 10, y: ly + 4, "text-anchor": "end", "font-family": "Archivo, sans-serif", "font-weight": 800, "font-size": 18, fill: C.accent, ...HALO }, opts.endLabel));
  // 10 kn reference
  if (opts.refAt10) {
    const i10 = xs.indexOf(10), rx = X(10), ry = Y(ys[i10]);
    s.append(el("circle", { cx: rx, cy: ry, r: 4, fill: C.paper || "#F6F4EF", stroke: C.ink, "stroke-width": 1.5 }));
    s.append(el("text", { x: rx - 10, y: ry - 12, "text-anchor": "end", "font-family": MONO, "font-size": 11, fill: C.ink, ...HALO }, opts.refAt10));
  }
  host.append(s);
}

/* Body plan: aft stations on the left, forward stations on the right (half-breadth vs waterline) */
function bodyPlan(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 520, H = 250, m = { t: 16, b: 30 }, cx = W / 2;
  const s = svg(W, H);
  const hb = 15.12, wlMax = 9;
  const sx = (W / 2 - 24) / hb, sy = (H - m.t - m.b) / wlMax;
  const Y = z => H - m.b - z * sy;
  // waterline grid
  WL.filter(z => Number.isInteger(z)).forEach(z => {
    s.append(el("line", { x1: 10, x2: W - 10, y1: Y(z), y2: Y(z), stroke: C.line, "stroke-width": z === 7 ? 0 : 1 }));
  });
  // design waterline
  s.append(el("line", { x1: 10, x2: W - 10, y1: Y(7), y2: Y(7), stroke: C.accent, "stroke-width": 1.2, "stroke-dasharray": "6 4" }));
  s.append(el("text", { x: W - 12, y: Y(7) - 5, "text-anchor": "end", "font-family": MONO, "font-size": 10, "font-weight": 600, fill: C.accent, stroke: C.paper, "stroke-width": 5, "paint-order": "stroke" }, "DWL 7.0 m"));
  s.append(el("line", { x1: cx, x2: cx, y1: m.t - 6, y2: H - m.b + 6, stroke: C.ink, "stroke-width": 1 }));
  const draw = (keys, side, color) => keys.forEach(k => {
    const pts = OFFSETS[k].map((b, i) => b === null ? null : [cx + side * b * sx, Y(WL[i])]).filter(Boolean);
    if (pts.length < 2) return;
    // close to centreline at keel where the section starts at WL 0
    if (OFFSETS[k][0] !== null) pts.unshift([cx, Y(0)]);
    s.append(el("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(""), fill: "none", stroke: color, "stroke-width": k === "10" ? 2.2 : 1.1 }));
  });
  draw(AFT, -1, C.blue);
  draw(FWD, 1, C.ink);
  s.append(el("text", { x: 12, y: H - 8, "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "← AFT STATIONS AP–9"));
  s.append(el("text", { x: W - 12, y: H - 8, "text-anchor": "end", "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "FWD STATIONS 10–FP →"));
  host.append(s);
}

/* Horizontal bars: block weights vs crane capacity */
function blockChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 520, rowH = 22, m = { l: 170, r: 40, t: 26, b: 26 }, H = m.t + m.b + BLOCKS.length * rowH;
  const s = svg(W, H);
  const xmax = 275, X = v => m.l + v / xmax * (W - m.l - m.r);
  BLOCKS.forEach(([name, w], i) => {
    const y = m.t + i * rowH;
    const heaviest = w === 180;
    s.append(el("text", { x: m.l - 10, y: y + 15, "text-anchor": "end", "font-family": MONO, "font-size": 11, fill: C.ink }, name));
    s.append(el("rect", { x: m.l, y: y + 4, width: X(w) - m.l, height: rowH - 8, fill: heaviest ? C.ink : C.blue, opacity: heaviest ? 1 : .55 }));
    s.append(el("text", { x: X(w) + 6, y: y + 15, "font-family": MONO, "font-size": 11, fill: C.steel }, w));
  });
  const cxp = X(CRANE_MT);
  s.append(el("line", { x1: cxp, x2: cxp, y1: m.t - 10, y2: H - m.b + 4, stroke: C.accent, "stroke-width": 2 }));
  s.append(el("text", { x: cxp, y: m.t - 14, "text-anchor": "middle", "font-family": MONO, "font-size": 11, "font-weight": 600, fill: C.accent }, `CRANE ${CRANE_MT} MT`));
  s.append(el("text", { x: m.l, y: H - 6, "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "EST. BLOCK WEIGHT (MT)"));
  host.append(s);
}

/* Prediction check: hand calculation (points) vs Maxsurf (line) */
function hmChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 520, H = 220, m = { l: 48, r: 18, t: 22, b: 36 };
  const s = svg(W, H);
  const xmin = 10, xmax = 16, ymin = 150, ymax = 520;
  const X = v => m.l + (v - xmin) / (xmax - xmin) * (W - m.l - m.r);
  const Y = v => H - m.b - (v - ymin) / (ymax - ymin) * (H - m.t - m.b);
  [200, 300, 400, 500].forEach(v => {
    s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-family": MONO, "font-size": 11, fill: C.steel }, v));
  });
  HM_SPEED.forEach(k => s.append(el("text", { x: X(k), y: H - m.b + 18, "text-anchor": "middle", "font-family": MONO, "font-size": 11, fill: C.steel }, k)));
  s.append(el("text", { x: W - m.r, y: H - 4, "text-anchor": "end", "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "SPEED (KN)"));
  s.append(el("text", { x: m.l, y: 12, "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "TOTAL RESISTANCE (KN)"));
  s.append(el("path", { d: HM_SPEED.map((x, i) => `${i ? "L" : "M"}${X(x)},${Y(HM_MAXSURF[i])}`).join(""), fill: "none", stroke: C.blue, "stroke-width": 2.2 }));
  HM_SPEED.forEach((x, i) => s.append(el("circle", { cx: X(x), cy: Y(HM_MINE[i]), r: 4.5, fill: C.accent })));
  // legend
  s.append(el("line", { x1: m.l + 6, x2: m.l + 30, y1: m.t + 12, y2: m.t + 12, stroke: C.blue, "stroke-width": 2.2 }));
  s.append(el("text", { x: m.l + 36, y: m.t + 16, "font-family": MONO, "font-size": 11, fill: C.ink }, "Maxsurf (Holtrop)"));
  s.append(el("circle", { cx: m.l + 18, cy: m.t + 32, r: 4.5, fill: C.accent }));
  s.append(el("text", { x: m.l + 36, y: m.t + 36, "font-family": MONO, "font-size": 11, fill: C.ink }, "My hand calculation"));
  s.append(el("text", { x: X(16) - 8, y: Y(488.2) - 12, "text-anchor": "end", "font-family": "Archivo, sans-serif", "font-weight": 800, "font-size": 16, fill: C.accent, ...HALO }, "Δ ≤ 1.6%"));
  host.append(s);
}

/* Towing tank: full-scale resistance vs Froude number, my run highlighted */
function tankChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 300, H = 220, m = { l: 30, r: 10, t: 18, b: 42 };
  const s = svg(W, H);
  const X = v => m.l + (v - 0.2) / 0.5 * (W - m.l - m.r), Y = v => H - m.b - v / 35 * (H - m.t - m.b);
  [0, 10, 20, 30].forEach(v => { s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 8, y: Y(v) + 4, "text-anchor": "end", "font-family": MONO, "font-size": 11, fill: C.steel }, v)); });
  [0.2, 0.3, 0.4, 0.5, 0.6, 0.7].forEach(v => s.append(el("text", { x: X(v), y: H - m.b + 18, "text-anchor": "middle", "font-family": MONO, "font-size": 10, fill: C.steel }, v.toFixed(1))));
  s.append(el("text", { x: W - m.r, y: H - 2, "text-anchor": "end", "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "FROUDE NUMBER"));
  s.append(el("text", { x: m.l, y: 10, "font-family": MONO, "font-size": 10, fill: C.steel, "letter-spacing": "1" }, "FULL-SCALE R_T (KN)"));
  s.append(el("path", { d: TANK.map((p, i) => `${i ? "L" : "M"}${X(p[0])},${Y(p[1])}`).join(""), fill: "none", stroke: C.blue, "stroke-width": 1.6, "stroke-dasharray": "4 3" }));
  TANK.forEach(p => s.append(el("circle", { cx: X(p[0]), cy: Y(p[1]), r: p[2] ? 6 : 4, fill: p[2] ? C.accent : C.blue })));
  const me = TANK[0];
  s.append(el("text", { x: X(me[0]) + 12, y: Y(me[1]) + 4, "font-family": MONO, "font-size": 11, "font-weight": 600, fill: C.accent, ...HALO }, "MY RUN · 2.13 kN"));
  host.append(s);
}

function inclineChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 440, H = 240, m = { l: 34, r: 12, t: 16, b: 32 };
  const s = svg(W, H);
  const X = v => m.l + v / 0.16 * (W - m.l - m.r), Y = v => H - m.b - v / 2.4 * (H - m.t - m.b);
  [0, 1, 2].forEach(v => { s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 6, y: Y(v) + 3, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.steel }, v + "°")); });
  [0, 0.05, 0.1, 0.15].forEach(v => s.append(el("text", { x: X(v), y: H - m.b + 14, "text-anchor": "middle", "font-family": MONO, "font-size": 9, fill: C.steel }, v)));
  s.append(el("text", { x: W - m.r, y: H - 2, "text-anchor": "end", "font-family": MONO, "font-size": 8, fill: C.steel }, "HEELING MOMENT w·d (KG·M)"));
  s.append(el("line", { x1: X(0), y1: Y(0), x2: X(0.15), y2: Y(0.15 * 14.6), stroke: C.ink, "stroke-width": 1, "stroke-dasharray": "3 3" }));
  INCLINE.pts.forEach(p => s.append(el("circle", { cx: X(p[0]), cy: Y(p[1]), r: 3.5, fill: C.blue })));
  INCLINE.spts.forEach(p => s.append(el("circle", { cx: X(p[0]), cy: Y(p[1]), r: 3.5, fill: "none", stroke: C.accent, "stroke-width": 1.5 })));
  s.append(el("text", { x: m.l + 6, y: m.t + 6, "font-family": MONO, "font-size": 9, fill: C.blue }, "● PORT→STBD"));
  s.append(el("text", { x: m.l + 6, y: m.t + 18, "font-family": MONO, "font-size": 9, fill: C.accent }, "○ STBD→PORT"));
  host.append(s);
}
function floodChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 440, rowH = 30, m = { l: 90, r: 96, t: 22, b: 6 }, H = m.t + m.b + FLOOD.length * rowH;
  const s = svg(W, H);
  const X = v => m.l + v / 13 * (W - m.l - m.r);
  s.append(el("text", { x: m.l, y: 10, "font-family": MONO, "font-size": 9, fill: C.ink }, "■ CALCULATED"));
  s.append(el("text", { x: m.l + 90, y: 10, "font-family": MONO, "font-size": 9, fill: C.accent }, "■ MEASURED"));
  FLOOD.forEach(([n, c, e, u], i) => {
    const y = m.t + i * rowH;
    s.append(el("text", { x: m.l - 6, y: y + 15, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.ink }, n.toUpperCase()));
    s.append(el("rect", { x: m.l, y: y + 3, width: X(c) - m.l, height: 9, fill: C.ink }));
    s.append(el("rect", { x: m.l, y: y + 13, width: X(e) - m.l, height: 9, fill: C.accent }));
    s.append(el("text", { x: Math.max(X(c), X(e)) + 4, y: y + 16, "font-family": MONO, "font-size": 9, fill: C.steel }, c + " / " + e + " " + u));
  });
  host.append(s);
}

function mlrChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 300, H = 180, m = { l: 92, r: 50, t: 10, b: 24 };
  const s = svg(W, H);
  const rows = [["Baseline (mean)", MLR.baseline, C.line], ["MLR · RMSE", MLR.rmse, C.blue], ["MLR · MAE", MLR.mae, C.accent]];
  const X = v => m.l + v / 2.5 * (W - m.l - m.r), rh = (H - m.t - m.b) / 3;
  rows.forEach(([n, v, c], i) => { const y = m.t + i * rh;
    s.append(el("text", { x: m.l - 6, y: y + rh / 2 + 4, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.ink }, n.toUpperCase()));
    s.append(el("rect", { x: m.l, y: y + rh * .25, width: X(v) - m.l, height: rh * .5, fill: c }));
    s.append(el("text", { x: X(v) + 5, y: y + rh / 2 + 4, "font-family": MONO, "font-size": 10, fill: C.ink }, v.toFixed(2))); });
  s.append(el("text", { x: W - 4, y: H - 4, "text-anchor": "end", "font-family": MONO, "font-size": 8, fill: C.steel }, "ERROR (L/100 KM)"));
  host.append(s);
}
function kmeansChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 300, H = 200, m = { l: 34, r: 14, t: 14, b: 30 };
  const s = svg(W, H);
  const X = v => m.l + (v - 1) / 5 * (W - m.l - m.r), Y = v => H - m.b - (v - 6) / 10 * (H - m.t - m.b);
  [8, 12, 16].forEach(v => { s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 5, y: Y(v) + 3, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.steel }, v)); });
  [2, 3, 4, 5, 6].forEach(v => s.append(el("text", { x: X(v), y: H - m.b + 13, "text-anchor": "middle", "font-family": MONO, "font-size": 9, fill: C.steel }, v)));
  s.append(el("text", { x: W - m.r, y: H - 2, "text-anchor": "end", "font-family": MONO, "font-size": 8, fill: C.steel }, "MEAN ENGINE SIZE (L)"));
  s.append(el("text", { x: m.l, y: 8, "font-family": MONO, "font-size": 8, fill: C.steel }, "FUEL (L/100 KM)"));
  const cols = [C.blue, C.ink, C.accent];
  KMEANS.forEach(([n, e, f, k], i) => { const r = Math.sqrt(k) / 4.2;
    s.append(el("circle", { cx: X(e), cy: Y(f), r, fill: cols[i], opacity: .8 }));
    s.append(el("text", { x: X(e) + (i === 2 ? -r - 4 : r + 4), y: Y(f) + 3, "text-anchor": i === 2 ? "end" : "start", "font-family": MONO, "font-size": 9, fill: C.ink }, n.toUpperCase())); });
  host.append(s);
}

function pumpChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 440, H = 250, m = { l: 30, r: 14, t: 18, b: 32 };
  const s = svg(W, H);
  const X = v => m.l + (v - 35) / 60 * (W - m.l - m.r), Y = v => H - m.b - v / 18 * (H - m.t - m.b);
  [0, 5, 10, 15].forEach(v => { s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 5, y: Y(v) + 3, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.steel }, v)); });
  PUMP_Q.forEach(q => s.append(el("text", { x: X(q), y: H - m.b + 13, "text-anchor": "middle", "font-family": MONO, "font-size": 9, fill: C.steel }, q)));
  s.append(el("text", { x: W - m.r, y: H - 2, "text-anchor": "end", "font-family": MONO, "font-size": 8, fill: C.steel }, "FLOW (LPM)"));
  s.append(el("text", { x: m.l, y: 8, "font-family": MONO, "font-size": 8, fill: C.steel }, "HEAD (M)"));
  [[PUMP_SINGLE, C.blue, "SINGLE"], [PUMP_SERIES, C.accent, "SERIES · MINE"]].forEach(([d, c, n]) => {
    s.append(el("path", { d: PUMP_Q.map((q, i) => `${i ? "L" : "M"}${X(q)},${Y(d[i])}`).join(""), fill: "none", stroke: c, "stroke-width": 2 }));
    PUMP_Q.forEach((q, i) => s.append(el("circle", { cx: X(q), cy: Y(d[i]), r: 2.6, fill: c })));
    s.append(el("text", { x: X(40), y: Y(d[0]) + (c === C.blue ? 20 : -10), "font-family": MONO, "font-size": 9, "font-weight": 600, fill: c, ...HALO }, n)); });
  host.append(s);
}
function hxChart(id) {
  const host = document.getElementById(id); if (!host) return;
  const W = 440, H = 250, m = { l: 36, r: 14, t: 18, b: 32 };
  const s = svg(W, H);
  const bw = (W - m.l - m.r) / HX.length, Y = v => H - m.b - v / 3800 * (H - m.t - m.b);
  [0, 1000, 2000, 3000].forEach(v => { s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: C.line }));
    s.append(el("text", { x: m.l - 5, y: Y(v) + 3, "text-anchor": "end", "font-family": MONO, "font-size": 9, fill: C.steel }, v / 1000 + "k")); });
  HX.forEach(([n, qh, qc], i) => { const x = m.l + i * bw;
    s.append(el("rect", { x: x + bw * .15, y: Y(qh), width: bw * .33, height: H - m.b - Y(qh), fill: qh > 3000 ? C.accent : C.ink }));
    s.append(el("rect", { x: x + bw * .52, y: Y(qc), width: bw * .33, height: H - m.b - Y(qc), fill: C.blue }));
    s.append(el("text", { x: x + bw / 2, y: H - m.b + 13, "text-anchor": "middle", "font-family": MONO, "font-size": 8, fill: C.steel }, n)); });
  s.append(el("line", { x1: m.l, x2: W - m.r, y1: Y(3000), y2: Y(3000), stroke: C.accent, "stroke-dasharray": "4 3", "stroke-width": 1.2 }));
  s.append(el("text", { x: m.l + 2, y: Y(3000) - 4, "font-family": MONO, "font-size": 8, fill: C.accent, ...HALO }, "HEATER LIMIT 3,000 W"));
  s.append(el("text", { x: m.l, y: 8, "font-family": MONO, "font-size": 8, fill: C.ink }, "■ HOT SIDE Q_h"));
  s.append(el("text", { x: m.l + 80, y: 8, "font-family": MONO, "font-size": 8, fill: C.blue }, "■ COLD SIDE Q_c (W)"));
  host.append(s);
}

/* Thrust by iteration — shows a reminder until LOBE_ITERATIONS is filled in */
function lobeChart(id) {
  const host = document.getElementById(id); if (!host) return;
  if (!LOBE_ITERATIONS.length) {
    host.innerHTML = '<div class="placeholder" style="min-height:7em"><strong>ADD · ITERATION DATA</strong><span>Paste your iterations into LOBE_ITERATIONS in js/charts.js and this chart draws itself.</span></div>';
    return;
  }
  const W = 520, H = 170, m = { l: 52, r: 18, t: 20, b: 34 };
  const s = svg(W, H);
  const n = LOBE_ITERATIONS.length, ymax = Math.max(...LOBE_ITERATIONS.map(d => d.thrust)) * 1.15;
  const bw = (W - m.l - m.r) / n;
  const Y = v => H - m.b - v / ymax * (H - m.t - m.b);
  LOBE_ITERATIONS.forEach((d, i) => {
    const last = i === n - 1, x = m.l + i * bw;
    s.append(el("rect", { x: x + bw * .2, y: Y(d.thrust), width: bw * .6, height: H - m.b - Y(d.thrust), fill: last ? C.accent : C.ink, opacity: last ? 1 : .75 }));
    s.append(el("text", { x: x + bw / 2, y: Y(d.thrust) - 5, "text-anchor": "middle", "font-family": MONO, "font-size": 11, fill: last ? C.accent : C.ink }, Math.round(d.thrust) + " N"));
    s.append(el("text", { x: x + bw / 2, y: H - m.b + 16, "text-anchor": "middle", "font-family": MONO, "font-size": 11, fill: C.steel }, "IT " + d.it));
  });
  s.append(el("line", { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, stroke: C.ink }));
  host.append(s);
}

/* ===================== DRAW ===================== */
document.addEventListener("DOMContentLoaded", () => {
  lineChart("chart-resistance", SPEED_KN, RESIST_KN, {
    ymax: 900, color: C.ink, ylabel: "TOTAL RESISTANCE (KN)",
    fmt: v => v.toFixed(0), endLabel: "847 kN", refAt10: "131 kN @ 10 kn"
  });
  lineChart("chart-power", SPEED_KN, POWER_KW.map(v => v / 1000), {
    ymax: 10, color: C.blue, ylabel: "EFFECTIVE POWER (MW)",
    fmt: v => v.toFixed(1), endLabel: "8.72 MW", refAt10: "0.67 MW @ 10 kn"
  });
  bodyPlan("chart-bodyplan");
  blockChart("chart-blocks");
  hmChart("chart-hm");
  tankChart("chart-tank");
  inclineChart("chart-incline");
  floodChart("chart-flood");
  mlrChart("chart-mlr");
  kmeansChart("chart-kmeans");
  pumpChart("chart-pump");
  hxChart("chart-hx");
});
