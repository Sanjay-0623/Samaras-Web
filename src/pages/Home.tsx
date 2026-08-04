import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaLeaf,
  FaSeedling,
  FaFire,
  FaUtensils,
  FaCalendarCheck,
  FaConciergeBell,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { PiForkKnife } from "react-icons/pi";
import intlTelInput from "intl-tel-input/intlTelInputWithUtils";
import "intl-tel-input/styles";
import PageTransition from "@/components/PageTransition";

/* ─── STATIC DATA ────────────────────────────────────────── */
const specialities = [
  {
    icon: FaLeaf,
    title: "Pure Vegetarian",
    description: "100% pure vegetarian cuisine — no meat, no compromise. Every dish is prepared with the highest standards.",
  },
  {
    icon: FaFire,
    title: "Authentic Indian Flavours",
    description: "Traditional recipes passed down through generations, bringing the real taste of India to your table.",
  },
  {
    icon: FaSeedling,
    title: "Fresh Ingredients",
    description: "We source only the freshest seasonal vegetables and spices daily to ensure every bite is full of flavour.",
  },
  {
    icon: MdTableRestaurant,
    title: "Comfortable Dining",
    description: "A warm, welcoming atmosphere perfect for family gatherings, celebrations, and everyday dining.",
  },
];

const signatureDishes = [
  {
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in a rich, creamy tomato-based gravy with aromatic spices.",
    image: `${import.meta.env.BASE_URL}dish-paneer.png`,
  },
  {
    name: "Masala Dosa",
    description: "Crispy golden dosa filled with spiced potato stuffing, served with sambar and chutneys.",
    image: `${import.meta.env.BASE_URL}dish-dosa.jpg`,
  },
  {
    name: "Veg Biryani",
    description: "Fragrant basmati rice layered with seasonal vegetables and whole spices, slow-cooked to perfection.",
    image: `${import.meta.env.BASE_URL}dish-biryani.png`,
  },
];

const RESERVE_WHATSAPP_NUMBER = "918951454455";

const services = [
  {
    id: "dine-in",
    icon: FaUtensils,
    title: "Dine-In",
    description:
      "Reserve a table at our restaurant and enjoy an elegant in-house dining experience with family and friends.",
    cta: "Reserve a Table",
    action: "scroll" as const,
  },
  {
    id: "table-reservation",
    icon: FaCalendarCheck,
    title: "Table Reservation",
    description:
      "Reserve your table at Samara's Veg for a seamless dining experience. Perfect for families, celebrations, and special occasions.",
    cta: "Book Table",
    action: "link" as const,
    href: `https://wa.me/${RESERVE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hello Samara's Veg,

I would like to reserve a table.

Name:
Phone:
Date:
Time:
Guests:

Please confirm availability.`
    )}`,
  },
  {
    id: "catering",
    icon: FaConciergeBell,
    title: "Catering",
    description:
      "From intimate gatherings to grand celebrations — we bring authentic Indian vegetarian cuisine to your event.",
    cta: "Get a Quote",
    action: "route" as const,
    to: "/contact",
  },
];

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getNextHour() {
  const d = new Date();
  let h = d.getHours() + 1;
  if (h < 10) h = 10;
  if (h > 22) h = 22;
  return `${String(h).padStart(2, "0")}:00`;
}

function scrollToReserve() {
  const el = document.getElementById("reserve-table");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ReserveTableSection() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(getTodayISO());
  const [time, setTime] = useState(getNextHour());
  const [guests, setGuests] = useState("2");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<any>(null);

  useEffect(() => {
    if (!phoneInputRef.current) return;
    const iti = intlTelInput(phoneInputRef.current, {
      initialCountry: "auto",
      separateDialCode: true,
      geoIpLookup: (success: (countryCode: string) => void) => {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => success(data.country_code || "IN"))
          .catch(() => success("IN"));
      },
    });
    itiRef.current = iti;
    return () => {
      iti.destroy();
      itiRef.current = null;
    };
  }, []);

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const phone = itiRef.current ? itiRef.current.getNumber() : "";
    const trimmedName = name.trim();

    if (!trimmedName || !phone || !date || !time || !guests) {
      alert("Please fill in all fields before booking.");
      return;
    }

    const message = `Hello Samara's Veg,

I would like to reserve a table:

Name: ${trimmedName}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}`;

    const url = `https://wa.me/${RESERVE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    setIsProcessing(true);
    setToast("Redirecting to WhatsApp...");
    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setIsProcessing(false);
      window.setTimeout(() => setToast(null), 1800);
    }, 700);
  };

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

  return (
    <section
      id="reserve-table"
      className="py-16 md:py-28 px-6 lg:px-12 bg-[#080808] relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,0,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
          >
            Book Your Visit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4"
          >
            Reserve a Table
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 max-w-lg mx-auto font-light"
          >
            Send your reservation details over WhatsApp and we'll confirm your
            table within minutes.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleBook}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-panel p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wider uppercase text-white/50">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                placeholder="Your full name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60"
              />
            </div>

            <div className="space-y-2 contact-iti-wrapper">
              <label className="text-xs font-semibold tracking-wider uppercase text-white/50">
                Phone
              </label>
              <input
                ref={phoneInputRef}
                id="reserve-phone"
                type="tel"
                disabled={isProcessing}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-white/50">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={getTodayISO()}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isProcessing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60 reserve-date-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-white/50">
                  Time
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  min="10:00"
                  max="22:00"
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isProcessing}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60 reserve-date-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wider uppercase text-white/50">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                disabled={isProcessing}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60 appearance-none"
              >
                {guestOptions.map((g) => (
                  <option key={g} value={g} className="bg-[#181818]">
                    {g} {g === "1" ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold tracking-[0.12em] uppercase text-sm rounded-xl px-4 py-5 hover:bg-[#1ebe5a] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(37,211,102,0.55)] active:translate-y-0 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <FaWhatsapp size={20} />
              {isProcessing ? "Opening WhatsApp..." : "Book via WhatsApp"}
            </button>

            <p className="text-center text-white/35 text-xs font-light pt-2">
              Open daily 10:00 AM – 10:00 PM
            </p>
          </div>
        </motion.form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#181818] border border-[#25D366]/40 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]"
          >
            <FaCheckCircle className="text-[#25D366]" size={18} />
            <span className="text-white text-sm font-medium">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

/* ─── PAGE COMPONENT ─────────────────────────────────────── */
export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const bgY          = useTransform(scrollY, [0, 700], [0, 80]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const largeOrbY    = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const mediumOrbY   = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});

    const onLoad = () => {
      const v = document.querySelector<HTMLVideoElement>(".hero-video");
      if (v) v.play().catch(() => {});
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <PageTransition>

      {/* ═══════════════════════════════════════ HERO ═══ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ marginTop: 0 }}>

        {/* ── Full-screen video background ── */}
        <motion.div style={{ y: bgY }} className="absolute inset-[-8%] z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover hero-video"
            style={{ transform: "translateZ(0)" }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ── Overlays ── */}
        <div className="absolute inset-0 z-[1] bg-black/50" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.18),transparent_52%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,122,0,0.10),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#080808] to-transparent z-[1]" />

        {/* ── Ambient orbs ── */}
        <motion.div
          style={{ y: largeOrbY }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[rgba(255,122,0,0.07)] rounded-full blur-[160px] z-[2] pointer-events-none"
        />
        <motion.div
          style={{ y: mediumOrbY }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[rgba(255,122,0,0.05)] rounded-full blur-[120px] z-[2] pointer-events-none"
        />

        {/* ── Center content ── */}
        <motion.div
          style={{ y: heroContentY }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pt-20 md:pt-24"
        >
          {/* Restaurant name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="text-[clamp(2.25rem,11vw,4.2rem)] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9rem] font-display font-bold leading-none tracking-tight mb-5 whitespace-nowrap"
            style={{
              color: "#22CC22",
              textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 4px 12px rgba(0,0,0,0.85)",
            }}
          >
            Samara's Veg
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl font-light text-white/80 tracking-wider mb-3"
          >
            Authentic Indian{" "}
            <span className="text-primary font-normal text-glow">Vegetarian</span>{" "}
            Flavours
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm md:text-base text-white/50 tracking-[0.14em] mb-12 font-light"
          >
            Fresh Ingredients&nbsp;•&nbsp;Traditional Taste&nbsp;•&nbsp;Modern Dining
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <Link
              to="/menu"
              className="relative px-10 py-4 bg-primary text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full overflow-hidden
                         hover:scale-[1.04] hover:shadow-[0_0_55px_rgba(255,122,0,0.55),0_0_20px_rgba(255,122,0,0.3)] transition-all duration-300 group"
            >
              <span className="relative z-10">View Menu</span>
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border border-white/25 text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full
                         hover:border-primary/60 hover:bg-primary/8 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(255,122,0,0.15)] transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* ═══════════════════════════ ABOUT ═══ */}
      <section className="py-16 md:py-28 px-6 lg:px-12 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="w-full rounded-3xl relative group shadow-[0_32px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)]">
              <video
                src="/videos/chef.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20 glass-panel p-5 rounded-2xl flex items-center gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <PiForkKnife size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-wider uppercase">100% Pure Veg</h4>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[length:20px_20px] -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs">Our Story</h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Welcome to Samara's Veg
            </h3>
            <div className="space-y-6 text-white/60 text-lg leading-[1.9] mb-10">
              <p>
                At Samara's Veg, we celebrate the richness of Indian vegetarian cuisine. Our kitchen is dedicated to serving authentic dishes rooted in tradition — every recipe crafted with love, fresh ingredients, and the finest spices sourced directly from Indian farms.
              </p>
              <p>
                From the creamy indulgence of Paneer Butter Masala to the crispy perfection of Masala Dosa, our menu is a journey through India's diverse culinary heritage. We welcome you to experience the warmth of true Indian hospitality.
              </p>
            </div>
            <div className="h-[1px] w-full bg-white/10 mb-8" />
            <div className="flex flex-col sm:flex-row gap-12">
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">100%</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Pure Vegetarian</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">50+</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Authentic Dishes</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-2xl mb-1">Fresh</h4>
                <p className="text-white/50 text-sm uppercase tracking-wider">Daily Ingredients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ OUR SPECIALITY ═══ */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Our Speciality
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialities.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="glass-panel p-5 md:p-8 text-center group relative overflow-hidden flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-400 relative z-10">
                  <item.icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-400" />
                </div>
                <h3 className="text-white font-display font-bold text-xl mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ OUR SERVICES ═══ */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,122,0,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
            >
              How We Serve You
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Our Services
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((item, i) => {
              const inner = (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />
                  <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-400 relative z-10">
                    <item.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-400" />
                  </div>
                  <h3 className="text-white font-display font-bold text-2xl mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed font-light relative z-10 mb-6 flex-1">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase relative z-10 group-hover:gap-3 transition-all duration-300">
                    {item.cta} <span aria-hidden>→</span>
                  </span>
                </>
              );

              const baseClass =
                "glass-panel p-6 md:p-8 group relative overflow-hidden flex flex-col text-left cursor-pointer h-full";

              const cardWrapper = (children: React.ReactNode) => (
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="h-full"
                >
                  {children}
                </motion.div>
              );

              if (item.action === "scroll") {
                return (
                  <div key={item.id}>
                    {cardWrapper(
                      <button
                        type="button"
                        onClick={scrollToReserve}
                        className={`${baseClass} w-full`}
                      >
                        {inner}
                      </button>
                    )}
                  </div>
                );
              }
              if (item.action === "route") {
                return (
                  <div key={item.id}>
                    {cardWrapper(
                      <Link to={item.to!} className={baseClass}>
                        {inner}
                      </Link>
                    )}
                  </div>
                );
              }
              return (
                <div key={item.id}>
                  {cardWrapper(
                    <a
                      href={item.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClass}
                    >
                      {inner}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ RESERVE A TABLE ═══ */}
      <ReserveTableSection />

      {/* ═══════════════════════ SIGNATURE DISHES ═══ */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-xs"
            >
              Must Try
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-white leading-tight"
            >
              Signature Dishes
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {signatureDishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="glass-panel group overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    style={{ transform: "translateZ(0)" }}
                  />
                </div>
                <div className="p-5 md:p-8 relative">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {dish.name}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">{dish.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-14"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,122,0,0.5)] transition-all duration-300"
            >
              Explore Full Menu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SERVING LOCATION ═══ */}
      <section className="py-16 md:py-28 px-6 lg:px-12 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">We Serve At</h3>
            <p className="text-white/60 mb-8 md:mb-16 text-lg font-light">Come visit us and enjoy an authentic Indian vegetarian experience.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Location 1 */}
              <a
                href="https://maps.app.goo.gl/yH5BbVWAhXPif5Vk7"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="glass-panel p-6 md:p-10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                  <motion.div
                    className="w-16 h-16 mx-auto bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-6 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <FaMapMarkerAlt className="text-primary w-6 h-6 relative z-10" />
                  </motion.div>
                  <h4 className="text-2xl font-display font-bold text-white mb-3">Samara's Veg</h4>
                  <p className="text-white/50 text-base mb-6 font-light">Bagepalli</p>
                  <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Open in Google Maps
                    <motion.span className="ml-2 inline-block" initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
                  </span>
                </div>
              </a>

              {/* Location 2 */}
              <a
                href="https://maps.app.goo.gl/gtABD36duSbhTRT28?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="glass-panel p-6 md:p-10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden h-full">
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                  <motion.div
                    className="w-16 h-16 mx-auto bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-6 relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <FaMapMarkerAlt className="text-primary w-6 h-6 relative z-10" />
                  </motion.div>
                  <h4 className="text-2xl font-display font-bold text-white mb-3">Samara's Veg</h4>
                  <p className="text-white/50 text-base mb-6 font-light">Chikkaballapura</p>
                  <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Open in Google Maps
                    <motion.span className="ml-2 inline-block" initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(200%); } }
      `}</style>
    </PageTransition>
  );
}
