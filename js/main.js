/* Builds every section from window.SITE and wires up the interactions. */
(function () {
  "use strict";

  const S = window.SITE, A = window.ART, C = A.C;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), S);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("nidu:" + k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("nidu:" + k, JSON.stringify(v)); } catch { /* private mode */ } }
  };

  A.setTextures();
  $$("[data-t]").forEach((el) => { el.textContent = get(el.dataset.t) ?? ""; });

  /* ── overlays ─────────────────────────────────────────────────────── */
  let lastFocus = null;
  function openOverlay(ov) {
    lastFocus = document.activeElement;
    ov.hidden = false;
    ov.classList.remove("closing");
    document.documentElement.style.overflow = "hidden";
    const f = ov.querySelector("button, [tabindex]");
    if (f) f.focus({ preventScroll: true });
  }
  async function closeOverlay(ov) {
    if (ov.hidden) return;
    ov.classList.add("closing");
    await wait(reduced ? 0 : 340);
    ov.hidden = true;
    ov.classList.remove("closing");
    if (!$$(".overlay").some((o) => !o.hidden)) document.documentElement.style.overflow = "";
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$(".overlay").forEach((ov) => ov.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeOverlay(ov); }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $$(".overlay").filter((o) => !o.hidden).forEach(closeOverlay);
  });

  /* ── petals ───────────────────────────────────────────────────────── */
  function burst(x, y, n = 40) {
    if (reduced) return;
    const pal = [C.corn, C.powder, C.mist, C.delft, "#fff", "#8aa6d8"];
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      p.className = "petal";
      const s = 7 + Math.random() * 10;
      p.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${pal[i % pal.length]};`;
      document.body.appendChild(p);
      const a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 260;
      const dx = Math.cos(a) * v, dy = Math.sin(a) * v * .7 - 160;
      p.animate([
        { transform: "translate(-50%,-50%) rotate(0)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(${dx * 1.25}px, ${dy + 380}px) rotate(${Math.random() * 900}deg)`, opacity: 0 }
      ], { duration: 2200 + Math.random() * 1200, easing: "cubic-bezier(.2,.7,.4,1)" }).onfinish = () => p.remove();
    }
  }

  /* ==================================================================
     01 · MAIL
     ================================================================== */
  const M = S.mail;
  $("#mailDeco").innerHTML = `
    <div class="md-hyd">${A.hydrangea({ seed: 4 })}</div>
    <div class="md-bloom">${A.bloom({ seed: 2 })}</div>
    <div class="md-bloom2">${A.bloom({ seed: 8, color: C.powder, light: C.mist })}</div>
    <div class="md-b1 flap">${A.butterfly()}</div>
    <div class="md-b2 flap">${A.butterfly({ color: C.powder })}</div>
    <div class="md-s1">${A.sparkle({ color: C.corn })}</div>
    <div class="md-s2">${A.sparkle({ color: C.delft })}</div>
    <div class="md-s3">${A.sparkle({ color: C.powder })}</div>`;
  $("#efReturn").innerHTML = M.returnAddress.map(esc).join("<br>");
  $("#efLines").innerHTML = M.addressLines.map((l) => `<li>${esc(l)}</li>`).join("");
  $("#efStamp").innerHTML = `<div class="stamp-art"><span class="val">${esc(S.year)}</span>${A.motifs.tower(C.ink)}<span class="cap">${esc(M.stampText)}</span></div>`;
  $("#efPostmark").innerHTML = A.postmark(M.postmark);
  $("#efBfly").innerHTML = A.butterfly({ color: C.delft, light: C.powder });
  $(".seal-half.l").innerHTML = A.waxSeal({ seed: 5, emblem: "butterfly" });
  $(".seal-half.r").innerHTML = A.waxSeal({ seed: 5, emblem: "butterfly" });
  $("#envLetter .el-greet").textContent = M.letter.greeting;

  const L = M.letter;
  $("#letterPaper").innerHTML = `
    <div class="lp-corner">${A.hydrangea({ seed: 12 })}</div>
    <div class="lp-bfly flap">${A.butterfly({ color: C.corn })}</div>
    <p class="lp-date">${esc(L.date)}</p>
    <h2 class="lp-greet">${esc(L.greeting)}</h2>
    <div class="lp-body">${L.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
    <p class="lp-sign">${esc(L.signoff)}<b>${esc(L.signature)}</b></p>
    <div class="lp-foot"><button class="ticket" id="enterBtn"><small>admit one</small><span>${esc(L.cta)} →</span></button></div>`;

  const env = $("#envelope"), hint = $("#envHint span");
  let envState = 0; // 0 front · 1 back · 2 opened
  const setHint = (t) => { hint.style.opacity = 0; setTimeout(() => { hint.textContent = t; hint.style.opacity = 1; }, 250); };
  hint.textContent = M.hintFront;

  async function openEnvelope() {
    envState = 2;
    env.classList.add("is-cracked");
    document.body.classList.add("is-open-env");
    await wait(reduced ? 0 : 420);
    env.classList.add("is-open");
    await wait(reduced ? 0 : 650);
    env.classList.add("is-out");
    setHint(M.hintDone);
    const r = env.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height * .2);
    await wait(reduced ? 0 : 900);
    openOverlay($("#letterOv"));
  }
  function onEnvelope(e) {
    if (envState === 0) {
      envState = 1;
      env.classList.add("is-flipped");
      env.setAttribute("aria-label", "Break the seal and open the envelope");
      setHint(M.hintBack);
    } else if (envState === 1) {
      openEnvelope();
    } else {
      openOverlay($("#letterOv"));
    }
    e.stopPropagation();
  }
  env.addEventListener("click", onEnvelope);
  env.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onEnvelope(e); } });
  $("#envSeal").addEventListener("click", (e) => { e.stopPropagation(); if (envState === 1) openEnvelope(); });

  function enter() {
    document.body.classList.remove("is-locked");
    document.body.classList.add("entered");
    store.set("entered", true);
  }
  $("#enterBtn").addEventListener("click", async () => {
    enter();
    await closeOverlay($("#letterOv"));
    $("#archives").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });
  // returning visitors can scroll freely (the envelope still works); first visit always starts at the envelope
  if (store.get("entered")) enter();
  else { history.scrollRestoration = "manual"; scrollTo(0, 0); }
  // letter overlay closed via scrim/esc also lets you in
  $("#letterOv").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) enter(); });

  /* ==================================================================
     02 · ARCHIVES
     ================================================================== */
  const AR = S.archives;
  $("#seam1").innerHTML = `<div class="flap">${A.butterfly({ color: C.corn })}</div>`;
  $("#arcArrow").innerHTML = A.arrow(C.delft);

  const attach = ["tape", "clip", "corners", "tape dots", "tape navy", "clip"];
  const photoHTML = (p, i) => p.src
    ? `<img src="${esc(p.thumb || p.src)}" ${p.thumb ? `data-full="${esc(p.src)}"` : ""} alt="${esc(p.caption)}" loading="lazy" decoding="async">`
    : `<span class="cyan">${A.placeholder(p.motif)}<span class="cyan-label">photo ${String(i + 1).padStart(2, "0")}</span></span>`;

  let boardHTML = "", noteN = 0;
  AR.photos.forEach((p, i) => {
    const a = attach[i % attach.length];
    const deco = a.startsWith("tape") ? `<span class="${a}"></span>` : a === "clip" ? A.paperclip() : `<span class="corners"></span>`;
    const shape = p.wide ? "wide" : p.src || i % 4 === 1 ? "tall" : "";
    boardHTML += `<button class="pol ${shape}" data-i="${i}" data-reveal aria-label="Enlarge photo: ${esc(p.caption)}">
      ${deco}<span class="pol-photo">${photoHTML(p, i)}<span class="pol-date">${esc(p.date)}</span></span>
      <span class="pol-cap">${esc(p.caption)}</span></button>`;
    // weave handwritten scraps (and one ticket stub) between the photos
    if (i === 5) boardHTML += `<aside class="ticket-stub" style="--r:5deg" data-reveal>admit two<b>${esc(S.friend)} &amp; me</b>row ∞ · seat 01</aside>`;
    if ((i + 1) % 7 === 3 && AR.notes[noteN]) {
      const n = noteN++;
      boardHTML += `<aside class="scrap ${n % 2 ? "blue" : ""}" style="--r:${n % 2 ? 3 : -3}deg" data-reveal>${esc(AR.notes[n])}</aside>`;
    }
  });
  const board = $("#board");
  board.innerHTML = boardHTML + `
    <div class="board-deco" style="width:clamp(60px,8vw,110px);left:36%;top:-4%;transform:rotate(-14deg)">${A.hydrangea({ seed: 31 })}</div>
    <div class="board-deco flap" style="width:44px;right:-1%;top:38%">${A.butterfly({ color: C.delft, light: C.powder })}</div>
    <div class="board-deco" style="width:22px;left:-2%;top:30%">${A.sparkle({ color: C.corn })}</div>
    <div class="board-deco" style="width:clamp(70px,9vw,120px);left:-4%;bottom:-3%;transform:rotate(22deg)">${A.bloom({ seed: 13 })}</div>`;

  // masonry: each item spans as many 4px rows as it is tall, so the board packs organically
  function pack() {
    const items = [...board.children].filter((el) => !el.classList.contains("board-deco"));
    items.forEach((el) => {
      const mt = parseFloat(getComputedStyle(el).marginTop) || 0;
      el.style.gridRowEnd = "span " + Math.ceil((el.offsetHeight + mt + 8) / 4);
    });
  }
  let packT;
  const repack = () => { clearTimeout(packT); packT = setTimeout(pack, 60); };
  addEventListener("resize", repack);
  document.fonts.ready.then(pack);
  // landscape photos get a wider frame once we know their shape
  $$("img", board).forEach((img) => {
    const fit = () => { if (img.naturalWidth > img.naturalHeight) img.closest(".pol").classList.replace("tall", "wide"); repack(); };
    img.complete && img.naturalWidth ? fit() : img.addEventListener("load", fit);
  });

  pack();

  // enlarge: hover on desktop, tap on touch screens (tap again or anywhere else to shrink)
  const touch = matchMedia("(hover: none)").matches;
  function prepZoom(pol) {
    const img = $("img[data-full]", pol);
    if (img) { img.src = img.dataset.full; img.removeAttribute("data-full"); } // sharp copy for the big view
    const r = pol.getBoundingClientRect(), w = pol.offsetWidth;
    const target = touch ? Math.min(innerWidth - 40, 300) : pol.classList.contains("wide") ? 460 : 340;
    pol.style.setProperty("--z", Math.max(1.2, Math.min(target / w, (innerWidth - 32) / w)).toFixed(2));
    // grow away from the screen edges so the enlarged photo stays fully visible
    const cx = (r.left + r.width / 2) / innerWidth, cy = (r.top + r.height / 2) / innerHeight;
    pol.style.transformOrigin = `${cx < .3 ? 0 : cx > .7 ? 100 : 50}% ${cy < .3 ? 0 : cy > .7 ? 100 : 50}%`;
  }
  const unzoom = () => $$(".pol.zoomed", board).forEach((p) => p.classList.remove("zoomed"));
  board.addEventListener("pointerover", (e) => {
    const pol = e.target.closest(".pol");
    if (pol && e.pointerType === "mouse" && !pol.contains(e.relatedTarget)) prepZoom(pol);
  });
  board.addEventListener("click", (e) => {
    const pol = e.target.closest(".pol");
    if (!pol) return;
    const was = pol.classList.contains("zoomed");
    unzoom();
    if (!was) { prepZoom(pol); pol.classList.add("zoomed"); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest("#board .pol")) unzoom(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") unzoom(); });
  addEventListener("scroll", () => { if (touch) unzoom(); }, { passive: true });

  /* ==================================================================
     03 · OPEN WHEN
     ================================================================== */
  const OW = S.openWhen;
  $("#seam2").outerHTML = `<div class="seam-deco seam-2" aria-hidden="true"></div><div class="seam-deco seam-2b" aria-hidden="true">${A.waxSeal({ seed: 9, emblem: "star" })}</div>`;
  const sealColors = {
    delft: { color: "#c9d7ee", highlight: "#ffffff", shadow: "#6f8fc9" },
    cornflower: { color: C.ink, highlight: "#3d5ea3", shadow: C.night }
  };
  const opened = new Set(store.get("opened-when") || []); // remembered by label, so editing the list never mixes them up
  const rots = [-3, 2.5, -1.5, 3.5, -2.5, 1.5];
  $("#pile").innerHTML = OW.letters.map((l, i) => `
    <button class="ow-env tone-${esc(l.tone)} ${opened.has(l.when) ? "opened" : ""}" data-i="${i}" style="--r:${rots[i % rots.length]}deg" data-reveal aria-label="Open when ${esc(l.when)}">
      <span class="oe-back"></span>
      <span class="oe-peek"></span>
      <span class="oe-body"><i class="l"></i><i class="r"></i><i class="b"></i></span>
      <span class="oe-flap"></span>
      <span class="oe-label"><small>open when</small><b>${esc(l.when)}</b></span>
      <span class="oe-seal">${A.waxSeal({ seed: 30 + i, emblem: l.seal, ...(sealColors[l.tone] || {}) })}</span>
      <span class="oe-opened">OPENED</span>
    </button>`).join("");

  $("#pile").addEventListener("click", async (e) => {
    const b = e.target.closest(".ow-env");
    if (!b) return;
    const i = +b.dataset.i, l = OW.letters[i];
    const firstTime = !b.classList.contains("opened");
    b.classList.add("opened");
    opened.add(l.when);
    store.set("opened-when", [...opened]);
    $("#owLetter").className = `ow-letter paper-${l.paper || "lined"}`;
    $("#owLetter").innerHTML = `
      <div class="owl-seal">${A.waxSeal({ seed: 30 + i, emblem: l.seal })}</div>
      <button class="close-x" data-close>close ✕</button>
      <p class="owl-when">open when <b>${esc(l.when)}</b></p>
      ${l.greeting ? `<h3 class="owl-greet">${esc(l.greeting)}</h3>` : `<div class="owl-gap"></div>`}
      <div class="owl-body">${l.body.map((p) => `<p${/^\d+\.\s/.test(p) ? ' class="num"' : ""}>${esc(p)}</p>`).join("")}</div>
      <p class="owl-sign">${esc(l.signoff || "")}<b>${esc(l.signature || S.from)}</b></p>
      <div class="owl-foot"><button class="hand-btn" data-close>fold it back up</button></div>`;
    if (firstTime) await wait(reduced ? 0 : 650);
    openOverlay($("#owModal"));
  });

  /* ==================================================================
     04 · REMEMBER WHEN
     ================================================================== */
  const RW = S.rememberWhen;
  $("#seam3").innerHTML = A.hydrangea({ seed: 77 });
  const NOTES = 34;
  $("#jarBtn").innerHTML = A.jar(NOTES);
  $("#memBtn").textContent = RW.button + " ↻";
  $("#memText").textContent = RW.empty;
  $("#memText").classList.add("muted");

  let bag = [], pulled = 0;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  async function pull() {
    if (!bag.length) {
      bag = shuffle(RW.memories.map((_, i) => i));
      $$(".jn").forEach((n) => n.classList.remove("gone"));
      pulled = 0;
    }
    const idx = bag.pop();
    pulled++;
    const jarBtn = $("#jarBtn");
    jarBtn.classList.remove("shake"); void jarBtn.offsetWidth; jarBtn.classList.add("shake");
    // hide one note from the top of the pile
    const notes = $$(".jn:not(.gone)");
    if (notes.length) notes[notes.length - 1].classList.add("gone");
    // fly a note from the jar mouth to the card
    if (!reduced) {
      const jr = jarBtn.getBoundingClientRect(), cr = $("#memCard").getBoundingClientRect();
      const n = document.createElement("i");
      n.className = "flying-note";
      n.style.left = jr.left + jr.width / 2 + "px";
      n.style.top = jr.top + jr.height * .25 + "px";
      document.body.appendChild(n);
      const dx = cr.left + cr.width / 2 - (jr.left + jr.width / 2), dy = cr.top + cr.height / 2 - (jr.top + jr.height * .25);
      n.animate([
        { transform: "translate(-50%,-50%) rotate(0)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx * .4}px), calc(-50% + ${-140}px)) rotate(200deg) scale(1.2)`, opacity: 1, offset: .5 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(380deg) scale(2.4)`, opacity: 0 }
      ], { duration: 800, easing: "cubic-bezier(.3,.7,.4,1)" }).onfinish = () => n.remove();
      await wait(650);
    }
    const card = $("#memCard");
    $("#memNo").textContent = `no. ${String(idx + 1).padStart(2, "0")} of ${RW.memories.length}`;
    const mem = RW.memories[idx], art = typeof mem === "object" && A.doodles[mem.art];
    $("#memText").textContent = typeof mem === "string" ? mem : mem.text;
    $("#memArt").innerHTML = art ? art() : "";
    card.classList.toggle("has-art", !!art);
    $("#memText").classList.remove("muted");
    card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop");
    $("#memBtn").textContent = RW.again + " ↻";
  }
  $("#jarBtn").addEventListener("click", pull);
  $("#memBtn").addEventListener("click", pull);

  /* ==================================================================
     05 · QUIZ
     ================================================================== */
  const Q = S.quiz;
  if (!Q || !Q.enabled) {
    $("#quiz").remove();
    $("[data-tab='quiz']").remove();
  } else {
    $("#seam4").innerHTML = `<div class="stamp" style="--perf:4px"><div class="stamp-art" style="container-type:inline-size"><span class="val">♪</span>${A.motifs.notes(C.ink)}<span class="cap">SISTER POST</span></div></div>`;
    const stack = $("#qzStack"), n = Q.questions.length;
    const pick = (list, fallback) => (list && list.length ? list[Math.floor(Math.random() * list.length)] : fallback);
    const norm = (t) => String(t).toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/^(the|a|an) /, "").trim();
    let qi = 0, score = 0;

    async function show(html) {
      const old = $(".qz-card", stack);
      if (old && !reduced) { old.classList.add("leave"); await wait(380); }
      stack.innerHTML = `<article class="qz-card arrive"><span class="qz-tape"></span>${html}</article>`;
    }
    function renderQ() {
      const q = Q.questions[qi];
      const answers = q.type === "text"
        ? `<form class="qz-type" id="qzForm"><input id="qzInput" type="text" autocomplete="off" placeholder="${esc(q.placeholder || "type your answer…")}" aria-label="Your answer"><button class="hand-btn" type="submit">check ✓</button></form>`
        : `<ul class="qz-opts">${q.options.map((o, k) => `<li><button class="qz-opt" data-k="${k}">${esc(o)}</button></li>`).join("")}</ul>`;
      return show(`
        <div class="qz-count"><span>question ${qi + 1} of ${n}</span><span class="qz-dots">${Q.questions.map((_, k) => `<i class="${k < qi ? "done" : k === qi ? "now" : ""}"></i>`).join("")}</span></div>
        <p class="qz-q">${esc(q.q)}</p>
        ${answers}
        <p class="qz-note" id="qzNote"></p>
        <div class="qz-foot" id="qzFoot"></div>`);
    }
    function answered(right, reveal) {
      const q = Q.questions[qi];
      if (right) score++;
      const note = $("#qzNote");
      note.innerHTML = right
        ? esc(q.right || pick(Q.right, "yes!"))
        : esc(q.wrong || pick(Q.wrong, "nope")) + (reveal ? ` — it's <b>${esc(reveal)}</b>` : "");
      note.classList.add("pop");
      $("#qzFoot").innerHTML = `<button class="hand-btn" id="qzNext">${qi === n - 1 ? "see my score →" : "next card →"}</button>`;
      $("#qzNext").focus({ preventScroll: true });
    }
    function renderResult() {
      const r = Q.results.find((x) => score >= Math.min(x.min, n)) || Q.results[Q.results.length - 1];
      show(`
        <div class="qz-result">
          <p class="you">you got…</p>
          <div class="score">${score}/${n}${A.handCircle()}</div>
          <div><span class="big-stamp">${esc(r.stamp)}</span></div>
          <h3>${esc(r.title)}</h3>
          <p>${esc(r.message)}</p>
          <button class="hand-btn" id="qzAgain">play again ↻</button>
        </div>`).then(() => {
        if (score >= n) setTimeout(() => { const b = $(".big-stamp").getBoundingClientRect(); burst(b.left + b.width / 2, b.top + b.height / 2, 50); }, 1100);
      });
    }

    stack.addEventListener("click", (e) => {
      const opt = e.target.closest(".qz-opt");
      if (opt) {
        const q = Q.questions[qi], k = +opt.dataset.k, opts = $$(".qz-opt", stack);
        opts.forEach((b) => (b.disabled = true));
        opt.parentElement.parentElement.classList.add("answered");
        opt.classList.add("picked");
        opt.insertAdjacentHTML("beforeend", A.handCircle());
        opts[q.answer].classList.add("right");
        answered(k === q.answer);
        return;
      }
      if (e.target.closest("#qzNext")) { qi++; qi < n ? renderQ() : renderResult(); return; }
      if (e.target.closest("#qzAgain")) { qi = 0; score = 0; renderQ(); }
    });
    stack.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = Q.questions[qi], input = $("#qzInput");
      if (!input.value.trim() || input.disabled) return;
      input.disabled = true;
      $("#qzForm button").remove();
      const ok = [q.answer, ...(q.accept || [])].some((a) => norm(a) === norm(input.value));
      answered(ok, q.answer);
    });
    renderQ();
  }

  /* ==================================================================
     FOOTER
     ================================================================== */
  const F = S.footer;
  const words = F.big.split(" ");
  const lastWord = words.pop();
  $("#foot").innerHTML = `
    <div class="foot-pm">${A.postmark({ ring: "DELIVERED WITH LOVE ✦ " + S.year + " ✦", line1: "FOR", line2: S.friend.toUpperCase() })}</div>
    <h2 class="foot-big">${esc(words.join(" "))}<b>${esc(lastWord)}</b></h2>
    <p class="foot-line">${esc(F.line)}</p>
    <p class="foot-sig">— ${esc(F.signature)}</p>
    <p class="foot-small">${esc(F.small)}</p>
    <a class="hand-btn foot-top" href="#mail" style="display:inline-block;text-decoration:none">read the first letter again ↑</a>
    <div class="foot-bfly flap" style="left:12%;top:24%;transform:rotate(-16deg)">${A.butterfly({ color: C.powder, dark: C.ice, light: C.corn })}</div>
    <div class="foot-bfly flap" style="right:10%;bottom:30%;width:38px;transform:rotate(20deg)">${A.butterfly({ color: C.corn, dark: C.ice, light: C.mist })}</div>`;

  /* ── reveal on scroll + active tab ────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
      el.style.transitionDelay = (sibs.indexOf(el) % 3) * 90 + "ms";
      el.classList.add("in");
      io.unobserve(el);
      setTimeout(() => (el.style.transitionDelay = ""), 1400);
    });
  }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
  $$("[data-reveal]").forEach((el) => io.observe(el));

  const tabs = $$("#tabs a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) tabs.forEach((t) => t.classList.toggle("on", t.dataset.tab === en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["mail", "archives", "letters", "jar", "quiz"].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
})();
