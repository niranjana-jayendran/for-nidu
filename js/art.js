/* Hand-built illustrations (SVG strings) + generated textures.
   Everything is drawn in code so the site has zero image dependencies. */
(function () {
  "use strict";

  let uid = 0;
  const C = {
    night: "#0d1836", ink: "#14234b", delft: "#2a4a8c", corn: "#6f8fc9",
    powder: "#a9bfe3", mist: "#dce6f3", ice: "#eef3fa", paper: "#fbf8f1",
    ivory: "#f5f0e4", sage: "#8ea395", sageDark: "#5f7668", ochre: "#c49a5c"
  };

  // tiny seeded random so drawings look hand-made but stay stable
  const rng = (seed) => {
    let s = (seed >>> 0) || 1;
    return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
  };
  const f = (n) => Math.round(n * 10) / 10;

  // 4-point sparkle path centred at x,y
  const sparklePath = (x, y, s) =>
    `M${f(x)} ${f(y - s)}C${f(x + s * .08)} ${f(y - s * .3)} ${f(x + s * .3)} ${f(y - s * .08)} ${f(x + s)} ${f(y)}` +
    `C${f(x + s * .3)} ${f(y + s * .08)} ${f(x + s * .08)} ${f(y + s * .3)} ${f(x)} ${f(y + s)}` +
    `C${f(x - s * .08)} ${f(y + s * .3)} ${f(x - s * .3)} ${f(y + s * .08)} ${f(x - s)} ${f(y)}` +
    `C${f(x - s * .3)} ${f(y - s * .08)} ${f(x - s * .08)} ${f(y - s * .3)} ${f(x)} ${f(y - s)}Z`;

  const WING = "M50 40C44 14 22 2 9 9C-1 15 6 34 26 40C10 45 6 60 15 68C25 76 42 62 50 46Z";
  const HEART = "M50 86C20 64 6 46 10 30C14 14 34 10 50 28C66 10 86 14 90 30C94 46 80 64 50 86Z";

  /* ── Butterfly (wings flap via CSS on .bfly-w) ─────────────────────── */
  function butterfly(o = {}) {
    const c = o.color || C.corn, d = o.dark || C.ink, l = o.light || C.mist;
    const wing = `
      <path d="${WING}" fill="${c}"/>
      <path d="M50 40C42 30 34 24 26 22C34 30 40 36 50 42ZM50 46C42 50 36 56 30 62C38 58 44 54 50 48Z" fill="${d}" opacity=".18"/>
      <path d="M48 38C38 24 26 16 14 14M48 41C36 36 26 36 17 39M48 45C38 51 28 57 20 64" stroke="${d}" stroke-width="1.1" fill="none" opacity=".5"/>
      <path d="${WING}" fill="none" stroke="${d}" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="14" cy="15" r="2.6" fill="${l}"/><circle cx="21" cy="10.5" r="1.7" fill="${l}"/>
      <circle cx="9" cy="22" r="1.5" fill="${l}"/><circle cx="16" cy="63" r="2" fill="${l}"/>`;
    return `<svg class="bfly" viewBox="0 0 100 80" aria-hidden="true">
      <g class="bfly-w bfly-l">${wing}</g>
      <g transform="translate(100 0) scale(-1 1)"><g class="bfly-w bfly-r">${wing}</g></g>
      <ellipse cx="50" cy="43" rx="2.6" ry="15" fill="${d}"/>
      <circle cx="50" cy="27" r="3.2" fill="${d}"/>
      <path d="M49 26C46 17 42 12 37 9M51 26C54 17 58 12 63 9" stroke="${d}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="37" cy="9" r="1.6" fill="${d}"/><circle cx="63" cy="9" r="1.6" fill="${d}"/>
    </svg>`;
  }

  /* ── Hydrangea (procedural florets) ────────────────────────────────── */
  function hydrangea(o = {}) {
    const r = rng(o.seed || 7);
    const pal = o.palette || [C.powder, "#8aa6d8", C.corn, "#c9d7ee", "#5a79bd", C.mist];
    const stroke = o.stroke || C.delft;
    let leaves = "", florets = "";
    if (o.leaves !== false) {
      leaves = `
        <path d="M62 96C40 88 16 98 6 122C30 126 50 116 62 100Z" fill="${C.sage}"/>
        <path d="M62 98C44 102 26 110 10 120" stroke="${C.sageDark}" stroke-width="1.2" fill="none"/>
        <path d="M64 96C84 86 108 92 118 114C94 120 74 112 64 100Z" fill="#9fb2a4"/>
        <path d="M64 98C80 100 96 106 114 113" stroke="${C.sageDark}" stroke-width="1.2" fill="none"/>
        <path d="M62 98C61 112 60 126 58 138" stroke="${C.sageDark}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }
    const pts = [];
    for (let i = 0; i < (o.count || 64); i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 44;
      pts.push({ x: 62 + Math.cos(a) * d * 1.08, y: 56 + Math.sin(a) * d * .86, s: 6 + r() * 3.5, c: pal[Math.floor(r() * pal.length)], rot: r() * 90 });
    }
    pts.sort((a, b) => a.y - b.y);
    for (const p of pts) {
      let petals = "";
      for (let k = 0; k < 4; k++) {
        petals += `<ellipse cx="0" cy="${f(-p.s * .52)}" rx="${f(p.s * .44)}" ry="${f(p.s * .58)}" transform="rotate(${k * 90})"/>`;
      }
      florets += `<g transform="translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.rot)})" fill="${p.c}" stroke="${stroke}" stroke-width=".55" stroke-opacity=".55">${petals}<circle r="1.1" fill="${C.ink}" stroke="none"/></g>`;
    }
    return `<svg class="hyd" viewBox="0 0 124 140" aria-hidden="true">${leaves}${florets}</svg>`;
  }

  /* ── Bloom (watercolour anemone, like the pins) ────────────────────── */
  function bloom(o = {}) {
    const r = rng(o.seed || 3);
    const c = o.color || C.corn, c2 = o.light || C.powder, d = o.dark || C.delft;
    let s = "";
    const ring = (rr, w, col, n, off) => {
      for (let k = 0; k < n; k++) {
        const ang = k * 360 / n + off + (r() - .5) * 10;
        const R = rr * (.9 + r() * .2);
        s += `<path d="M0 0C${f(-w)} ${f(-R * .38)} ${f(-w * .85)} ${f(-R)} 0 ${f(-R)}C${f(w * .85)} ${f(-R)} ${f(w)} ${f(-R * .38)} 0 0Z" transform="rotate(${f(ang)})" fill="${col}" stroke="${d}" stroke-width="1" stroke-opacity=".6"/>`;
        s += `<path d="M0 -6L0 ${f(-R * .8)}" transform="rotate(${f(ang)})" stroke="${d}" stroke-width=".8" opacity=".35"/>`;
      }
    };
    ring(44, 22, c, 7, 0);
    ring(32, 16, c2, 7, 26);
    let stamens = "";
    for (let k = 0; k < 16; k++) {
      const a = k / 16 * Math.PI * 2, L = 12 + r() * 5;
      stamens += `<path d="M0 0L${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)}" stroke="${C.night}" stroke-width="1"/><circle cx="${f(Math.cos(a) * L)}" cy="${f(Math.sin(a) * L)}" r="1.5" fill="${C.night}"/>`;
    }
    return `<svg class="bloom" viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(50 50)">${s}${stamens}<circle r="8" fill="${C.night}"/></g></svg>`;
  }

  function sparkle(o = {}) {
    return `<svg class="spk" viewBox="0 0 100 100" aria-hidden="true"><path d="${sparklePath(50, 50, 48)}" fill="${o.color || C.corn}"/></svg>`;
  }

  function heart(o = {}) {
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${HEART}" fill="${o.color || C.corn}"/></svg>`;
  }

  /* ── Placeholder "cyanotype" motifs — white silhouettes ────────────── */
  const motifs = {
    tower: (c) => `<svg viewBox="0 0 100 100"><g fill="${c}">
      <path d="M50 4L52.5 20H47.5Z"/><path d="M42 33L50 18L58 33Z"/><rect x="41" y="33" width="18" height="6"/>
      <rect x="39.5" y="39" width="21" height="20"/><rect x="42" y="59" width="16" height="38"/><rect x="37" y="94" width="26" height="6"/></g>
      <circle cx="50" cy="49" r="7" fill="none" stroke="${C.delft}" stroke-width="1.6"/><path d="M50 49V44M50 49L53.5 51" stroke="${C.delft}" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M46 64V90M50 64V90M54 64V90" stroke="${C.delft}" stroke-width="1" opacity=".7"/>
      <path d="M8 97C24 91 36 95 50 97C64 99 78 92 92 96" stroke="${c}" stroke-width="2" fill="none"/></svg>`,
    butterfly: (c) => butterfly({ color: c, dark: c, light: C.corn }),
    hydrangea: (c) => hydrangea({ palette: [c, C.ice, "#ffffffcc"], stroke: C.delft, leaves: false, count: 70, seed: 11 }),
    bloom: (c) => bloom({ color: c, light: C.ice, dark: C.delft, seed: 9 }),
    sparkle: (c) => `<svg viewBox="0 0 100 100"><path d="${sparklePath(50, 50, 40)}" fill="${c}"/><path d="${sparklePath(20, 24, 10)}" fill="${c}"/><path d="${sparklePath(80, 78, 8)}" fill="${c}"/><circle cx="78" cy="24" r="2" fill="${c}"/><circle cx="22" cy="76" r="2" fill="${c}"/></svg>`,
    heart: (c) => `<svg viewBox="0 0 100 100"><path d="${HEART}" fill="none" stroke="${c}" stroke-width="4"/><path d="M50 74C30 58 22 46 25 36C28 26 40 25 50 38C60 25 72 26 75 36C78 46 70 58 50 74Z" fill="${c}"/></svg>`,
    notes: (c) => `<svg viewBox="0 0 100 100"><g fill="${c}"><path d="M34 74V24L80 13V63" fill="none" stroke="${c}" stroke-width="4.5"/>
      <path d="M34 22L80 11V22L34 33Z"/><ellipse cx="25" cy="75" rx="11" ry="8" transform="rotate(-20 25 75)"/><ellipse cx="71" cy="64" rx="11" ry="8" transform="rotate(-20 71 64)"/></g>
      <path d="M6 88Q20 80 34 88T62 88T94 88" stroke="${c}" stroke-width="2" fill="none" opacity=".7"/></svg>`,
    book: (c) => `<svg viewBox="0 0 100 100"><g fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round">
      <path d="M50 30C40 22 24 20 10 22V80C24 78 40 80 50 88C60 80 76 78 90 80V22C76 20 60 22 50 30Z" fill="${c}" fill-opacity=".18"/>
      <path d="M50 30V88"/><path d="M18 34C28 33 36 34 42 37M18 44C28 43 36 44 42 47M18 54C28 53 36 54 42 57M58 37C64 34 72 33 82 34M58 47C64 44 72 43 82 44"/></g>
      <path d="M70 18V40L75 35L80 40V18" fill="${c}"/></svg>`
  };

  function placeholder(motif) {
    const fn = motifs[motif] || motifs.sparkle;
    return fn("#f2f6ff");
  }

  /* ── Wax seal ──────────────────────────────────────────────────────── */
  function sealEmblem(name, col, hi) {
    const layer = (fill, dx) => {
      switch (name) {
        case "heart": return `<path d="${HEART}" transform="translate(${-21 + dx} ${-21 + dx}) scale(.42)" fill="${fill}"/>`;
        case "star": return `<path d="${sparklePath(dx, dx, 19)}" fill="${fill}"/><circle cx="${13 + dx}" cy="${-12 + dx}" r="2" fill="${fill}"/><circle cx="${-13 + dx}" cy="${12 + dx}" r="1.6" fill="${fill}"/>`;
        case "flower": {
          let p = "";
          for (let k = 0; k < 6; k++) p += `<ellipse cx="0" cy="-9" rx="5.5" ry="9" transform="rotate(${k * 60})"/>`;
          return `<g transform="translate(${dx} ${dx})" fill="${fill}">${p}<circle r="4"/></g>`;
        }
        case "N": return `<text x="${dx}" y="${dx}" text-anchor="middle" dominant-baseline="central" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="600" font-size="36" fill="${fill}">N</text>`;
        default: return `<g transform="translate(${-20 + dx} ${-17 + dx}) scale(.4)" fill="${fill}"><path d="${WING}"/><path d="${WING}" transform="translate(100 0) scale(-1 1)"/><ellipse cx="50" cy="43" rx="3" ry="16"/></g>`;
      }
    };
    return layer(hi, .9) + layer(col, 0);
  }

  function waxSeal(o = {}) {
    const id = "ws" + (++uid);
    const r = rng(o.seed || 21);
    const c = o.color || C.delft, hi = o.highlight || "#7f9fd8", sh = o.shadow || C.night;
    const N = 22, pts = [];
    for (let i = 0; i < N; i++) {
      const a = i / N * Math.PI * 2, rad = 43 + r() * 6;
      pts.push([50 + Math.cos(a) * rad, 50 + Math.sin(a) * rad]);
    }
    let d = "";
    for (let i = 0; i < N; i++) {
      const p = pts[i], n = pts[(i + 1) % N];
      const mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
      d += (i === 0 ? `M${f(mx)} ${f(my)}` : "") + `Q${f(n[0])} ${f(n[1])} ${f((n[0] + pts[(i + 2) % N][0]) / 2)} ${f((n[1] + pts[(i + 2) % N][1]) / 2)}`;
    }
    return `<svg class="seal-svg" viewBox="0 0 100 100" aria-hidden="true">
      <defs><radialGradient id="${id}" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="${hi}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${sh}"/></radialGradient></defs>
      <path d="${d}Z" fill="url(#${id})"/>
      <circle cx="50" cy="50" r="30.5" fill="${c}" opacity=".55"/>
      <circle cx="50" cy="50" r="31" fill="none" stroke="${sh}" stroke-opacity=".6" stroke-width="2.6"/>
      <circle cx="49.2" cy="49.2" r="31" fill="none" stroke="${hi}" stroke-opacity=".55" stroke-width="1"/>
      <g transform="translate(50 50)">${sealEmblem(o.emblem || "butterfly", sh, hi)}</g>
      <ellipse cx="34" cy="28" rx="10" ry="5" transform="rotate(-30 34 28)" fill="#fff" opacity=".18"/>
    </svg>`;
  }

  /* ── Postmark ──────────────────────────────────────────────────────── */
  function postmark(o = {}) {
    const id = "pm" + (++uid);
    let waves = "";
    for (let i = 0; i < 5; i++) waves += `<path d="M96 ${24 + i * 13}q11 -7 22 0t22 0t22 0t22 0t22 0"/>`;
    return `<svg class="postmark" viewBox="0 0 210 100" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="2.2">
        <circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="31"/>${waves}
      </g>
      <path id="${id}" d="M50 50m-37.5 0a37.5 37.5 0 1 1 75 0a37.5 37.5 0 1 1 -75 0" fill="none"/>
      <text font-size="8.6" letter-spacing="1.6" fill="currentColor"><textPath href="#${id}">${o.ring || ""}</textPath></text>
      <text x="50" y="47" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${o.line1 || ""}</text>
      <text x="50" y="62" text-anchor="middle" font-size="11" fill="currentColor">${o.line2 || ""}</text>
    </svg>`;
  }

  /* ── Small doodles ─────────────────────────────────────────────────── */
  const arrow = (c = C.ink) => `<svg class="doodle-arrow" viewBox="0 0 120 60" aria-hidden="true"><path d="M6 10C30 48 70 54 104 30" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/><path d="M92 24L105 29L98 42" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const paperclip = () => `<svg class="clip" viewBox="0 0 30 80" aria-hidden="true"><path d="M20 22V60C20 68 10 68 10 60V14C10 2 26 2 26 14V62C26 78 4 78 4 62V26" fill="none" stroke="#8a93a8" stroke-width="3" stroke-linecap="round"/><path d="M20 22V60C20 68 10 68 10 60V14C10 2 26 2 26 14V62C26 78 4 78 4 62V26" fill="none" stroke="#e7ebf3" stroke-width="1" stroke-linecap="round" transform="translate(-.6 -.6)"/></svg>`;
  const handCircle = () => {
    const r = rng(Math.floor(Math.random() * 9999));
    const j = () => f((r() - .5) * 6);
    return `<svg class="hand-circle" viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M${30 + +j()} ${14 + +j()}C${90} ${2 + +j()} ${230} ${0 + +j()} ${282 + +j()} ${22 + +j()}C${300} ${40} ${270} ${66 + +j()} ${150} ${64 + +j()}C${40} ${64 + +j()} ${0} ${50} ${10 + +j()} ${30 + +j()}C${16} ${20} ${40} ${12} ${70 + +j()} ${9 + +j()}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
  };

  /* ── Memory doodles (one per "remember when" story) ─────────────────── */
  const ink = (inner) => `<svg class="doodle" viewBox="0 0 120 120" aria-hidden="true"><g stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
  const leaf = (x, y, rot, fill, k = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${k})">
      <path d="M0 -20C13 -13 14 9 0 20C-14 9 -13 -13 0 -20Z" fill="${fill}"/>
      <path d="M0 -16V27M0 -5L7 -11M0 5L8 -1M0 -5L-7 -11M0 5L-8 -1" fill="none" stroke-width="1.3"/></g>`;
  const flake = (x, y, r) => `<g transform="translate(${x} ${y})" stroke="${C.corn}" stroke-width="1.6">${[0, 60, 120].map((a) => `<path d="M0 ${-r}V${r}" transform="rotate(${a})"/>`).join("")}</g>`;
  const note = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse cx="0" cy="0" rx="5" ry="3.8" transform="rotate(-20)" fill="${C.ink}" stroke="none"/><path d="M4.4 -1V-18Q10 -14 11 -8" fill="none" stroke-width="1.8"/></g>`;
  const ray = (cx, cy, r1, r2, n) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return `<path d="M${f(cx + Math.cos(a) * r1)} ${f(cy + Math.sin(a) * r1)}L${f(cx + Math.cos(a) * r2)} ${f(cy + Math.sin(a) * r2)}"/>`; }).join("");

  const doodles = {
    // a leaf pile mid-jump, plus a cheer pom-pom
    leaves: () => ink(`
      <path d="M10 104Q60 84 110 104" fill="none"/>
      ${leaf(36, 88, -60, C.ochre)}${leaf(58, 92, 10, "#dcb37a")}${leaf(80, 88, 55, C.sage)}${leaf(50, 76, -15, "#e6c48f")}${leaf(70, 74, 35, C.ochre)}
      ${leaf(24, 40, 30, C.ochre, .6)}${leaf(48, 22, -40, C.sage, .5)}${leaf(36, 60, 70, "#dcb37a", .45)}
      <g stroke="${C.corn}" stroke-width="2">${ray(92, 32, 3, 15, 14)}</g><circle cx="92" cy="32" r="4" fill="${C.delft}"/>
      <path d="M92 36L98 56" stroke-width="3"/>`),
    // a snow angel pressed into the yard
    snow: () => ink(`
      <ellipse cx="60" cy="66" rx="54" ry="44" fill="${C.mist}" stroke="${C.powder}"/>
      <path d="M60 52C42 34 18 40 14 58C30 60 44 62 60 68C76 62 90 60 106 58C102 40 78 34 60 52Z" fill="#fff"/>
      <path d="M60 54L42 98Q60 104 78 98Z" fill="#fff"/>
      <circle cx="60" cy="40" r="10" fill="#fff"/>
      <path d="M56 40h0M64 40h0" stroke-width="2.6"/><path d="M56 45Q60 48 64 45" fill="none" stroke-width="1.4"/>
      ${flake(16, 18, 6)}${flake(102, 16, 5)}${flake(108, 96, 6)}${flake(12, 100, 4)}`),
    // the costa rica car ride, notes spilling out the window
    car: () => ink(`
      <path d="M6 100H114" stroke-dasharray="8 7" stroke="${C.corn}"/>
      <path d="M14 88V74Q16 66 26 64L38 50Q42 46 50 46H76Q84 46 88 52L96 64Q108 66 108 76V88Z" fill="${C.corn}"/>
      <path d="M42 52H60V64H32Z" fill="${C.mist}"/><path d="M66 52H82L90 64H66Z" fill="${C.mist}"/>
      <circle cx="34" cy="90" r="9" fill="${C.ink}"/><circle cx="34" cy="90" r="3" fill="${C.mist}" stroke="none"/>
      <circle cx="88" cy="90" r="9" fill="${C.ink}"/><circle cx="88" cy="90" r="3" fill="${C.mist}" stroke="none"/>
      ${note(30, 32, -10)}${note(54, 20, 8)}${note(80, 30, -4)}
      <path d="M100 36Q104 24 112 20M104 30Q112 30 116 36M102 32Q96 24 90 22" fill="none" stroke="${C.sage}" stroke-width="2.4"/><path d="M102 34Q100 44 102 56" fill="none" stroke="${C.ochre}" stroke-width="2.4"/>`),
    // a beach bike ride under the sun
    bike: () => ink(`
      <g stroke="${C.ochre}">${ray(96, 24, 13, 19, 10)}</g><circle cx="96" cy="24" r="9" fill="#ecc98f"/>
      <path d="M4 104q10 -6 20 0t20 0t20 0t20 0t20 0t20 0" fill="none" stroke="${C.corn}"/>
      <path d="M14 112q10 -6 20 0t20 0t20 0t20 0t20 0" fill="none" stroke="${C.powder}"/>
      <circle cx="32" cy="76" r="16" fill="none"/><circle cx="86" cy="76" r="16" fill="none"/>
      <path d="M32 76L56 76L50 52Z M56 76L78 52L50 52 M78 52L86 76" fill="none" stroke="${C.delft}" stroke-width="3"/>
      <path d="M44 48H56M78 52L75 42L84 40" fill="none" stroke-width="2.6"/>
      <path d="M80 44h10v8h-8z" fill="${C.mist}" stroke-width="1.6"/><circle cx="85" cy="40" r="3" fill="${C.corn}" stroke-width="1.2"/>`),
    // a blanket fort hanging off the top bunk
    fort: () => ink(`
      <path d="M22 18V106M98 18V106" stroke-width="3"/>
      <path d="M22 50H98" stroke-width="3"/><rect x="24" y="42" width="72" height="8" rx="2" fill="${C.mist}"/>
      <path d="M18 50H102L106 100Q84 92 60 102Q36 92 14 100Z" fill="${C.powder}"/>
      <path d="M30 56L28 96M46 56L45 98M74 56L75 98M90 56L92 96" stroke="#fff" stroke-width="2.4" opacity=".7"/>
      <path d="M50 101Q60 70 70 101Z" fill="${C.ink}"/>
      <path d="M22 18V4" stroke-width="2"/><path d="M22 4L36 8L22 12Z" fill="${C.ochre}"/>
      ${[30, 44, 58, 72, 86].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 26 : 24}" r="2.6" fill="${i % 2 ? "#ecc98f" : C.corn}" stroke="none"/>`).join("")}
      <path d="M22 22Q40 30 58 23Q76 30 98 22" fill="none" stroke-width="1" opacity=".6"/>
      <path d="${sparklePath(108, 66, 6)}" fill="${C.corn}" stroke="none"/><path d="${sparklePath(10, 70, 4)}" fill="${C.corn}" stroke="none"/>`)
  };

  /* ── Jar ───────────────────────────────────────────────────────────── */
  function jar(count) {
    const r = rng(42);
    const pal = [C.powder, C.corn, C.mist, "#fbf8f1", "#8aa6d8", C.delft, "#c9d7ee"];
    let notes = "";
    // pile of folded notes + lucky stars settling from the bottom
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 7), col = i % 7;
      const x = 60 + col * 22 + (r() - .5) * 14 + (row % 2) * 10;
      const y = 300 - row * 17 - r() * 8;
      const rot = (r() - .5) * 80;
      const fill = pal[Math.floor(r() * pal.length)];
      if (r() < .3) {
        notes += `<g class="jn" data-n="${i}" transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><path d="${sparklePath(0, 0, 9)}" fill="${fill}" stroke="${C.delft}" stroke-width=".8"/></g>`;
      } else {
        notes += `<g class="jn" data-n="${i}" transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><rect x="-13" y="-6" width="26" height="12" rx="2.5" fill="${fill}" stroke="${C.delft}" stroke-width=".8"/><path d="M-4 -6V6" stroke="${C.delft}" stroke-width=".6" opacity=".5"/><path d="M-13 0H13" stroke="${C.delft}" stroke-width=".5" opacity=".25"/></g>`;
      }
    }
    const body = "M70 104Q42 110 40 146V296Q40 330 76 332H184Q220 330 220 296V146Q218 110 190 104Z";
    let dots = "";
    for (let y = 0; y < 3; y++) for (let x = 0; x < 9; x++) dots += `<circle cx="${62 + x * 17 + (y % 2) * 8}" cy="${48 + y * 11}" r="2.2" fill="#fff" opacity=".85"/>`;
    return `<svg class="jar-svg" viewBox="0 0 260 345" aria-hidden="true">
      <defs>
        <clipPath id="jarClip"><path d="${body}"/></clipPath>
        <linearGradient id="glass" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".25" stop-color="#eef3fa" stop-opacity=".15"/><stop offset=".8" stop-color="#dce6f3" stop-opacity=".1"/><stop offset="1" stop-color="#a9bfe3" stop-opacity=".45"/></linearGradient>
        <clipPath id="lidClip"><path d="M48 62Q54 30 130 28Q206 30 212 62Q218 78 200 82Q130 90 60 82Q42 78 48 62Z"/></clipPath>
      </defs>
      <ellipse cx="130" cy="334" rx="98" ry="9" fill="${C.ink}" opacity=".16"/>
      <g clip-path="url(#jarClip)">${notes}</g>
      <path d="${body}" fill="url(#glass)" stroke="#8fa7d2" stroke-width="3"/>
      <path d="M58 150Q56 220 60 290" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7" fill="none"/>
      <path d="M72 140Q70 150 70 162" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6" fill="none"/>
      <path d="M204 160Q206 220 202 280" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35" fill="none"/>
      <path d="M70 104Q72 92 78 88H182Q188 92 190 104" fill="#eef3fa" fill-opacity=".5" stroke="#8fa7d2" stroke-width="3"/>
      <g clip-path="url(#lidClip)"><rect x="40" y="20" width="180" height="70" fill="${C.corn}"/>${dots}</g>
      <path d="M48 62Q54 30 130 28Q206 30 212 62Q218 78 200 82Q130 90 60 82Q42 78 48 62Z" fill="none" stroke="${C.delft}" stroke-width="2"/>
      <path d="M52 74Q62 92 76 84Q88 96 100 86Q114 96 126 88Q140 96 152 87Q166 96 178 86Q192 94 206 76" fill="${C.corn}" stroke="${C.delft}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M62 86Q130 98 198 86" stroke="${C.ochre}" stroke-width="3.5" fill="none"/>
      <path d="M62 90Q130 102 198 90" stroke="#a37c45" stroke-width="1.5" fill="none" opacity=".7"/>
      <path d="M196 88Q214 84 222 96M196 88Q210 98 214 112" stroke="${C.ochre}" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  /* ── Textures (data URIs, set as CSS variables) ────────────────────── */
  const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  function swirlTile(stroke, star, op = 1) {
    const s = (x, y, k) => `<path d="${sparklePath(x, y, k)}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" opacity="${op}">
      <g fill="none" stroke="${stroke}" stroke-width="1.6" stroke-linecap="round">
        <path d="M46 64c0-13 20-13 20 0c0 20-34 20-34-4c0-28 48-28 48 6c0 30-30 46-58 32"/>
        <path d="M144 150c0-11 17-11 17 0c0 17-29 17-29-3c0-25 41-25 41 5c0 25-26 37-48 27"/>
        <path d="M120 34c10-16 34-18 44-4c8 12-4 26-16 18c-8-6 0-16 7-12"/>
        <path d="M14 168c14-10 34-4 34 12c0 10-12 14-18 6"/>
        <path d="M168 84c14 2 24 16 18 30"/>
        <path d="M84 120c-8 10-6 26 8 30"/>
      </g>
      <g fill="${star}">${s(104, 92, 9)}${s(30, 124, 5)}${s(176, 60, 6)}${s(70, 186, 4)}${s(186, 186, 5)}${s(12, 20, 4)}
        <circle cx="88" cy="22" r="1.4"/><circle cx="160" cy="118" r="1.2"/><circle cx="40" cy="96" r="1.1"/><circle cx="120" cy="190" r="1.3"/><circle cx="196" cy="12" r="1"/></g></svg>`;
  }

  function grainTile() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .08  0 0 0 0 .12  0 0 0 0 .25  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".5"/></svg>`;
  }

  function tornTile(seed) {
    const r = rng(seed), W = 1200, H = 28;
    let d = `M0 ${H}L0 14`;
    for (let x = 0; x <= W;) {
      x += 4 + r() * 10;
      let y = 8 + r() * 9;
      if (r() < .06) y += 7;
      d += `L${f(Math.min(x, W))} ${f(y)}`;
    }
    d += `L${W} 14L${W} ${H}Z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${d}" fill="#000"/></svg>`;
  }

  function setTextures() {
    const s = document.documentElement.style;
    s.setProperty("--grain", uri(grainTile()));
    s.setProperty("--swirl-light", uri(swirlTile("#2a4a8c", "#6f8fc9")));
    s.setProperty("--swirl-dark", uri(swirlTile("#3d5ea3", "#dce6f3")));
    s.setProperty("--torn", uri(tornTile(5)));
    s.setProperty("--torn-2", uri(tornTile(17)));
  }

  window.ART = { C, rng, butterfly, hydrangea, bloom, sparkle, heart, placeholder, waxSeal, postmark, arrow, paperclip, handCircle, jar, doodles, setTextures, motifs };
})();
