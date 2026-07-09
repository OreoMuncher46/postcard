import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal } from "./primitives";

const NOTES = [
  {
    n: "01",
    name: "Embrun",
    subtitle: "Twilight on linen",
    img: "https://images.unsplash.com/photo-1592945403244-b3e5ca44c770?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Bergamot, cold peel", "Iris root, white tea", "Vetiver, damp cedar"],
    body: "The first coolness after a long day. Embrun opens like a window thrown wide into September air — citrus thinning into something powdery, mineral, almost absent. It is the scent of getting dressed to leave a place you love.",
    meta: "Citrus · Iris · Wood",
  },
  {
    n: "02",
    name: "Salinière",
    subtitle: "Salt, ash, and thread",
    img: "https://images.unsplash.com/photo-1534982380284-84a63934277e?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Sea salt, pink pepper", "Ambrette, dried lavender", "Smoked amber, driftwood"],
    body: "Drawn from a coastline that forgets the season. Salinière is a briny, animalic fragrance: salt caught in animal musk, charred wood carried on a cold wind. It sits close to the skin and refuses to perform.",
    meta: "Marine · Musky · Smoky",
  },
  {
    n: "03",
    name: "Veille",
    subtitle: "A candle kept lit",
    img: "https://images.unsplash.com/photo-1603006905003-be475563d59b?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Beeswax, almond milk", "Tonka, immortelle", "Cashmeran, soft suede"],
    body: "Veille means the vigil — the hours one stays awake, watching. Warm wax, a low table, a cushion dented from sitting. A fragrance built around beeswax and tonka, rounded and low, as if lit from within.",
    meta: "Gourmand · Resinous · Warm",
  },
  {
    n: "04",
    name: "Lampe",
    subtitle: "Pressed glass, burnt oil",
    img: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Neroli, bitter almond", "Tuberose, hay", "Labdanum, black leather"],
    body: "Not flowers, but the memory of them. Tuberose pressed into leather and dried hay; neroli turned slightly bitter by almond. Lampe smells like an empty room the morning after a long dinner.",
    meta: "Floral · Leathery · Bitter",
  },
  {
    n: "05",
    name: "Onde",
    subtitle: "The hush before rain",
    img: "https://images.unsplash.com/photo-1519682574022-8a8d7f5e3d5d?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Green cardamom, wet stone", "Galbanum, violet leaf", "Oakmoss, cold incense"],
    body: "The electric green of a field before a storm. Onde is sharp and mineral, all topnote and shadow. It fades the way weather fades: completely, and without apology.",
    meta: "Green · Mineral · Chypre",
  },
  {
    n: "06",
    name: "Cendre",
    subtitle: "What remains",
    img: "https://images.unsplash.com/photo-1574169208507-8337647473b1?q=80&w=1600&auto=format&fit=crop",
    pyramid: ["Birch tar, dried tobacco", "Vanilla absolute, myrrh", "Sandalwood, grey musk"],
    body: "The last of the six. Cendre means ash. A fragrance of quiet combustion — birch tar and dried tobacco, vanilla made grey, myrrh risen from a cold censer. It is what the room still holds after everyone has left.",
    meta: "Smoky · Balsamic · Deep",
  },
];

function Notes() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Desktop: shift stage horizontally driven by scroll
  const x = useTransform(scrollYProgress, [0, 1], ["3%", `-${(NOTES.length - 1) * 100 - 3}%`]);
  const counter = useTransform(scrollYProgress, [0, 1], [1, NOTES.length]);
  const counterText = useTransform(counter, (v) => String(Math.min(NOTES.length, Math.floor(v) + 1)).padStart(2, "0"));

  return (
    <>
      {/* Mobile: vertical stack */}
      <section className="section notes" id="notes" style={{ display: "none" }} data-mobile>
        <div style={{ padding: "5rem var(--pad-x) 2rem" }}>
          <Reveal><span className="label">§ 02 — Fragrance Notes</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="display display--md" style={{ marginTop: "1.4rem", maxWidth: "16ch" }}>
              Six chapters,<br /><span className="italic">written in scent.</span>
            </h2>
          </Reveal>
        </div>
        {NOTES.map((n) => (
          <div key={n.n} className="notes__slide" style={{ position: "relative", borderBottom: "1px solid var(--hair)" }}>
            <div className="notes__copy">
              <span className="mono">{n.n} / 06 · {n.meta}</span>
              <h3 className="display display--lg" style={{ marginTop: "1rem" }}>{n.name}</h3>
              <p className="lede" style={{ fontSize: "1.4rem", margin: "0.8rem 0 1.4rem", maxWidth: "none" }}>{n.subtitle}</p>
              <p className="body-copy" style={{ maxWidth: "none" }}>{n.body}</p>
              <div style={{ marginTop: "1.6rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {n.pyramid.map((p, i) => (
                  <span key={i} className="mono" style={{ opacity: 0.6 - i * 0.12 }}>
                    {["Top", "Heart", "Base"][i]} — {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="notes__visual">
              <div className="img-mask img-tall img--noir">
                <img src={n.img} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Desktop: pinned horizontal reveal */}
      <section className="section notes pinned" id="notes-desktop" ref={ref} style={{ height: `${NOTES.length * 90}vh` }}>
        <div className="notes__pin">
          <motion.div className="notes__counter" style={{ x: "-2vw" }}>
            <motion.span>{counterText}</motion.span>
            <span>of 06</span>
          </motion.div>

          <motion.div className="notes__stage" style={{ x, display: "flex", width: `${NOTES.length * 100}%` }}>
            {NOTES.map((n, i) => (
              <div key={n.n} className="notes__slide" style={{ width: `${100 / NOTES.length}%`, flexShrink: 0 }}>
                <div className="notes__copy">
                  <span className="mono">N° {n.n} · {n.meta}</span>
                  <h3 className="display display--lg" style={{ marginTop: "1rem" }}>{n.name}</h3>
                  <p className="lede" style={{ fontSize: "1.3rem", margin: "0.7rem 0 1.2rem" }}>{n.subtitle}</p>
                  <p className="body-copy">{n.body}</p>
                  <div style={{ marginTop: "1.6rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    {n.pyramid.map((p, j) => (
                      <span key={j} className="mono" style={{ opacity: 0.65 - j * 0.15,
                        display: "flex", gap: "1rem" }}>
                        <span style={{ width: "4rem", flex: "none" }}>{["Top", "Heart", "Base"][j]}</span>
                        <span style={{ color: "var(--smoke)" }}>{p}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="notes__visual">
                  <div className="img-mask img-tall img--noir">
                    <img src={n.img} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 767px) {
          #notes[data-mobile] { display: block !important; }
          #notes-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          #notes-desktop { display: block; }
        }
      `}</style>
    </>
  );
}

export { Notes };
