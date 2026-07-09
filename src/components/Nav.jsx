import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = ["Philosophy", "Notes", "Craft", "Film"];

function Nav() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (y > last + 4 && y > 140) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.nav
      className="nav"
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav__brand">NOCTIS</div>
      <div className="nav__links">
        {links.map((l, i) => (
          <a key={l} href={"#" + l.toLowerCase()} style={{ '--i': i }}>
            <span>{l}</span>
          </a>
        ))}
      </div>
      <div className="nav__meta">
        Paris · MMXXV
      </div>
    </motion.nav>
  );
}

export { Nav };
