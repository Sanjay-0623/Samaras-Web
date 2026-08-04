import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdTableRestaurant, MdEventAvailable } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import PageTransition from "@/components/PageTransition";

const RESERVE_WHATSAPP_NUMBER = "918951454455";
const RESERVE_MESSAGE = `Hello Samara's Veg,

I would like to reserve a table.

Name:
Phone:
Date:
Time:
Guests:

Please confirm availability.`;
const RESERVE_WHATSAPP_URL = `https://wa.me/${RESERVE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
  RESERVE_MESSAGE
)}`;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
  cta: string;
  action: "navigate" | "whatsapp";
};

const services: ServiceItem[] = [
  {
    id: "dine-in",
    title: "Dine In",
    description: "Experience the warmth of Samara's Veg in our welcoming dining hall. Perfect for family gatherings, celebrations, and everyday indulgence in authentic Indian vegetarian cuisine.",
    icon: MdTableRestaurant,
    delay: 0.1,
    cta: "Reserve Now",
    action: "whatsapp",
  },
  {
    id: "table-reservation",
    title: "Table Reservation",
    description: "Reserve your table at Samara's Veg for a seamless dining experience. Perfect for families, celebrations, and special occasions.",
    icon: MdEventAvailable,
    delay: 0.2,
    cta: "Book Table",
    action: "whatsapp",
  },
  {
    id: "catering",
    title: "Catering",
    description: "Bring the Samara's Veg experience to your events. From weddings and corporate lunches to festive gatherings, our catering team delivers authentic Indian vegetarian feasts.",
    icon: GiCookingPot,
    delay: 0.3,
    cta: "Learn More",
    action: "navigate",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6 pt-12"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto font-light"
          >
            More than just a meal. We offer tailored vegetarian dining experiences to suit every occasion and lifestyle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {services.map((service) => {
            const handleCardClick = () => {
              if (service.action === "whatsapp") {
                window.open(RESERVE_WHATSAPP_URL, "_blank", "noopener,noreferrer");
              } else {
                navigate("/contact");
              }
            };

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: service.delay, ease: "easeOut" }}
                onClick={handleCardClick}
                className="glass-panel p-10 hover:border-primary/50 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(255,122,0,0.35)] transition-all duration-500 group relative overflow-hidden text-center flex flex-col items-center transform-gpu cursor-pointer"
              >
                <div className="absolute top-0 inset-x-0 h-[30%] bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-[100px] h-[100px] bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors duration-500 relative z-10">
                  <service.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>

                <h3 className="text-3xl font-display font-bold text-white mb-6 relative z-10">
                  {service.title}
                </h3>

                <p className="text-white/60 text-base leading-relaxed relative z-10 mb-8 font-light flex-grow">
                  {service.description}
                </p>

                <div className="relative z-10 mt-auto">
                  <span
                    className="text-sm font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors flex items-center gap-2"
                  >
                    {service.cta}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 glass-panel border-l-4 border-l-primary p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          <div className="relative z-10 md:max-w-2xl text-center md:text-left">
            <h3 className="text-4xl font-display font-bold text-white mb-4">Planning a special event?</h3>
            <p className="text-white/70 text-lg font-light">
              Let our catering team craft an authentic Indian vegetarian feast for your guests — from intimate family dinners to grand celebrations.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-5 bg-primary text-white text-sm font-bold uppercase tracking-[0.15em] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,122,0,0.5)] transition-all duration-300"
            >
              Inquire Now
            </button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
