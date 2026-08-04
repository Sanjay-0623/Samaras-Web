import { FaWhatsapp, FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { Phone } from "lucide-react";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ─── BRANCH DATA ─────────────────────────────────────────── */
const waBranches = [
  { name: "Bagepalli",       phone: "+91 9164117733", url: "https://wa.me/919164117733" },
  { name: "Chikkaballapura", phone: "+91 8951454455", url: "https://wa.me/918951454455" },
];

const callBranches = [
  { name: "Bagepalli",       phone: "+91 9164117733", url: "tel:+919164117733" },
  { name: "Chikkaballapura", phone: "+91 8951454455", url: "tel:+918951454455" },
];

const emailBranches = [
  {
    name: "Bagepalli",
    email: "Bagepalli@samarasveg.com",
    url: "mailto:Bagepalli@samarasveg.com?subject=Inquiry%20-%20Samara's%20Veg%20Bagepalli",
  },
  {
    name: "Chikkaballapura",
    email: "Samarasvegcbpur@gmail.com",
    url: "mailto:Samarasvegcbpur@gmail.com?subject=Inquiry%20-%20Samara's%20Veg%20Chikkaballapura",
  },
];

/* ─── SPEED-DIAL ACTIONS ──────────────────────────────────── */
const speedDial = [
  { id: "call",      label: "Call Us",   Icon: Phone,        color: "bg-[#2563EB]", href: null },
  { id: "facebook",  label: "Facebook",  Icon: FaFacebookF,  color: "bg-[#1877F2]", href: "https://www.facebook.com/share/18AnVPJqBA/" },
  { id: "instagram", label: "Instagram", Icon: FaInstagram,  color: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]", href: "https://www.instagram.com/samarasveg?igsh=NHNhcjRnd29obzFh" },
  { id: "email",     label: "Email",     Icon: FaEnvelope,   color: "bg-primary",   href: null },
  { id: "whatsapp",  label: "WhatsApp",  Icon: FaWhatsapp,   color: "bg-[#25D366]", href: null },
];

/* ─── EMAIL BRANCH POPUP (inline, unchanged) ──────────────── */
interface BranchPopupProps {
  onClose: () => void;
}

function EmailBranchPopup({ onClose }: BranchPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.94 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="w-72 rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary/15 rounded-full flex items-center justify-center">
            <FaEnvelope className="text-primary" size={15} />
          </div>
          <p className="text-white font-semibold text-sm">Email a Branch</p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <MdClose size={15} />
        </button>
      </div>

      <div className="p-3 space-y-1.5">
        {emailBranches.map((branch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.28 }}
          >
            <a
              href={branch.url}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-transparent hover:bg-primary/10 hover:border-primary/25 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-primary/15 group-hover:bg-primary/25 rounded-full flex items-center justify-center shrink-0 transition-colors">
                <FaEnvelope className="text-primary" size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white/85 group-hover:text-white text-sm font-medium transition-colors leading-tight">
                  {branch.name}
                </span>
                <span className="text-white/35 text-[11px] group-hover:text-primary/70 transition-colors mt-0.5 truncate">
                  {branch.email}
                </span>
              </div>
              <span className="ml-auto text-white/25 group-hover:text-white/60 transition-colors text-xs shrink-0">→</span>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pb-4 pt-1">
        <p className="text-white/25 text-[11px] text-center">We'll respond within 24 hours</p>
      </div>
    </motion.div>
  );
}

/* ─── WHATSAPP CENTERED MODAL ─────────────────────────────── */
interface WaModalProps {
  onClose: () => void;
}

function WaBranchModal({ onClose }: WaModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal card */}
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

        {/* Footer */}
        <div className="px-6 pb-5 pt-1">
          <p className="text-white/25 text-[11px] text-center">We typically reply within minutes</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CALL CENTERED MODAL ──────────────────────────────────── */
function CallBranchModal({ onClose }: { onClose: () => void }) {
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2563EB]/15 rounded-full flex items-center justify-center">
              <Phone className="text-[#2563EB]" size={16} />
            </div>
            <div>
              <p className="text-white font-semibold text-base leading-tight">Select a Branch</p>
              <p className="text-white/35 text-[11px] mt-0.5">Tap to call us directly</p>
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

        <div className="p-4 space-y-2">
          {callBranches.map((branch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.28 }}
            >
              <a
                href={branch.url}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/6 hover:bg-[#2563EB]/8 hover:border-[#2563EB]/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#2563EB]/12 group-hover:bg-[#2563EB]/22 rounded-full flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="text-[#2563EB]" size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white/90 group-hover:text-white text-sm font-semibold transition-colors leading-tight">
                    {branch.name}
                  </span>
                  <span className="text-white/40 text-xs group-hover:text-[#2563EB]/80 transition-colors mt-0.5">
                    {branch.phone}
                  </span>
                </div>
                <span className="ml-auto text-white/20 group-hover:text-[#2563EB]/70 transition-colors text-sm shrink-0">→</span>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="px-6 pb-5 pt-1">
          <p className="text-white/25 text-[11px] text-center">Available during restaurant hours</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN WIDGET ─────────────────────────────────────────── */
export default function WhatsAppButton() {
  const [emailPopup, setEmailPopup] = useState(false);
  const [waModal, setWaModal]       = useState(false);
  const [callModal, setCallModal]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEmailPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDialClick = (item: typeof speedDial[0]) => {
    if (item.id === "whatsapp") {
      setWaModal(true);
    } else if (item.id === "call") {
      setCallModal(true);
    } else if (item.id === "email") {
      setEmailPopup((prev) => !prev);
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Centered WhatsApp modal */}
      <AnimatePresence>
        {waModal && <WaBranchModal onClose={() => setWaModal(false)} />}
      </AnimatePresence>

      {/* Centered Call modal */}
      <AnimatePresence>
        {callModal && <CallBranchModal onClose={() => setCallModal(false)} />}
      </AnimatePresence>

      {/* Floating contact buttons */}
      <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Email inline popup */}
        <AnimatePresence>
          {emailPopup && (
            <div className="mb-1">
              <EmailBranchPopup onClose={() => setEmailPopup(false)} />
            </div>
          )}
        </AnimatePresence>

        {/* Always-visible contact buttons */}
        <div className="flex flex-col items-end gap-2.5">
          {speedDial.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDialClick(item)}
              className={`w-11 h-11 ${item.color} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200`}
              aria-label={item.label}
            >
              <item.Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
