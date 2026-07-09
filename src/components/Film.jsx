import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { Reveal, Stagger, StaggerItem } from "./primitives";

const FILM_IMG =
  "https://images.unsplash.com/photo-1575550979243-c5940f5a3e3c?q=80&w=2400&auto=format&fit=crop";

function Film() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.02, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Caption strip — editorial intro */}
      <section className="section section--pad-tight" style={{ background: "var(--void)" }}>
        <div className="split">
          <div>
            <Reveal><span className="label">§ 04 — Campaign Film</span></Reveal>
            <Reveal delay={0.06}>
              <h2 className="display display--md" style={{ marginTop: "1.4rem", maxWidth: "11ch" }}>
                <span className="italic">After</span> the light has gone.
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="body-copy body-copy--wide" style={{ maxWidth: "52ch" }}>
                Filmed over four nights in a disused printworks near Bercy,
                on a single handheld 16mm camera. No music, no dialogue.
                Only the house, the formulas, and the long blue hour before dawn.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <dl style={{ marginTop: "1.6rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.6rem 2rem" }}>
                <dt className="mono" style={{ opacity: 0.55 }}>Director</dt><dd className="mono">L. Vasseur</dd>
                <dt className="mono" style={{ opacity: 0.55 }}>Format</dt><dd className="mono">16mm · No sync sound</dd>
                <dt className="mono" style={{ opacity: 0.55 }}>Length</dt><dd className="mono">3 minutes 12</dd>
                <dt className="mono" style={{ opacity: 0.55 }}>Location</dt><dd className="mono">Bercy, Paris</dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The poster / player */}
      <section className="film" ref={ref} id="film">
        <motion.div className="film__poster" style={{ onClick: () => {} }} onMouseDown={() => setOpen(true)}>
          <motion.img src={FILM_IMG} alt="Still from the Noctis campaign film" style={{ y, scale }} />
          <motion.div className="film__center" style={{ onClick: () => {} }} onMouseDown={() => setOpen(true)} layout>
            <Reveal>
              <Stagger gap={0.14}>
                <StaggerItem>
                  <div className="film__play"><span/></div>
                </StaggerItem>
                <StaggerItem>
                  <span className="label">Press to view</span>
                </StaggerItem>
                <StaggerItem>
                  <h3 className="display display--sm" style={{ margin: "1.2rem 0 0.6rem" }}>
                    Le Souffle — <span className="italic">une nuit</span>
                  </h3>
                </StaggerItem>
                <StaggerItem>
                  <div className="mono" style={{ opacity: 0.6 }}>Campaign · MMXXV</div>
                </StaggerItem>
              </Stagger>
            </Reveal>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 10500, background: "rgba(2,2,2,0.96)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "min(92vw, 1100px)", aspectRatio: "16 / 9", position: "relative",
                overflow: "hidden", background: "#000" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img src={FILM_IMG} alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover",
                  filter: "grayscale(0.5) contrast(1.08) brightness(0.55)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", color: "var(--bone)" }}>
                  <div className="mono" style={{ opacity: 0.6 }}>Campaign film — placeholder</div>
                  <div className="lede" style={{ fontSize: "1.6rem", marginTop: "0.6rem" }}>
                    A quiet that doesn't need a soundtrack.
                  </div>
                </div>
              </div>
              <div className="mono" style={{ position: "absolute", top: "1.4rem", right: "1.6rem",
                color: "var(--bone)", opacity: 0.7 }}>Close ✕</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Film };
