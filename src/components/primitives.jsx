import { useRef, useEffect, useState } from "react";
import { useInView, useScroll, useTransform, motion } from "framer-motion";

export function Reveal({ children, delay = 0, y = 28, once = true, as = "div", className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ children, gap = 0.12, delay = 0, once = true, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, y = 26, className, as = "div", style }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

export function Parallax({ children, speed = 0.3, className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, className, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const y = direction === "up" ? "110%" : direction === "down" ? "-110%" : "110%";
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return;
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = o; };
  }, [locked]);
}
