import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BsFlower1 } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

/* ─── BRANCH DATA ─────────────────────────────────────────── */
const waBranches = [
  { name: "Bagepalli",       phone: "+91 9164117733", url: "https://wa.me/919164117733" },
  { name: "Chikkaballapura", phone: "+91 8951454455", url: "https://wa.me/918951454455" },
];

/* ─── WHATSAPP BRANCH MODAL ───────────────────────────────── */
function FooterWaModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#111]/98 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#25D366]/15 rounded-full flex items-center justify-center">
              <FaWhatsapp className="text-[#25D366]" size={17} />
            </div>
            <div>
              <p className="text-white font-semibold text-base leading-tight">Select a Branch</p>
              <p className="text-white/35 text-[11px] mt-0.5">Chat with us on WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/14 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <MdClose size={16} />
          </button>
        </div>

        {/* Branch options */}
        <div className="p-4 space-y-2">
          {waBranches.map((branch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.28 }}
            >
              <a
                href={branch.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/6 hover:bg-[#25D366]/8 hover:border-[#25D366]/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#25D366]/12 group-hover:bg-[#25D366]/22 rounded-full flex items-center justify-center shrink-0 transition-colors">
                  <FaWhatsapp className="text-[#25D366]" size={17} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white/90 group-hover:text-white text-sm font-semibold transition-colors leading-tight">
                    {branch.name}
                  </span>
                  <span className="text-white/40 text-xs group-hover:text-[#25D366]/80 transition-colors mt-0.5">
                    {branch.phone}
                  </span>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-[#25D366]/70 transition-colors text-sm shrink-0">→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="px-6 pb-5 pt-1">
          <p className="text-white/25 text-[11px] text-center">We typically reply within minutes</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [waModal, setWaModal]     = useState(false);

  return (
    <>
      <AnimatePresence>
        {waModal && <FooterWaModal onClose={() => setWaModal(false)} />}
      </AnimatePresence>

    <footer className="bg-[#080808] pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-5 group w-fit">
            {!logoError ? (
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Samara's Veg"
                className="h-10 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <BsFlower1 className="text-primary text-xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-display font-bold text-white tracking-wider">SAMARA'S VEG</span>
              </div>
            )}
          </Link>
          <p className="text-white/50 max-w-sm mb-6 italic font-light text-sm">
            "Where every meal becomes a memory."
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setWaModal(true)}
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaWhatsapp size={16} />
            </button>
            <a
              href="https://www.instagram.com/samarasveg?igsh=NHNhcjRnd29obzFh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/18AnVPJqBA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 ease-out"
            >
              <FaFacebookF size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {[
              { label: "Home", to: "/" },
              { label: "Menu", to: "/menu" },
              { label: "Services", to: "/services" },
              { label: "Reviews", to: "/reviews" },
              { label: "Contact Us", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 duration-300 font-light text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Opening Hours</h3>
          <ul className="space-y-4 text-white/50 font-light text-sm">
            <li className="flex justify-between items-center gap-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                Mon – Fri:
              </span>
              <span className="text-white">11am – 10pm</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="pl-4">Saturday:</span>
              <span className="text-white">10am – 11pm</span>
            </li>
            <li className="flex justify-between gap-2">
              <span className="pl-4">Sunday:</span>
              <span className="text-white">10am – 9pm</span>
            </li>
          </ul>
        </div>

        {/* Branch Contact */}
        <div>
          <h3 className="text-base font-display font-bold text-white mb-6">Contact</h3>
          <div className="space-y-5">

            {/* Bagepalli */}
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Bagepalli</p>
              <a href="tel:+919164117733" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light mb-1.5 group">
                <FaPhoneAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                +91 9164117733
              </a>
              <a
                href="https://maps.app.goo.gl/yH5BbVWAhXPif5Vk7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light group"
              >
                <FaMapMarkerAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                Toll plaza, HYD - BLR NH 44, Bagepalli, Karnataka 561207
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/8" />

            {/* Chikkaballapura */}
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Chikkaballapura</p>
              <a href="tel:+918951454455" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light mb-1.5 group">
                <FaPhoneAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                +91 8951454455
              </a>
              <a
                href="https://maps.app.goo.gl/gtABD36duSbhTRT28?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300 text-sm font-light group"
              >
                <FaMapMarkerAlt className="text-primary/60 text-xs shrink-0 group-hover:text-primary transition-colors" />
                Samara's Veg, Chikkaballapur, Karnataka 562101
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-sm text-white/40 font-light">
          © {new Date().getFullYear()} Samara's Veg Restaurant. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
    </>
  );
}
