import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal, Stagger, StaggerItem, MaskReveal } from "./primitives";

const PHIL_IMG =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop";

function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [1, 1, 1, 0.4]);

  return (
    <section className="section section--pad" id="philosophy" ref={ref}>
      <span className="section-num">§ 01 — Philosophy</span>

      <div className="split" style={{ minHeight: "220vh" }}>
        {/* sticky visual panel */}
        <div className="phil__panel">
          <motion.div style={{ opacity: fade, width: "100%" }}>
            <div className="img-mask img-tall img--subdued" style={{ maxWidth: 560, margin: "0 auto" }}>
              <motion.img src={PHIL_IMG} alt="" style={{ y, scale: 1.12 }} loading="lazy" />
            </div>
            <div className="mono" style={{ marginTop: "1.6rem", textAlign: "center" }}>
              No. 01 — On beginning in darkness
            </div>
          </motion.div>
        </div>

        {/* scrolling text column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10rem", paddingTop: "8vh" }}>
          <Reveal>
            <span className="label">Manifesto</span>
            <span className="rule" style={{ margin: "1.4rem 0" }} />
          </Reveal>

          <Stagger gap={0.16} delay={0.05}>
            <StaggerItem>
              <p className="phil__quote">
                We compose only <span className="ghost italic">after the light has gone.</span>
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="phil__quote" style={{ paddingLeft: "1.5em" }}>
                Night is our workshop — its patience, our method.
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1}>
            <p className="lede" style={{ maxWidth: "22ch" }}>
              A perfume is not made to be recognised.
              It is made to be <span className="italic">remembered incorrectly</span> —
              felt as weather, mistaken for a memory.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="body-copy">
              NOCTIS is a small house. Six fragrances, no more,
              built slowly over five years in a converted printworks above the Seine.
              Each formula is written by hand and kept in a single notebook,
              then abandoned for a season before it is touched again.
            </p>
            <p className="body-copy" style={{ marginTop: "1.6rem" }}>
              We do not chase trends, seasons, or celebrity.
              We pursue the condition of scent as the night pursues the day —
              quietly, and without arrival.
            </p>
          </Reveal>

          <Reveal delay={0.04}>
            <div style={{ display: "flex", gap: "2.4rem", flexWrap: "wrap", paddingTop: "2rem" }}>
              <div className="mono">Grasse · France</div>
              <div className="mono">Six formulas</div>
              <div className="mono">Refilled, never resold</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { Philosophy };
