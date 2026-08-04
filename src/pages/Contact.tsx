import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import intlTelInput from "intl-tel-input/intlTelInputWithUtils";
import "intl-tel-input/styles";
import PageTransition from "@/components/PageTransition";

const branches = [
  {
    name: "Bagepalli Branch",
    phone: "+91 9164117733",
    tel: "tel:+919164117733",
    wa: "https://wa.me/919164117733",
    address: "Toll plaza, HYD - BLR NH 44, Bagepalli, Karnataka 561207",
    mapsUrl: "https://maps.app.goo.gl/yH5BbVWAhXPif5Vk7",
  },
  {
    name: "Chikkaballapura Branch",
    phone: "+91 8951454455",
    tel: "tel:+918951454455",
    wa: "https://wa.me/918951454455",
    address: "Samara's Veg, Chikkaballapur, Karnataka 562101",
    mapsUrl: "https://maps.app.goo.gl/gtABD36duSbhTRT28?g_st=aw",
  },
];

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  subject: "catering",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSending, setIsSending] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<any>(null);

  useEffect(() => {
    if (!phoneInputRef.current) return;
    const iti = intlTelInput(phoneInputRef.current, {
      initialCountry: "auto",
      separateDialCode: true,
      geoIpLookup: (success: (countryCode: string) => void, failure: () => void) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const fullPhone = itiRef.current ? itiRef.current.getNumber() : "";
    const payload = {
      name: `${formData.first_name} ${formData.last_name}`.trim(),
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: fullPhone,
      subject: formData.subject,
      message: formData.message,
    };
    console.log("CONTACT FORM PAYLOAD:", payload);

    setIsSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Message sent successfully!");
      setFormData(INITIAL_FORM);
      if (itiRef.current) itiRef.current.setNumber("");
    } catch (error) {
      console.error("CONTACT EMAILJS ERROR:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative">
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6 pt-12"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto font-light"
          >
            We'd love to hear from you. Reserve a table, ask about our menu, or simply say hello.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">Our Branches</h2>

            {/* Branch Cards */}
            {branches.map((branch, i) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                className="glass-panel p-7 relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,122,0,0.7)]" />
                  <h3 className="text-white font-display font-bold text-xl tracking-wide relative z-10">
                    {branch.name}
                  </h3>
                </div>

                <div className="space-y-4 relative z-10">
                  <a href={branch.tel} className="flex items-center gap-4 group/phone">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shrink-0 group-hover/phone:bg-primary/20 transition-colors duration-300">
                      <FaPhoneAlt className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-0.5">Phone</p>
                      <p className="text-white font-semibold text-lg group-hover/phone:text-primary transition-colors duration-300">
                        {branch.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <FaMapMarkerAlt className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-0.5">Address</p>
                      <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 text-base font-light leading-snug hover:text-primary transition-colors duration-300">{branch.address}</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-3 pt-3"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Chat on WhatsApp</p>
              {branches.map((branch, i) => (
                <a
                  key={i}
                  href={branch.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 bg-[#25D366]/8 border border-[#25D366]/20 px-6 py-4 rounded-2xl hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#25D366]/20 rounded-full flex items-center justify-center shrink-0">
                      <FaWhatsapp className="text-[#25D366] text-lg" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{branch.name}</p>
                      <p className="text-[#25D366]/70 text-xs mt-0.5 font-light">{branch.phone}</p>
                    </div>
                  </div>
                  <span className="w-9 h-9 bg-[#25D366]/20 rounded-full flex items-center justify-center text-[#25D366] font-bold group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shrink-0">
                    →
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
              <h2 className="text-3xl font-display font-bold text-white mb-8 relative z-10">Send a Message</h2>

              <form className="space-y-6 relative z-10" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider uppercase text-white/50">First Name</label>
                    <input name="first_name" type="text" required value={formData.first_name} onChange={handleChange} disabled={isSending} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Last Name</label>
                    <input name="last_name" type="text" required value={formData.last_name} onChange={handleChange} disabled={isSending} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60" />
                  </div>
                </div>

                <div className="space-y-2 contact-iti-wrapper">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Phone</label>
                  <input
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    disabled={isSending}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all font-light disabled:opacity-60"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Subject</label>
                  <select name="subject" required value={formData.subject} onChange={handleChange} disabled={isSending} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all appearance-none font-light disabled:opacity-60">
                    <option value="catering" className="bg-[#181818]">Catering Inquiry</option>
                    <option value="takeaway" className="bg-[#181818]">Takeaway Order</option>
                    <option value="feedback" className="bg-[#181818]">Feedback</option>
                    <option value="other" className="bg-[#181818]">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-wider uppercase text-white/50">Message</label>
                  <textarea name="message" rows={5} required value={formData.message} onChange={handleChange} disabled={isSending} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-light disabled:opacity-60" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" disabled={isSending} className="w-full bg-primary text-white font-bold tracking-[0.15em] uppercase text-sm rounded-xl px-4 py-5 hover:bg-primary/90 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,122,0,0.6)] active:translate-y-0 mt-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
