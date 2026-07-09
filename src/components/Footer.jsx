import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal, Stagger, StaggerItem } from "./primitives";

const MARQUEE = "NOCTIS — A House of Perfume — ";
const COLS = [
  { h: "Maison", items: ["Philosophy", "The perfumers", "Press", "Stockists"] },
  { h: "Fragrances", items: ["Embrun", "Salinière", "Veille", "Lampe", "Onde", "Cendre"] },
  { h: "Contact", items: ["Atelier — 18 Quai de Bercy", "Paris, 75012", "archive@noctis.paris", "+33 1 44 00 00 00"] },
];

function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);
  const bigY = useTransform(scrollYProgress, [0, 1], ["60%", "-10%"]);
  const bigOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 1, 1]);

  return (
    <footer className="footer" ref={ref} id="footer">
      {/* Large ghost word */}
      <motion.div
        style={{ y: bigY, opacity: bigOpacity, position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", zIndex: 0 }}
      >
        <span className="display" style={{ fontSize: "clamp(8rem, 28vw, 34rem)",
          color: "rgba(244,241,234,0.04)", letterSpacing: "-0.04em",
          whiteSpace: "nowrap", overflow: "hidden" }}>
          NOCTIS
        </span>
      </motion.div>

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        {/* Marquee */}
        <motion.div className="footer__marquee" style={{ x: marqueeX }}>
          <span style={{ display: "inline-flex" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} style={{ whiteSpace: "nowrap", display: "inline-flex" }}>
                <span style={{ paddingRight: "0.2em" }}>{MARQUEE}</span>
                <span className="italic" style={{ paddingRight: "0.4em", opacity: 0.4 }}>after dark</span>
              </span>
            ))}
          </span>
        </motion.div>

        {/* Editorial closing line */}
        <div style={{ padding: "clamp(3rem, 8vh, 6rem) 0 1rem", maxWidth: "60ch" }}>
          <Stagger gap={0.12}>
            <StaggerItem>
              <span className="label">End matter</span>
            </StaggerItem>
            <StaggerItem>
              <p className="lede" style={{ marginTop: "1.2rem", maxWidth: "26ch" }}>
                We make six fragrances and no more. When one is gone from our shelves,
                it is gone until we judge the season right to compose it again.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="body-copy" style={{ marginTop: "1rem", maxWidth: "48ch" }}>
                Noctis does not sell through department stores, marketplaces,
                or third-party retailers. Our editions are refilled, not resold.
                If a fragrance is of interest, write to the atelier; we will write back.
              </p>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Link columns */}
        <div className="footer__grid">
          <div className="footer__col">
            <Reveal>
              <h5>Maison</h5>
              <div className="display display--sm" style={{ marginTop: "0.4rem" }}>
                Noctis<span className="italic">.</span>
              </div>
              <p className="body-copy body-copy--narrow" style={{ marginTop: "1rem" }}>
                A small house composing fragrance after dark, in a printworks above the Seine.
              </p>
            </Reveal>
          </div>
          {COLS.slice(1).map((c) => (
            <div className="footer__col" key={c.h}>
              <Reveal><h5>{c.h}</h5></Reveal>
              <Reveal delay={0.08}>
                <ul>
                  {c.items.map((i) => <li key={i}><a href="#top">{i}</a></li>)}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Base bar */}
        <div className="footer__base">
          <span>© MMXXV Noctis Paris — All rights reserved</span>
          <span>Composed in Grasse · Bottled in Paris</span>
          <span>Fraîcheur — an olfactory biography</span>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
