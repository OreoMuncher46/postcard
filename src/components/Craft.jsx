import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal, Stagger, StaggerItem, Parallax } from "./primitives";

const CRAFT_IMGS = [
  "/images/materials.png",
  "/images/glass-vessels.png",
  "/images/hand-working.jpeg",
  "/images/finished-flacon.jpeg",
];

const STEPS = [
  { k: "01", t: "Triage", d: "Raw materials are graded by hand. A single harvest may yield only enough for one formula." },
  { k: "02", t: "Maceration", d: "Compounds rest in dark glass for a minimum of forty nights before evaluation." },
  { k: "03", t: "Édition", d: "Each fragrance is produced in numbered batches. We do not restock; we refill." },
  { k: "04", t: "Silence", d: "Before release, the formula sits untouched for a full season. If it survives our memory, it ships." },
];

function Craft() {
  const galleryRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: galleryRef, offset: ["start end", "end start"] });
  const cap = useTransform(scrollYProgress, [0, 1], ["bottom", "top"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section section--pad" id="craft" ref={galleryRef}>
      <span className="section-num">§ 03 — Craftsmanship</span>

      {/* Intro */}
      <div className="split--offset split" style={{ paddingBottom: "clamp(4rem, 10vh, 8rem)" }}>
        <div>
          <Reveal><span className="label">The House Method</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="display display--md" style={{ marginTop: "1.4rem", maxWidth: "13ch" }}>
              Made slowly,<br /><span className="italic">by almost no one.</span>
            </h2>
          </Reveal>
        </div>
        <div>
          <Reveal delay={0.1}>
            <p className="body-copy body-copy--wide" style={{ maxWidth: "52ch" }}>
              Noctis is the work of four perfumers and one apprentice,
              working in a printworks above the Seine. We weigh our own materials,
              bottle by hand, and refuse outside investment. Every step is unfashionable on purpose,
              because fragrance is not a product category. It is a record of attention.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "1.8rem" }}>
              <div className="mono">4 perfumers</div>
              <div className="mono">1 apprentice</div>
              <div className="mono">40 nights rest</div>
              <div className="mono">Numbered editions</div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Editorial gallery — art-directed asymmetric, with parallax */}
      <div className="craft__gallery" style={{ marginBottom: "clamp(4rem, 10vh, 8rem)" }}>
        <div className="img-mask craft__cell craft__c1">
          <Parallax speed={0.18} style={{ height: "100%" }}>
            <img src={CRAFT_IMGS[0]} alt="Materials arranged on a low bench" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Parallax>
        </div>
        <div className="img-mask craft__cell craft__c2 img--noir">
          <Parallax speed={-0.12} style={{ height: "100%" }}>
            <img src={CRAFT_IMGS[1]} alt="Glass vessels at rest" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Parallax>
        </div>
        <div className="img-mask craft__cell craft__c3">
          <Parallax speed={0.22} style={{ height: "100%" }}>
            <img src={CRAFT_IMGS[2]} alt="Hand working at a low table" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Parallax>
        </div>
        <div className="img-mask craft__cell craft__c4 img--subdued">
          <Parallax speed={-0.16} style={{ height: "100%" }}>
            <img src={CRAFT_IMGS[3]} alt="Finished flacon in low light" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Parallax>
        </div>
      </div>

      {/* Process steps — editorial numbered list */}
      <div className="split">
        <div>
          <Reveal><span className="label">Four operations</span></Reveal>
          <Reveal delay={0.06}>
            <p className="lede" style={{ marginTop: "1.4rem", fontSize: "2rem", maxWidth: "14ch" }}>
              Each fragrance passes through <span className="italic">four</span> quiet operations.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mono" style={{ marginTop: "1.4rem", opacity: 0.6 }}>
              None of them can be rushed. None of them repeat.
            </div>
          </Reveal>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Stagger gap={0.12}>
            {STEPS.map((s) => (
              <StaggerItem key={s.k} className="" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", padding: "1.8rem 0", borderTop: "1px solid var(--hair)" }}>
                <span className="display" style={{ fontSize: "1.4rem", color: "var(--ash)", alignSelf: "start" }}>{s.k}</span>
                <div>
                  <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.t}</h3>
                  <p className="body-copy" style={{ maxWidth: "36ch" }}>{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <motion.div
            style={{ height: 1, background: "var(--bone)", alignSelf: "flex-start", width: progress, margin: "1rem 0 0" }}
          />
        </div>
      </div>
    </section>
  );
}

export { Craft };
