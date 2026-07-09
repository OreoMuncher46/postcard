import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Stagger, StaggerItem } from "./primitives";

const HERO_IMG =
  "https://images.unsplash.com/photo-1503423203428-2d6d8e0ec03d?q=80&w=2400&auto=format&fit=crop";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__bg" style={{ y, scale }}>
        <img src={HERO_IMG} alt="" loading="eager" />
      </motion.div>

      <motion.div
        className="hero__title"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <Stagger gap={0.14}>
          <StaggerItem>
            <span className="label" style={{ display: "block", marginBottom: "2.2rem" }}>
              A House of Perfume — Est. Paris
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="display display--xl">
              N<span className="italic">o</span>ctis
            </h1>
          </StaggerItem>
        </Stagger>
      </motion.div>

      <div className="hero__meta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mono"
          style={{ maxWidth: "18ch" }}
        >
          Fragrance composed after dark.<br />Six chapters of scent.
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono">Scroll</span>
          <motion.span
            style={{ display: "block", width: 1, height: 38, background: "var(--hair-strong)", originY: 0 }}
            animate={{ scaleY: [0.25, 1, 0.25] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, times: [0, 0.5, 1] }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mono"
          style={{ textAlign: "right", maxWidth: "22ch" }}
        >
          N° 01 — 06<br />An olfactory biography
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
