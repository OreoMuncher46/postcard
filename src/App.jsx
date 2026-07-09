import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { GRAIN_URL } from "./grain";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Notes } from "./components/Notes";
import { Craft } from "./components/Craft";
import { Film } from "./components/Film";
import { Footer } from "./components/Footer";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    document.documentElement.style.setProperty("--grain-url", GRAIN_URL);
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 1,
          background: "var(--bone)", transformOrigin: "left",
          scaleX, zIndex: 10001, opacity: 0.6,
        }}
      />

      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Notes />
        <Craft />
        <Film />
      </main>
      <Footer />
    </>
  );
}

export default App;
