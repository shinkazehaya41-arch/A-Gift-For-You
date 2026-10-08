
const CONFIG = {
  greeting: {
    title: "HI MY PERSON!",
    sub: "Would you like to see your gift?"
  },
  flowers: {
    title: "Flowers for you",
    sub: "Click the letter for a surprise",
    vase: ["Happy Birthday, my Favorite person!"]
  },
  please: {
    title: "PLEASE?",
    sub: "I prepared this gift for you"
  },
  letter: {
    title: "Happy Birthday, My Person!",
    body:
      "Happy birthday bebi always remember that youre the most beautyfull for me. " +
      "Always enjoy your life dont pressure yourself in my feeling cause i can wait. " +
      "I will wait till youre ready and i will never ever feel tired cause you're always " +
      "giving me assurance that youre mine and i will give you assurance that im yours. " +
      "keep enjoying life bebi make tito and tita proud not just them but your brother also," +
      "i will always be your partner, bestprend and listener and i will always be your shoulder to cry on and your pillow to sleep on" +
      "I will always be your person and you will always be mine" +
      "I love you so much bebi and i will never ever let you go" +
      "I will always be here for you❤️" 
  }
};

/* ---------------- Apply messages ---------------- */
const $ = (id) => document.getElementById(id);

$("greetTitle").textContent = CONFIG.greeting.title;
$("greetSub").textContent = CONFIG.greeting.sub;
$("flowersTitle").textContent = CONFIG.flowers.title;
$("flowersSub").textContent = CONFIG.flowers.sub;
$("vaseLine1").textContent = CONFIG.flowers.vase[0] || "";
$("vaseLine2").textContent = CONFIG.flowers.vase[1] || "";
$("pleaseTitle").textContent = CONFIG.please.title;
$("pleaseSub").textContent = CONFIG.please.sub;
$("letterTitle").textContent = CONFIG.letter.title;
$("letterBody").textContent = CONFIG.letter.body;
$("theEnd").textContent = CONFIG.letter.end || "The end… but only the beginning ❤️";

/* ---------------- Screen navigation ---------------- */
const screens = ["s1", "s2", "s3", "s4"];

function show(id) {
  screens.forEach((s) => $(s).classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  blip(id === "s4" ? 740 : 520);
}

$("yesBtn").addEventListener("click", () => { show("s2"); confetti(); });
$("noBtn").addEventListener("click", () => show("s3"));
$("backBtn").addEventListener("click", () => show("s1"));
$("backFromS2").addEventListener("click", () => show("s1"));
$("backFromS4").addEventListener("click", () => show("s2"));
$("restartBtn").addEventListener("click", () => { show("s1"); confetti(24); });

function openLetter() {
  show("s4");
  heartBurst(24);
  confetti(44);
}
$("letterBtn").addEventListener("click", openLetter);
$("bouquet").addEventListener("click", openLetter);
$("bouquet").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLetter();
  }
});

/* ---------------- Tiny sound blip ---------------- */
function blip(freq = 520, dur = 0.1) {
  try {
    const ctx = blip.ctx || (blip.ctx = new (window.AudioContext || window.webkitAudioContext)());
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  } catch (_) { /* audio unavailable */ }
}

/* ---------------- Falling petals ---------------- */
const petalLayer = $("petalLayer");

const PETAL_COLORS = [
  "linear-gradient(135deg, #ff8fab, #e83e8c)",
  "linear-gradient(135deg, #ffd43b, #f76707)",
  "linear-gradient(135deg, #b197fc, #7048e8)",
  "linear-gradient(135deg, #63e6be, #2f9e44)",
  "linear-gradient(135deg, #ffa8cc, #e83e8c)"
];
const PETAL_EMOJIS = ["🌷", "🌸", "💮", "🌼", "🍀"];

function spawnPetal() {
  const p = document.createElement("span");
  p.style.left = Math.random() * 100 + "vw";
  p.style.setProperty("--sway", (Math.random() * 160 - 80) + "px");
  p.style.animationDuration = 7 + Math.random() * 6 + "s";

  if (Math.random() < 0.3) {
    p.className = "petal-emoji";
    p.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
  } else {
    p.className = "petal";
    const size = 10 + Math.random() * 12;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.background = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  }
  petalLayer.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}
spawnPetal();
spawnPetal();
setInterval(spawnPetal, 650);

const CONFETTI_COLORS = ["#e83e8c", "#ae3ec9", "#f76707", "#2f9e44", "#fcc419", "#12b886", "#ff6b6b"];
const CONFETTI_EMOJIS = ["🎉", "🎊", "💖", "🌷", "✨", "💛"];

function confetti(count = 36) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement("span");
      c.style.left = Math.random() * 100 + "vw";
      c.style.setProperty("--sway", (Math.random() * 220 - 110) + "px");
      c.style.animationDuration = 2.4 + Math.random() * 2 + "s";

      if (Math.random() < 0.25) {
        c.className = "confetti-emoji";
        c.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
      } else {
        c.className = "confetti" + (Math.random() < 0.4 ? " round" : "");
        c.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      }
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }, i * 40);
  }
}

/* ---------------- Heart burst (when letter opens) ---------------- */
function heartBurst(count = 20) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = ["❤️", "💖", "💕", "🌷"][Math.floor(Math.random() * 4)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
      h.style.fontSize = 18 + Math.random() * 22 + "px";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }, i * 90);
  }
}

/* ---------------- Sparkle cursor ---------------- */
const SPARK_COLORS = ["#e83e8c", "#ae3ec9", "#f76707", "#2f9e44", "#fcc419", "#12b886"];
const SPARK_GLYPHS = ["✦", "❀", "🌷", "✨", "💛", "🌸"];
let lastSpark = 0;
document.addEventListener("pointermove", (e) => {
  if (e.pointerType && e.pointerType !== "mouse") return;
  const now = Date.now();
  if (now - lastSpark < 70) return;
  lastSpark = now;

  const s = document.createElement("span");
  s.className = "sparkle";
  s.textContent = SPARK_GLYPHS[Math.floor(Math.random() * SPARK_GLYPHS.length)];
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  s.style.opacity = 0.85;
  s.style.color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 850);
});
