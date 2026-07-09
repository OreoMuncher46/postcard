import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 2000;
    let active = true;
    const tick = (t) => {
      if (!active) return;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 420);
    };
    raf = requestAnimationFrame(tick);
    return () => { active = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="loader__word">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block" }}
            >
              NOCTIS
            </motion.span>
          </div>
          <div className="loader__bar">
            <motion.i
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.0, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>
          <motion.div
            className="mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {String(count).padStart(2, "0")} &middot; Composing the night
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Loader };
