import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Food Menu", path: "/menu" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reviews", path: "/reviews" },
  { name: "Career", path: "/career" },
  { name: "Contact Us", path: "/contact" },
];

const branches = [
  {
    name: "Bagepalli",
    phone: "+91 9164117733",
    tel: "tel:+919164117733",
    mapsUrl: null,
  },
  {
    name: "Chikkaballapura",
    phone: "+91 8951454455",
    tel: "tel:+918951454455",
    mapsUrl: "https://maps.app.goo.gl/nZhwxaGPvhtRrkhKA?g_st=iw",
  },
];

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
          isScrolled
            ? "bg-[#080808]/85 backdrop-blur-lg border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        {/* 3-column flex: hamburger | logo | spacer */}
        <div className="max-w-7xl mx-auto flex items-center">

          {/* LEFT — hamburger */}
          <div className="flex items-center" style={{ width: "48px" }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-[5px] focus:outline-none group"
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-[2px] bg-white group-hover:bg-primary transition-colors block origin-center"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25 }}
                className="w-7 h-[2px] bg-white group-hover:bg-primary transition-colors block"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-[2px] bg-white group-hover:bg-primary transition-colors block origin-center"
              />
            </button>
          </div>

          {/* CENTER — logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="relative z-50 flex items-center" aria-label="Samara's Veg — Home">
              <img
                src={LOGO_SRC}
                alt="Samara's Veg"
                className="h-[35px] md:h-[50px] w-auto object-contain"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* RIGHT — empty spacer to balance layout */}
          <div style={{ width: "48px" }} />
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 3% 3%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 3% 3%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 3% 3%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.97)] backdrop-blur-2xl flex flex-col"
          >
            {/* Ambient orb */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Overlay header — logo centered (mirrors main header) */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="relative z-10 px-6 lg:px-12 flex items-center"
              style={{ paddingTop: isScrolled ? "0.75rem" : "1.25rem", paddingBottom: isScrolled ? "0.75rem" : "1.25rem" }}
            >
              <div style={{ width: "48px" }} />
              <div className="flex-1 flex justify-center">
                <img
                  src={LOGO_SRC}
                  alt="Samara's Veg"
                  className="h-[35px] md:h-[50px] w-auto object-contain opacity-80"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div style={{ width: "48px" }} />
            </motion.div>

            {/* Nav + contact grid */}
            <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full relative z-10">

                {/* Nav links */}
                <nav className="flex flex-col justify-center w-full">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: "easeOut" }}
                        className="border-b border-white/10 py-3 last:border-b-0"
                      >
                        <Link to={link.path} className="group relative inline-block overflow-hidden">
                          <span
                            className={cn(
                              "text-[24px] md:text-[32px] lg:text-[44px] font-display font-bold block transition-colors duration-300 leading-tight",
                              isActive ? "text-primary" : "text-white/40 group-hover:text-primary"
                            )}
                          >
                            {link.name}
                          </span>
                          <motion.div
                            className="absolute bottom-0 left-0 w-full h-[3px] bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Branch contact panel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="hidden md:flex flex-col justify-end pb-12"
                >
                  <div className="space-y-7">
                    {branches.map((branch, i) => (
                      <div key={i}>
                        <h3 className="text-white font-bold mb-3 uppercase tracking-[0.2em] text-xs">
                          {branch.name} Branch
                        </h3>
                        <a
                          href={branch.tel}
                          className="flex items-center gap-2.5 text-primary text-xl font-light hover:text-white transition-colors duration-300 mb-2 group"
                        >
                          <FaPhoneAlt className="text-primary/60 text-sm shrink-0 group-hover:text-primary transition-colors" />
                          {branch.phone}
                        </a>
                        {i < branches.length - 1 && (
                          <div className="mt-6 h-[1px] w-full bg-white/10" />
                        )}
                      </div>
                    ))}
                    <div>
                      <h3 className="text-white font-bold mb-2 uppercase tracking-[0.2em] text-xs">Hours</h3>
                      <p className="text-white/50 text-base font-light">Mon–Fri: 11am – 10pm</p>
                      <p className="text-white/50 text-base font-light">Sat–Sun: 10am – 11pm</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
