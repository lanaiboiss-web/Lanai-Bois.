import React from "react";
import { useState, useEffect, useRef } from "react";
const services = [
{ icon: "🚗 ", title: "Car Washing", desc: "Spotless rides, every time. We come to you anywhere in Mililani." },
{ icon: "🗑️ ", title: "Trash Can Cleaning", desc: "Deep-cleaned and deodorized bins — your neighbors will notice." },
{ icon: "🪟 ", title: "Window Cleaning", desc: "Crystal-clear views of the island. Inside, outside, no streaks." },
{ icon: "🌿 ", title: "Lawn Mowing", desc: "Neat, clean cuts that make your yard the best on the block." },
{ icon: "🍂 ", title: "Gutter Cleaning", desc: "We clear the clogs before the rain hits. Stay worry-free." },
{ icon: "🐕 ", title: "Dog Walking", desc: "Happy pups, happy owners. Daily walks around your neighborhood." },
];
const galleryItems = [
{ icon: "🚗 ", label: "Car Washing", beforeColor: "#b0b0b0", afterColor: "#d8f3dc", beforeText: "Dusty & dirty", afterText: "Sparkling clean" },
{ icon: "🌿 ", label: "Lawn Mowing", beforeColor: "#c8b97a", afterColor: "#b7e4c7", beforeText: "Overgrown", afterText: "Fresh & neat" },
{ icon: "🪟 ", label: "Window Cleaning", beforeColor: "#a8b8c8", afterColor: "#caf0f8", beforeText: "Streaky & grimy", afterText: "Crystal clear" },
{ icon: "🐕 ", label: "Dog Walking", beforeColor: "#d4b896", afterColor: "#fde8c8", beforeText: "Restless pup", afterText: "Happy & tired" },
{ icon: "🍂 ", label: "Gutter Cleaning", beforeColor: "#b8956a", afterColor: "#f9dcc4", beforeText: "Clogged up", afterText: "Free flowing" },
{ icon: "🗑️ ", label: "Trash Can Cleaning", beforeColor: "#9a9a9a", afterColor: "#e9ecef", beforeText: "Smelly & stained", afterText: "Fresh & clean" },
];
const NAV_LINKS = ["Services", "Pricing", "Gallery", "About", "Testimonials", "FAQ", "Contact"];
const pricing = [
{ icon: "🚗 ", title: "Car Wash — Exterior", price: "$20", note: "Outside only, hand washed & dried" },
{ icon: "🚗💺 ", title: "Car Wash + Interior Cleaning", price: "$35", note: "Exterior + interior vacuum & seat cleaning" },
{ icon: "🗑️ ", title: "Trash Can Cleaning", price: "$10", note: "Per can, deep cleaned & deodorized" },
{ icon: "🪟 ", title: "Window Cleaning", price: "$10", note: "Per window, inside & outside" },
{ icon: "🌿 ", title: "Lawn Mowing", price: "$25", note: "Standard residential yard" },
{ icon: "🍂 ", title: "Gutter Cleaning", price: "$50", note: "Full gutter clear out" },
{ icon: "🦮 ", title: "Dog Walking", price: "$15", note: "Per walk, Mililani area" },
];
const faqs = [
{ q: "What areas do you serve?", a: "We're based in Mililani, Hawaii and serve the surrounding area. Not sure if we cover your neighborhood? DM us on Instagram and we'll let you know!" },
{ q: "How do I pay?", a: "We accept cash only. Payment is due after the job is done and you're happy with the results." },
{ q: "Do I need to book in advance?", a: "We recommend booking at least a week in advance to secure your spot, especially on weekends. Reach out early and we'll do our best to fit you in!" },
{ q: "How do I cancel or reschedule?", a: "Life happens — no worries! Just DM us on Instagram or send us an email to cancel or reschedule. No penalties, ever." },
{ q: "Do you bring your own supplies?", a: "Yes! We bring everything we need to get the job done. You don't have to lift a finger." },
{ q: "How long will the service take?", a: "It depends on the volume of work needed. A small job might take 30 minutes while a bigger one could take a few hours. We'll give you a better estimate when you book." },
];
// ── Floating particles for hero ──────────────────────────────────────────────
function HeroCanvas() {
const ref = useRef();

useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf;
let mouse = { x: -999, y: -999 };
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
canvas.addEventListener("mousemove", e => {
const r = canvas.getBoundingClientRect();
mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
});
const EMOJIS = [" "," "," "," "," "," "];
const particles = Array.from({ length: 28 }, (_, i) => ({
x: Math.random() * 1200, y: Math.random() * 800,
vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
size: 14 + Math.random() * 18,
emoji: EMOJIS[i % EMOJIS.length],
opacity: 0.15 + Math.random() * 0.25,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach(p => {
const dx = p.x - mouse.x, dy = p.y - mouse.y;
const dist = Math.sqrt(dx*dx + dy*dy);
if (dist < 120) { p.vx += dx / dist * 0.3; p.vy += dy / dist * 0.3; }
p.vx *= 0.98; p.vy *= 0.98;
p.x += p.vx; p.y += p.vy;
if (p.x < 0) p.x = canvas.width;
if (p.x > canvas.width) p.x = 0;
if (p.y < 0) p.y = canvas.height;
if (p.y > canvas.height) p.y = 0;
ctx.globalAlpha = p.opacity;
ctx.font = `${p.size}px serif`;
ctx.fillText(p.emoji, p.x, p.y);
});
ctx.globalAlpha = 1;
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}

// ── Floating price tags for pricing section ───────────────────────────────────
function PricingCanvas() {
const ref = useRef();
useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf;
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
const tags = Array.from({ length: 16 }, () => ({
x: Math.random() * 1200, y: Math.random() * 600,
vy: -0.3 - Math.random() * 0.3,
size: 11 + Math.random() * 10,
label: ["$10","$15","$20","$25","$35","$50"][Math.floor(Math.random()*6)],
opacity: 0.06 + Math.random() * 0.1,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
tags.forEach(t => {
t.y += t.vy;
if (t.y < -30) { t.y = canvas.height + 10; t.x = Math.random() * canvas.width; }
ctx.globalAlpha = t.opacity;
ctx.font = `bold ${t.size}px 'DM Sans', sans-serif`;
ctx.fillStyle = "#2d6a4f";
ctx.fillText(t.label, t.x, t.y);
});
ctx.globalAlpha = 1;
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
// ── Twinkling stars for about (night sky feel) ────────────────────────────────
function StarsCanvas() {
const ref = useRef();
useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf, t = 0;
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
const stars = Array.from({ length: 60 }, () => ({

x: Math.random(), y: Math.random(),
r: 0.5 + Math.random() * 1.5,
phase: Math.random() * Math.PI * 2,
speed: 0.01 + Math.random() * 0.02,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
t += 0.016;
stars.forEach(s => {
const alpha = 0.2 + 0.5 * Math.abs(Math.sin(t * s.speed + s.phase));
ctx.beginPath();
ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
ctx.fillStyle = `rgba(149,213,178,${alpha})`;
ctx.fill();
});
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
// ── Falling leaves for FAQ ────────────────────────────────────────────────────
function LeavesCanvas() {
const ref = useRef();
useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf;
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
const leaves = Array.from({ length: 20 }, () => ({
x: Math.random() * 1200, y: Math.random() * 800,
vy: 0.4 + Math.random() * 0.6,
vx: (Math.random() - 0.5) * 0.4,
rot: Math.random() * Math.PI * 2,
rotSpeed: (Math.random() - 0.5) * 0.02,
size: 12 + Math.random() * 10,
emoji: [" "," "," "][Math.floor(Math.random()*3)],
opacity: 0.12 + Math.random() * 0.15,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
leaves.forEach(l => {
l.y += l.vy; l.x += l.vx; l.rot += l.rotSpeed;

if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width; }
ctx.save();
ctx.globalAlpha = l.opacity;
ctx.translate(l.x, l.y);
ctx.rotate(l.rot);
ctx.font = `${l.size}px serif`;
ctx.fillText(l.emoji, -l.size/2, l.size/2);
ctx.restore();
});
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
// ── Ripple bubbles for contact ────────────────────────────────────────────────
function BubblesCanvas() {
const ref = useRef();
useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf;
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
const bubbles = Array.from({ length: 18 }, () => ({
x: Math.random() * 1200, y: Math.random() * 600 + 600,
vy: -(0.5 + Math.random() * 0.8),
r: 6 + Math.random() * 18,
opacity: 0.05 + Math.random() * 0.1,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
bubbles.forEach(b => {
b.y += b.vy;
if (b.y < -30) { b.y = canvas.height + 30; b.x = Math.random() * canvas.width; }
ctx.beginPath();
ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
ctx.strokeStyle = `rgba(45,106,79,${b.opacity})`;
ctx.lineWidth = 1.5;
ctx.stroke();
});
raf = requestAnimationFrame(draw);
};
draw();

return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
// ── Wave SVG for services section ─────────────────────────────────────────────
function WaveBackground() {
const ref = useRef();
useEffect(() => {
let t = 0, raf;
const el = ref.current;
const animate = () => {
t += 0.012;
const y1 = 30 + Math.sin(t) * 8;
const y2 = 50 + Math.sin(t + 1) * 10;
const y3 = 20 + Math.sin(t + 2) * 6;
el.style.backgroundImage = `
radial-gradient(ellipse 70% 40% at 20% ${y1}%, rgba(184,231,196,0.25) 0%, transparent 70%),
radial-gradient(ellipse 50% 50% at 80% ${y2}%, rgba(244,162,97,0.1) 0%, transparent 60%),
radial-gradient(ellipse 60% 30% at 50% ${y3}%, rgba(149,213,178,0.15) 0%, transparent 70%)
`;
raf = requestAnimationFrame(animate);
};
animate();
return () => cancelAnimationFrame(raf);
}, []);
return <div ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0, transition: "background 0.1s" }} />;
}
// ── Grid shimmer for gallery ──────────────────────────────────────────────────
function GridBackground() {
return (
<div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
<div style={{
position: "absolute", inset: 0,
backgroundImage: "linear-gradient(rgba(45,106,79,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,106,79,0.04) 1px, transparent 1px)",
backgroundSize: "40px 40px",
}} />
<div style={{
position: "absolute", inset: 0,
background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(216,243,220,0.5) 0%, transparent 70%)",
}} />
</div>
);
}
// ── Reviews: floating stars ───────────────────────────────────────────────────

function ReviewStarsCanvas() {
const ref = useRef();
useEffect(() => {
const canvas = ref.current;
const ctx = canvas.getContext("2d");
let raf;
const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
resize();
window.addEventListener("resize", resize);
const stars = Array.from({ length: 22 }, () => ({
x: Math.random() * 1200, y: Math.random() * 800,
vy: -(0.2 + Math.random() * 0.3),
vx: (Math.random() - 0.5) * 0.15,
size: 10 + Math.random() * 14,
opacity: 0.06 + Math.random() * 0.1,
}));
const draw = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
stars.forEach(s => {
s.y += s.vy; s.x += s.vx;
if (s.y < -20) { s.y = canvas.height + 10; s.x = Math.random() * canvas.width; }
ctx.globalAlpha = s.opacity;
ctx.font = `${s.size}px serif`;
ctx.fillStyle = "#f4a261";
ctx.fillText("★", s.x, s.y);
});
ctx.globalAlpha = 1;
raf = requestAnimationFrame(draw);
};
draw();
return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}, []);
return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
function useInView(ref) {
const [inView, setInView] = useState(false);
useEffect(() => {
const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
if (ref.current) obs.observe(ref.current);
return () => obs.disconnect();
}, []);
return inView;
}
function FadeIn({ children, delay = 0, style = {} }) {
const ref = useRef();

const inView = useInView(ref);
return (
<div ref={ref} style={{ position: "relative", zIndex: 2, transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", ...style }}>
{children}
</div>
);
}
function BeforeAfterSlider({ item }) {
const [sliderPos, setSliderPos] = useState(50);
const [dragging, setDragging] = useState(false);
const containerRef = useRef();
const getPos = (clientX) => {
const rect = containerRef.current.getBoundingClientRect();
return (Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100;
};
return (
<div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1.5px solid #e8f5e9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
<div style={{ padding: "18px 24px 14px", display: "flex", alignItems: "center", gap: 10 }}>
<span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
<span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1b4332" }}>{item.label}</span>
</div>
<div ref={containerRef} style={{ position: "relative", height: 200, cursor: "ew-resize", userSelect: "none" }}
onMouseMove={e => { if (dragging) setSliderPos(getPos(e.clientX)); }}
onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}
onTouchMove={e => { e.preventDefault(); setSliderPos(getPos(e.touches[0].clientX)); }}
onTouchEnd={() => setDragging(false)}
>
<div style={{ position: "absolute", inset: 0, background: item.beforeColor, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
<span style={{ fontSize: "2.8rem", opacity: 0.35 }}>{item.icon}</span>
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#fff", letterSpacing: 1, textTransform: "uppercase", opacity: 0.7 }}>{item.beforeText}</span>
<div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,0.35)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px", borderRadius: 20 }}>Before</div>
</div>
<div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${sliderPos}%)`, background: item.afterColor, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
<span style={{ fontSize: "2.8rem" }}>{item.icon}</span>
<span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#1b4332", letterSpacing: 1, textTransform: "uppercase" }}>{item.afterText}</span>
<div style={{ position: "absolute", top: 10, right: 12, background: "#2d6a4f", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "4px 10px", borderRadius: 20 }}>After</div>
</div>
<div style={{ position: "absolute", top: 0, bottom: 0, left: `${sliderPos}%`, width: 3, background: "#fff", boxShadow: "0 0 8px rgba(0,0,0,0.3)", transform: "translateX(-50%)", pointerEvents: "none" }} />
<div style={{ position: "absolute", top: "50%", left: `${sliderPos}%`, transform: "translate(-50%,-50%)", width: 38, height: 38, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "ew-resize", zIndex: 10 }}
onMouseDown={() => setDragging(true)} onTouchStart={() => setDragging(true)}>
<span style={{ fontSize: "0.85rem", color: "#2d6a4f", fontWeight: 900 }}>⇔</span>
</div>
</div>
<div style={{ padding: "10px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#bbb", textAlign: "center" }}>← Drag to compare →</div>
</div>
);

}
function FaqItem({ q, a }) {
const [open, setOpen] = useState(false);
return (
<div onClick={() => setOpen(!open)} style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", borderRadius: 16, border: "1.5px solid rgba(232,245,233,0.8)", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.3s", boxShadow: open ? "0 8px 24px rgba(45,106,79,0.1)" : "none" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
<span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#1b4332", paddingRight: 16 }}>{q}</span>
<span style={{ fontSize: "1.3rem", color: "#2d6a4f", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
</div>
{open && <div style={{ padding: "0 24px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#666", lineHeight: 1.75, fontWeight: 300 }}>{a}</div>}
</div>
);
}
export default function LanaiBois() {
const [menuOpen, setMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [heroVisible, setHeroVisible] = useState(false);
const [reviews, setReviews] = useState([]);
const [reviewForm, setReviewForm] = useState({ name: "", text: "", stars: 5 });
const [reviewSubmitted, setReviewSubmitted] = useState(false);
useEffect(() => {
setTimeout(() => setHeroVisible(true), 120);
const handleScroll = () => setScrolled(window.scrollY > 40);
window.addEventListener("scroll", handleScroll);
(async () => {
try {
const saved = await window.storage.get("lanaibois-reviews");
if (saved) setReviews(JSON.parse(saved.value));
} catch {}
})();
return () => window.removeEventListener("scroll", handleScroll);
}, []);
const handleReviewSubmit = async () => {
if (!reviewForm.name || !reviewForm.text) return;
const newReview = { ...reviewForm, date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }) };
const updated = [newReview, ...reviews];
setReviews(updated);
try { await window.storage.set("lanaibois-reviews", JSON.stringify(updated)); } catch {}
setReviewSubmitted(true);
setReviewForm({ name: "", text: "", stars: 5 });
setTimeout(() => setReviewSubmitted(false), 3000);
};

const scrollTo = (id) => {
document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
setMenuOpen(false);
};
return (
<div style={{ fontFamily: "'Georgia', serif", background: "#fffdf8", color: "#2d2a1e", minHeight: "100vh", overflowX: "hidden" }}>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.35s; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
.nav.scrolled { background: rgba(255,253,248,0.96); backdrop-filter: blur(12px); box-shadow: 0 2px 24px rgba(0,0,0,0.07); padding: 14px 40px; }
.nav-logo { font-family: 'Syne', sans-serif; font-size: 1.55rem; font-weight: 800; color: #1b4332; cursor: pointer; letter-spacing: -0.5px; }
.nav-logo span { color: #f4a261; }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links li { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; color: #444; transition: color 0.2s; }
.nav-links li:hover { color: #2d6a4f; }
.nav-ig { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; padding: 8px 18px; border-radius: 30px; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
.nav-ig:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(220,39,67,0.3); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
.hamburger span { display: block; width: 24px; height: 2px; background: #2d2a1e; }
.mobile-menu { display: none; position: fixed; inset: 0; background: #fffdf8; z-index: 99; flex-direction: column; align-items: center; justify-content: center; gap: 36px; }
.mobile-menu.open { display: flex; }
.mobile-menu li { font-family: 'DM Sans', sans-serif; font-size: 1.3rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; list-style: none; }
.mobile-close { position: absolute; top: 24px; right: 32px; font-size: 2rem; cursor: pointer; }
.section { padding: 100px 24px; position: relative; overflow: hidden; }
.section-label { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: #f4a261; margin-bottom: 10px; text-align: center; position: relative; z-index: 2; }
.section-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; text-align: center; color: #1b4332; margin-bottom: 14px; letter-spacing: -1px; position: relative; z-index: 2; }
.section-sub { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; color: #777; text-align: center; max-width: 500px; margin: 0 auto 64px; line-height: 1.75; font-weight: 300; position: relative; z-index: 2; }
.btn-primary { background: #1b4332; color: #fff; border: none; padding: 15px 34px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; box-shadow: 0 6px 24px rgba(27,67,50,0.25); }
.btn-primary:hover { background: #2d6a4f; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(27,67,50,0.35); }
.btn-outline { background: transparent; color: #1b4332; border: 2px solid #1b4332; padding: 15px 34px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 1.2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; }
.btn-outline:hover { background: #1b4332; color: #fff; transform: translateY(-3px); }
.hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; background: linear-gradient(145deg, #d8f3dc 0%, #fffdf8 45%, #fde8c8 100%); }
.hero-content { text-align: center; padding: 100px 24px 80px; position: relative; z-index: 2; transition: all 0.9s cubic-bezier(0.16,1,0.3,1); opacity: 0; transform: translateY(40px); }
.hero-content.visible { opacity: 1; transform: translateY(0); }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #b7e4c7; color: #2d6a4f; font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 7px 18px; border-radius: 30px; margin-bottom: 28px; box-shadow: 0 2px 12px rgba(45,106,79,0.1); }
.hero-title { font-family: 'Syne', sans-serif; font-size: clamp(3.5rem, 10vw, 7.5rem); font-weight: 800; line-height: 1; color: #1b4332; margin-bottom: 8px; letter-spacing: -2px; }
.hero-title span { color: #f4a261; display: block; }
.hero-sub { font-family: 'DM Sans', sans-serif; font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight: 300; color: #666; max-width: 480px; margin: 20px auto 40px; line-height: 1.75; }
.hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.hero-scroll { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; opacity: 0.4; z-index: 2; }

.hero-scroll-dot { width: 6px; height: 6px; border-radius: 50%; background: #1b4332; animation: scrollBounce 1.6s infinite; }
.hero-scroll-dot:nth-child(2) { animation-delay: 0.2s; }
.hero-scroll-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes scrollBounce { 0%,80%,100% { opacity: 0.2; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.2); } }
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px; max-width: 1020px; margin: 0 auto; position: relative; z-index: 2; }
.service-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-radius: 24px; padding: 36px 28px; border: 1.5px solid #e8f5e9; transition: all 0.35s cubic-bezier(0.16,1,0.3,1); position: relative; overflow: hidden; }
.service-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #2d6a4f, #95d5b2); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
.service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(45,106,79,0.13); border-color: #b7e4c7; }
.service-card:hover::after { transform: scaleX(1); }
.service-icon { font-size: 2.6rem; margin-bottom: 18px; }
.service-title { font-family: 'Syne', sans-serif; font-size: 1.15rem; font-weight: 700; color: #1b4332; margin-bottom: 10px; }
.service-desc { font-family: 'DM Sans', sans-serif; font-size: 0.93rem; color: #777; line-height: 1.7; font-weight: 300; }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; max-width: 1020px; margin: 0 auto; position: relative; z-index: 2; }
.pricing-card { background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); border-radius: 20px; padding: 28px 24px; border: 1.5px solid #e8f5e9; display: flex; align-items: center; justify-content: space-between; gap: 16px; transition: all 0.3s; }
.pricing-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(45,106,79,0.1); border-color: #b7e4c7; }
.pricing-left { display: flex; align-items: center; gap: 14px; }
.pricing-icon { font-size: 2rem; }
.pricing-title { font-family: 'Syne', sans-serif; font-size: 0.98rem; font-weight: 700; color: #1b4332; margin-bottom: 4px; }
.pricing-note { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: #999; font-weight: 300; }
.pricing-price { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #f4a261; white-space: nowrap; }
.pricing-banner { max-width: 1020px; margin: 32px auto 0; background: linear-gradient(135deg, #1b4332, #2d6a4f); border-radius: 20px; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; position: relative; z-index: 2; }
.pricing-banner-text { font-family: 'DM Sans', sans-serif; color: #b7e4c7; font-size: 0.95rem; font-weight: 300; }
.pricing-banner-text strong { color: #fff; font-weight: 700; display: block; font-size: 1.05rem; margin-bottom: 4px; }
.ig-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; padding: 14px 30px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: 1px; text-decoration: none; transition: all 0.25s; box-shadow: 0 6px 24px rgba(220,39,67,0.25); }
.ig-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(220,39,67,0.35); }
.about { background: #1b4332; }
.about-inner { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; position: relative; z-index: 2; }
.about .section-label { color: #95d5b2; text-align: left; }
.about .section-title { color: #fff; text-align: left; margin-bottom: 20px; }
.about-text { font-family: 'DM Sans', sans-serif; font-size: 1rem; color: #b7e4c7; line-height: 1.85; font-weight: 300; margin-bottom: 16px; }
.about-stats { display: flex; gap: 36px; margin-top: 40px; }
.stat-num { font-family: 'Syne', sans-serif; font-size: 2.8rem; font-weight: 800; color: #f4a261; }
.stat-label { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: #95d5b2; margin-top: 4px; }
.about-tags { display: flex; flex-direction: column; gap: 14px; }
.about-tag { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 16px 20px; font-family: 'DM Sans', sans-serif; color: #d8f3dc; font-size: 0.95rem; display: flex; align-items: center; gap: 12px; transition: background 0.2s; }
.about-tag:hover { background: rgba(255,255,255,0.12); }
.test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; max-width: 980px; margin: 0 auto; position: relative; z-index: 2; }
.test-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(6px); border-radius: 24px; padding: 34px 28px; border: 1.5px solid #ede8df; transition: box-shadow 0.3s; }
.test-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.07); }
.stars { color: #f4a261; font-size: 1rem; margin-bottom: 16px; letter-spacing: 3px; }
.test-text { font-family: 'DM Sans', sans-serif; font-size: 0.96rem; color: #666; line-height: 1.75; font-weight: 300; margin-bottom: 22px; font-style: italic; }
.test-name { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.82rem; letter-spacing: 1.5px; text-transform: uppercase; color: #2d6a4f; }

.form-group { margin-bottom: 20px; }
.form-label { display: block; font-family: 'DM Sans', sans-serif; font-size: 0.76rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #2d6a4f; margin-bottom: 8px; }
.form-input, .form-select, .form-textarea { width: 100%; padding: 14px 18px; border: 1.5px solid #d4edda; border-radius: 14px; font-family: 'DM Sans', sans-serif; font-size: 0.97rem; color: #2d2a1e; background: rgba(255,255,255,0.9); outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: #2d6a4f; box-shadow: 0 0 0 4px rgba(45,106,79,0.08); }
.form-select { appearance: none; cursor: pointer; }
.form-textarea { resize: vertical; min-height: 120px; }
.footer { background: #111a14; color: #4a7c5f; padding: 50px 24px 36px; }
.footer-inner { max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.footer-logo { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -1px; }
.footer-logo span { color: #f4a261; }
.footer-location { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #4a7c5f; letter-spacing: 1px; }
.footer-ig { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; padding: 10px 22px; border-radius: 30px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 1px; text-decoration: none; transition: all 0.25s; }
.footer-ig:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(220,39,67,0.3); }
.footer-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.06); }
.footer-copy { font-family: 'DM Sans', sans-serif; font-size: 0.75rem; color: #2d4a38; }
@media (max-width: 768px) {
.nav-links, .nav-ig { display: none; }
.hamburger { display: flex; }
.about-inner { grid-template-columns: 1fr; gap: 40px; }
.about .section-label, .about .section-title { text-align: center; }
.about-stats { justify-content: center; }
.nav { padding: 16px 20px; }
}
`}</style>
{/* NAV */}
<nav className={`nav ${scrolled ? "scrolled" : ""}`}>
<div className="nav-logo" onClick={() => scrollTo("hero")}>Lanai<span>Bois</span></div>
<ul className="nav-links">
{NAV_LINKS.map(l => <li key={l} onClick={() => scrollTo(l.toLowerCase())}>{l}</li>)}
</ul>
<a href="https://www.instagram.com/lanaibois?igsh=NWh3OXF2N21rMWhy" target="_blank" rel="noreferrer" className="nav-ig"> @lanaibois</a>
<div className="hamburger" onClick={() => setMenuOpen(true)}><span /><span /><span /></div>
</nav>
<ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
<span className="mobile-close" onClick={() => setMenuOpen(false)}>✕</span>
{NAV_LINKS.map(l => <li key={l} onClick={() => scrollTo(l.toLowerCase())}>{l}</li>)}
<a href="https://www.instagram.com/lanaibois?igsh=NWh3OXF2N21rMWhy" target="_blank" rel="noreferrer" className="ig-btn"> @lanaibois</a>
</ul>
{/* HERO — floating emoji particles that react to mouse */}
<section id="hero" className="hero">
<HeroCanvas />

<div className={`hero-content ${heroVisible ? "visible" : ""}`}>
<div className="hero-badge"> Mililani, Hawaii</div>
<h1 className="hero-title">Lanai<span>Bois.</span></h1>
<p className="hero-sub">Your neighborhood crew for everything clean, green, and taken care of. Two local guys who show up and get it done.</p>
<div className="hero-btns">
<button className="btn-primary" onClick={() => scrollTo("contact")}>Book a Service</button>
<button className="btn-outline" onClick={() => scrollTo("services")}>What We Do</button>
</div>
</div>
<div className="hero-scroll">
<div className="hero-scroll-dot" /><div className="hero-scroll-dot" /><div className="hero-scroll-dot" />
</div>
</section>
{/* SERVICES — animated soft color blobs */}
<section id="services" className="section" style={{ background: "#fffdf8" }}>
<WaveBackground />
<FadeIn><p className="section-label">What We Do</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">Our Services</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">Six ways we keep your home, yard, and life a little fresher — all in Mililani.</p></FadeIn>
<div className="services-grid">
{services.map((s, i) => (
<FadeIn key={s.title} delay={i * 0.07}>
<div className="service-card">
<div className="service-icon">{s.icon}</div>
<div className="service-title">{s.title}</div>
<div className="service-desc">{s.desc}</div>
</div>
</FadeIn>
))}
</div>
</section>
{/* PRICING — floating price tags */}
<section id="pricing" className="section" style={{ background: "#f4faf6" }}>
<PricingCanvas />
<FadeIn><p className="section-label">Pricing</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">Simple, Fair Prices</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">No hidden fees, no surprises. Just honest work at honest prices from two local guys.</p></FadeIn>
<div className="pricing-grid">
{pricing.map((p, i) => (
<FadeIn key={p.title} delay={i * 0.07}>
<div className="pricing-card">
<div className="pricing-left">
<div className="pricing-icon">{p.icon}</div>
<div>
<div className="pricing-title">{p.title}</div>

<div className="pricing-note">{p.note}</div>
</div>
</div>
<div className="pricing-price">{p.price}</div>
</div>
</FadeIn>
))}
</div>
<FadeIn delay={0.2}>
<div className="pricing-banner">
<div className="pricing-banner-text">
<strong> Bundle & Save</strong>
Booking multiple services? Hit us up and we'll work out a deal for you.
</div>
<button className="btn-primary" onClick={() => scrollTo("contact")} style={{ whiteSpace: "nowrap" }}>Get a Quote</button>
</div>
</FadeIn>
</section>
{/* GALLERY — subtle grid pattern */}
<section id="gallery" className="section" style={{ background: "#edf7f0" }}>
<GridBackground />
<FadeIn><p className="section-label">Our Work</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">Before & After</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">Drag the slider on each card to see the difference we make. Real photos coming soon! </p></FadeIn>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1020, margin: "0 auto", position: "relative", zIndex: 2 }}>
{galleryItems.map((item, i) => (
<FadeIn key={item.label} delay={i * 0.07}>
<BeforeAfterSlider item={item} />
</FadeIn>
))}
</div>
<FadeIn delay={0.2}><div style={{ textAlign: "center", marginTop: 40, position: "relative", zIndex: 2 }}>
<a href="https://www.instagram.com/lanaibois?igsh=NWh3OXF2N21rMWhy" target="_blank" rel="noreferrer" className="ig-btn"> Follow @lanaibois for real photos</a>
</div></FadeIn>
</section>
{/* ABOUT — twinkling stars on dark background */}
<section id="about" className="section about">
<StarsCanvas />
<div className="about-inner">
<FadeIn>
<div>
<p className="section-label">About Us</p>
<h2 className="section-title">Two local bois,<br />one mission.</h2>
<p className="about-text">We're two guys from Mililani who love their community and aren't afraid of hard work. Lanai Bois started simple — reliable, friendly help around your home at a fair price.</p>
<p className="about-text">No big company, no strangers. Just us. We show up on time, do the job right, and treat your property like our own.</p>

<div className="about-stats">
<div className="stat"><div className="stat-num">6</div><div className="stat-label">Services</div></div>
<div className="stat"><div className="stat-num">100%</div><div className="stat-label">Local</div></div>
<div className="stat"><div className="stat-num"> 5</div><div className="stat-label">Rated</div></div>
</div>
</div>
</FadeIn>
<FadeIn delay={0.15}>
<div className="about-tags">
{[" Based in Mililani"," Locally owned & operated"," Affordable, fair pricing"," Easy booking by text or form"," Satisfaction guaranteed"].map(t => (
<div key={t} className="about-tag"><span>{t.slice(0,2)}</span>{t.slice(3)}</div>
))}
</div>
</FadeIn>
</div>
</section>
{/* REVIEWS — floating gold stars */}
<section id="testimonials" className="section" style={{ background: "#fffdf8" }}>
<ReviewStarsCanvas />
<FadeIn><p className="section-label">Reviews</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">What Neighbors Say</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">Had a great experience? Leave us a review — it means the world to a small local business. </p></FadeIn>
<FadeIn delay={0.2}>
<div style={{ maxWidth: 560, margin: "0 auto 56px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", borderRadius: 24, padding: "36px 32px", border: "1.5px solid #d4edda", position: "relative", zIndex: 2 }}>
<h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", color: "#1b4332", marginBottom: 20 }}>Leave a Review</h3>
<div className="form-group">
<label className="form-label">Your Rating</label>
<div style={{ display: "flex", gap: 8, marginTop: 4 }}>
{[1,2,3,4,5].map(n => (
<span key={n} onClick={() => setReviewForm({ ...reviewForm, stars: n })}
style={{ fontSize: "1.8rem", cursor: "pointer", transition: "transform 0.15s", transform: reviewForm.stars >= n ? "scale(1.2)" : "scale(1)", opacity: reviewForm.stars >= n ? 1 : 0.3, color: "#f4a261" }}>★</span>
))}
</div>
</div>
<div className="form-group">
<label className="form-label">Your Name</label>
<input className="form-input" placeholder="e.g. Kaimana S." value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} />
</div>
<div className="form-group">
<label className="form-label">Your Review</label>
<textarea className="form-textarea" placeholder="Tell others about your experience with Lanai Bois..." value={reviewForm.text} onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })} style={{ minHeight: 90 }} />
</div>
{reviewSubmitted ? (
<div style={{ background: "#d8f3dc", borderRadius: 12, padding: "12px 20px", fontFamily: "'DM Sans', sans-serif", color: "#1b4332", fontWeight: 700, textAlign: "center" }}>Mahalo for your review! </div>
) : (
<button className="btn-primary" style={{ width: "100%", padding: "15px", fontSize: "0.95rem" }} onClick={handleReviewSubmit}>Submit Review </button>

)}
</div>
</FadeIn>
{reviews.length === 0 ? (
<FadeIn delay={0.25}>
<div style={{ textAlign: "center", padding: "40px 24px", color: "#aaa", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", position: "relative", zIndex: 2 }}>
<div style={{ fontSize: "3rem", marginBottom: 12 }}> </div>
No reviews yet — be the first to leave one!
</div>
</FadeIn>
) : (
<div className="test-grid">
{reviews.map((r, i) => (
<FadeIn key={i} delay={i * 0.07}>
<div className="test-card">
<div className="stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
<p className="test-text">"{r.text}"</p>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div className="test-name">— {r.name}</div>
{r.date && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#bbb" }}>{r.date}</div>}
</div>
</div>
</FadeIn>
))}
</div>
)}
</section>
{/* FAQ — falling leaves */}
<section id="faq" className="section" style={{ background: "#f4faf6" }}>
<LeavesCanvas />
<FadeIn><p className="section-label">FAQ</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">Got Questions?</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">Here are the answers to the most common questions we get. Still have one? Hit us up on Instagram!</p></FadeIn>
<FadeIn delay={0.2}>
<div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
{faqs.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
</div>
</FadeIn>
</section>
{/* CONTACT — rising bubbles */}
<section id="contact" className="section" style={{ background: "#fff" }}>
<BubblesCanvas />
<FadeIn><p className="section-label">Get in Touch</p></FadeIn>
<FadeIn delay={0.1}><h2 className="section-title">Book a Service</h2></FadeIn>
<FadeIn delay={0.15}><p className="section-sub">Fill out our booking form and we'll reach out within 24 hours to confirm. Fast, easy, free.</p></FadeIn>

<FadeIn delay={0.2}>
<div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
<div style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderRadius: 24, padding: "48px 32px", border: "1.5px solid #d4edda", marginBottom: 20 }}>
<div style={{ fontSize: "3.5rem", marginBottom: 16 }}> </div>
<h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", color: "#1b4332", marginBottom: 10 }}>Ready to Book?</h3>
<p style={{ fontFamily: "'DM Sans', sans-serif", color: "#777", fontSize: "0.97rem", marginBottom: 32, lineHeight: 1.7 }}>
Tap the button below to open our booking form. Tell us your name, what service you need, and your details — we'll take it from there.
</p>
<a href="https://forms.gle/E7rVn8kD7zVGBPk48" target="_blank" rel="noreferrer" className="btn-primary"
style={{ display: "inline-block", textDecoration: "none", fontSize: "1rem", padding: "17px 40px" }}>
Open Booking Form
</a>
</div>
<p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#aaa" }}>
Prefer to reach us directly? DM us on Instagram <a href="https://www.instagram.com/lanaibois?igsh=NWh3OXF2N21rMWhy" target="_blank" rel="noreferrer" style={{ color: "#2d6a4f", fontWeight: 700 }}>@lanaibois</a>
</p>
</div>
</FadeIn>
</section>
{/* FOOTER */}
<footer className="footer">
<div className="footer-inner">
<div className="footer-logo">Lanai<span>Bois</span></div>
<div className="footer-location"> Mililani, Hawaii</div>
<a href="https://www.instagram.com/lanaibois?igsh=NWh3OXF2N21rMWhy" target="_blank" rel="noreferrer" className="footer-ig"> Follow us @lanaibois</a>
<div className="footer-divider" />
<div className="footer-copy">© 2026 Lanai Bois. All rights reserved.</div>
</div>
</footer>
</div>
);
}
