import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

/* ─── PER-DISH IMAGES — AI-generated, locally hosted ─────── */
const m = (file: string) => `${import.meta.env.BASE_URL}menu/${file}`;

const IMG = {
  // South Indian
  masalaDosa:          m("masala-dosa.png"),
  plainDosa:           m("plain-dosa.png"),
  ravaDosa:            m("rava-dosa.png"),
  onionDosa:           m("onion-dosa.png"),
  idli:                m("idli.png"),
  vada:                m("vada.png"),
  sambarIdli:          m("sambar-idli.png"),
  setDosa:             m("set-dosa.png"),
  pongal:              m("pongal.png"),
  upma:                m("upma.png"),
  // North Indian
  paneerButterMasala:  m("paneer-butter-masala.png"),
  kadaiPaneer:         m("kadai-paneer.png"),
  palakPaneer:         m("palak-paneer.png"),
  shahiPaneer:         m("shahi-paneer.png"),
  choleMasala:         m("chole-masala.png"),
  dalTadka:            m("dal-tadka.png"),
  dalMakhani:          m("dal-makhani.png"),
  vegKolhapuri:        m("veg-kolhapuri.png"),
  mixVegCurry:         m("mix-veg-curry.png"),
  malaiKofta:          m("malai-kofta.png"),
  // Rice & Biryani
  vegBiryani:          m("veg-biryani.png"),
  paneerBiryani:       m("paneer-biryani.png"),
  jeeraRice:           m("jeera-rice.png"),
  vegPulao:            m("veg-pulao.png"),
  curdRice:            m("curd-rice.png"),
  sambarRice:          m("sambar-rice.png"),
  lemonRice:           m("lemon-rice.png"),
  tomatoRice:          m("tomato-rice.png"),
  // Indian Breads
  butterNaan:          m("butter-naan.png"),
  garlicNaan:          m("garlic-naan.png"),
  tandooriRoti:        m("tandoori-roti.png"),
  butterRoti:          m("butter-roti.png"),
  kulcha:              m("kulcha.png"),
  paratha:             m("paratha.png"),
  // Starters
  paneerTikka:         m("paneer-tikka.png"),
  vegManchurian:       m("veg-manchurian.png"),
  gobiManchurian:      m("gobi-manchurian.png"),
  chilliPaneer:        m("chilli-paneer.png"),
  vegCutlet:           m("veg-cutlet.png"),
  haraBharaKabab:      m("hara-bhara-kabab.png"),
  // Chats
  paniPuri:            m("pani-puri.png"),
  bhelPuri:            m("bhel-puri.png"),
  sevPuri:             m("sev-puri.png"),
  pavBhaji:            m("pav-bhaji.png"),
  samosaChaat:         m("samosa-chaat.png"),
  dahiPuri:            m("dahi-puri.png"),
  // Chinese Veg
  vegFriedRice:        m("veg-fried-rice.png"),
  schezwanFriedRice:   m("schezwan-fried-rice.png"),
  vegNoodles:          m("veg-noodles.png"),
  hakkaNoodles:        m("hakka-noodles.png"),
  chilliGarlicNoodles: m("chilli-garlic-noodles.png"),
  vegManchurianGravy:  m("veg-manchurian-gravy.png"),
  // Desserts
  gulabJamun:          m("gulab-jamun.png"),
  rasgulla:            m("rasgulla.png"),
  rasmalai:            m("rasmalai.png"),
  gajarHalwa:          m("gajar-halwa.png"),
  kulfi:               m("kulfi.png"),
  kheer:               m("kheer.png"),
  // Beverages
  masalaChai:          m("masala-chai.png"),
  filterCoffee:        m("filter-coffee.png"),
  sweetLassi:          m("sweet-lassi.png"),
  saltLassi:           m("salt-lassi.png"),
  buttermilk:          m("buttermilk.png"),
  freshLimeSoda:       m("fresh-lime-soda.png"),
};

/* ─── MENU DATA ──────────────────────────────────────────── */
interface Dish { name: string; description: string; image: string; }
interface Category { id: string; label: string; emoji: string; items: Dish[]; }

const menuData: Category[] = [
  {
    id: "south-indian",
    label: "South Indian",
    emoji: "🌴",
    items: [
      { name: "Masala Dosa",  description: "Crispy golden rice crepe filled with spiced potato masala, served with coconut chutney and sambar.", image: IMG.masalaDosa },
      { name: "Plain Dosa",   description: "Classic thin and crispy rice-lentil crepe, light and delicate, served with chutneys and sambar.",   image: IMG.plainDosa },
      { name: "Rava Dosa",    description: "Instantly made crispy semolina crepe with onions and green chillies, served with chutneys.",         image: IMG.ravaDosa },
      { name: "Onion Dosa",   description: "Thin and lacy rice crepe topped with freshly chopped onions and tempered with mustard seeds.",        image: IMG.onionDosa },
      { name: "Idli",         description: "Soft and fluffy steamed rice cakes served warm with sambar and a trio of chutneys.",                  image: IMG.idli },
      { name: "Vada",         description: "Crispy fried lentil doughnuts with curry leaves and black pepper, served with sambar and chutney.",   image: IMG.vada },
      { name: "Sambar Idli",  description: "Pillowy steamed idlis dunked in rich, tangy vegetable sambar — a South Indian comfort classic.",      image: IMG.sambarIdli },
      { name: "Set Dosa",     description: "Thick, soft and spongy dosas served in a set of three with vegetable korma and coconut chutney.",    image: IMG.setDosa },
      { name: "Pongal",       description: "Slow-cooked rice and lentil porridge with black pepper, cumin, ginger, and a generous ghee tempering.", image: IMG.pongal },
      { name: "Upma",         description: "Savory semolina porridge tempered with mustard seeds, curry leaves, onions, and mixed vegetables.",   image: IMG.upma },
    ],
  },
  {
    id: "north-indian",
    label: "North Indian",
    emoji: "🫕",
    items: [
      { name: "Paneer Butter Masala", description: "Velvety tomato and cashew gravy with soft paneer, butter, and aromatic whole spices.",                      image: IMG.paneerButterMasala },
      { name: "Kadai Paneer",         description: "Paneer and capsicum tossed in a bold kadai masala with onions, tomatoes, and freshly ground spices.",       image: IMG.kadaiPaneer },
      { name: "Palak Paneer",         description: "Fresh cottage cheese simmered in a vibrant spinach gravy spiced with ginger, garlic, and cumin.",           image: IMG.palakPaneer },
      { name: "Shahi Paneer",         description: "Royal-style paneer in a rich, cream-laced onion and cashew gravy with saffron and cardamom.",              image: IMG.shahiPaneer },
      { name: "Chole Masala",         description: "Hearty chickpeas cooked in a robust blend of whole spices, tomatoes, and caramelised onions.",             image: IMG.choleMasala },
      { name: "Dal Tadka",            description: "Yellow lentils simmered to perfection and finished with a sizzling ghee tempering of garlic and red chilli.", image: IMG.dalTadka },
      { name: "Dal Makhani",          description: "Slow-cooked black lentils with kidney beans, butter, cream, and a medley of aromatic spices.",             image: IMG.dalMakhani },
      { name: "Veg Kolhapuri",        description: "A fiery, flavour-packed Maharashtrian curry with seasonal vegetables and a coconut-spice masala.",         image: IMG.vegKolhapuri },
      { name: "Mix Veg Curry",        description: "Seasonal vegetables cooked in a mildly spiced tomato-onion gravy — wholesome and full of colour.",         image: IMG.mixVegCurry },
      { name: "Malai Kofta",          description: "Creamy paneer and potato dumplings served in a delicate mildly spiced makhani-style gravy.",               image: IMG.malaiKofta },
    ],
  },
  {
    id: "rice-biryani",
    label: "Rice & Biryani",
    emoji: "🍚",
    items: [
      { name: "Veg Biryani",     description: "Fragrant basmati rice slow-cooked with seasonal vegetables, saffron strands, and whole spices. Served with raita.", image: IMG.vegBiryani },
      { name: "Paneer Biryani",  description: "Aromatic dum-cooked biryani with marinated paneer, caramelised onions, and fresh mint.",                           image: IMG.paneerBiryani },
      { name: "Jeera Rice",      description: "Basmati rice tempered with cumin seeds, ghee, and whole spices — a simple yet fragrant accompaniment.",            image: IMG.jeeraRice },
      { name: "Veg Pulao",       description: "Lightly spiced basmati rice cooked with garden vegetables, whole spices, and a drizzle of ghee.",                 image: IMG.vegPulao },
      { name: "Curd Rice",       description: "Soft cooked rice mixed with fresh curd and tempered with mustard seeds, curry leaves, and green chillies.",        image: IMG.curdRice },
      { name: "Sambar Rice",     description: "Comforting South Indian rice cooked with toor dal, tamarind, and a vegetable-rich sambar base.",                  image: IMG.sambarRice },
      { name: "Lemon Rice",      description: "Tangy turmeric-tinted rice tossed with lemon juice, peanuts, and a mustard-curry leaf tempering.",               image: IMG.lemonRice },
      { name: "Tomato Rice",     description: "Flavourful rice cooked with ripe tomatoes, onions, and South Indian spices — vibrant, tangy, and satisfying.",   image: IMG.tomatoRice },
    ],
  },
  {
    id: "indian-breads",
    label: "Indian Breads",
    emoji: "🫓",
    items: [
      { name: "Butter Naan",     description: "Soft leavened bread baked in a tandoor and brushed generously with fresh butter — fluffy and pillowy.",  image: IMG.butterNaan },
      { name: "Garlic Naan",     description: "Freshly baked naan topped with minced garlic, butter, and coriander — aromatic and irresistible.",       image: IMG.garlicNaan },
      { name: "Tandoori Roti",   description: "Whole wheat bread baked directly on the walls of a clay tandoor, crisp outside and soft within.",        image: IMG.tandooriRoti },
      { name: "Butter Roti",     description: "Thin whole-wheat flatbread cooked on a tawa and generously smothered with soft butter.",                  image: IMG.butterRoti },
      { name: "Kulcha",          description: "Soft leavened bread stuffed with spiced onion or potato filling, baked in the tandoor to golden perfection.", image: IMG.kulcha },
      { name: "Paratha",         description: "Layered whole-wheat flatbread pan-cooked with ghee, served with yoghurt, pickle, and butter.",           image: IMG.paratha },
    ],
  },
  {
    id: "starters",
    label: "Starters",
    emoji: "🥗",
    items: [
      { name: "Paneer Tikka",    description: "Marinated cottage cheese cubes grilled in a tandoor with capsicum and onion, served with mint chutney.",    image: IMG.paneerTikka },
      { name: "Veg Manchurian",  description: "Crispy fried vegetable balls tossed in a tangy, spicy Indo-Chinese sauce with spring onions and ginger.",  image: IMG.vegManchurian },
      { name: "Gobi Manchurian", description: "Golden crispy cauliflower tossed in a bold Manchurian sauce — a crowd-favourite Indo-Chinese appetiser.", image: IMG.gobiManchurian },
      { name: "Chilli Paneer",   description: "Paneer cubes stir-fried with capsicum, onions, soy sauce, and chilli in a savoury Indo-Chinese style.",   image: IMG.chilliPaneer },
      { name: "Veg Cutlet",      description: "Crispy shallow-fried patties made with seasoned mixed vegetables, herbs, and spices, served with chutney.", image: IMG.vegCutlet },
      { name: "Hara Bhara Kabab", description: "Vibrant green kababs made with spinach, green peas, paneer, and spices — nutritious and flavourful.",    image: IMG.haraBharaKabab },
    ],
  },
  {
    id: "chinese-veg",
    label: "Chinese Veg",
    emoji: "🥢",
    items: [
      { name: "Veg Fried Rice",         description: "Wok-tossed long-grain rice with garden vegetables, soy sauce, and a hint of sesame oil.",                  image: IMG.vegFriedRice },
      { name: "Schezwan Fried Rice",    description: "Fiery and aromatic fried rice tossed with Schezwan sauce, mixed vegetables, and spring onions.",           image: IMG.schezwanFriedRice },
      { name: "Veg Noodles",            description: "Stir-fried noodles with crisp vegetables in a savoury Indo-Chinese sauce — light, flavourful, and satisfying.", image: IMG.vegNoodles },
      { name: "Hakka Noodles",          description: "Classic Indo-Chinese Hakka noodles tossed with vegetables, soy, and chilli in a wok on high flame.",       image: IMG.hakkaNoodles },
      { name: "Chilli Garlic Noodles",  description: "Noodles stir-fried with bold chilli garlic sauce, capsicum, and spring onions — a flavour-packed bowl.",  image: IMG.chilliGarlicNoodles },
      { name: "Veg Manchurian Gravy",   description: "Crispy vegetable balls served in a rich, tangy Manchurian gravy — perfect with fried rice or noodles.",    image: IMG.vegManchurianGravy },
    ],
  },
  {
    id: "chats",
    label: "Chats",
    emoji: "🌮",
    items: [
      { name: "Pani Puri",      description: "Hollow crispy puris filled with spiced potato-chickpea and dunked in tangy, ice-cold flavoured jaljeera water.", image: IMG.paniPuri },
      { name: "Bhel Puri",      description: "A crunchy mix of puffed rice, sev, onions, tomatoes, coriander, and sweet-tangy tamarind chutney.",            image: IMG.bhelPuri },
      { name: "Sev Puri",       description: "Crispy puris loaded with potatoes, chutneys, onions, and topped with fine sev — a Mumbai street classic.",     image: IMG.sevPuri },
      { name: "Pav Bhaji",      description: "Buttery, spiced mixed vegetable mash served with toasted buttered pav rolls and a squeeze of lime.",           image: IMG.pavBhaji },
      { name: "Samosa Chaat",   description: "Flaky samosas broken open and topped with chole, chutneys, yoghurt, onions, and crunchy sev.",                image: IMG.samosaChaat },
      { name: "Dahi Puri",      description: "Crispy puris filled with potatoes, chickpeas, fresh yoghurt, chutneys, and a sprinkle of chaat masala.",      image: IMG.dahiPuri },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    items: [
      { name: "Gulab Jamun",  description: "Soft, spongy milk-solid dumplings soaked in a warm rose-cardamom sugar syrup — a timeless Indian sweet.",         image: IMG.gulabJamun },
      { name: "Rasgulla",     description: "Light, spongy cottage cheese balls simmered in a delicate sugar syrup — Bengali patisserie at its finest.",          image: IMG.rasgulla },
      { name: "Rasmalai",     description: "Soft paneer patties served in chilled, saffron-infused sweetened milk with pistachios and cardamom.",              image: IMG.rasmalai },
      { name: "Gajar Halwa",  description: "Slow-cooked grated carrot pudding with ghee, sugar, milk, and cardamom — a nostalgic winter dessert.",            image: IMG.gajarHalwa },
      { name: "Kulfi",        description: "Dense, creamy Indian ice cream in traditional flavours of mango, rose, and pistachio — richly indulgent.",         image: IMG.kulfi },
      { name: "Kheer",        description: "Creamy rice pudding slow-cooked in full-fat milk with sugar, saffron, cardamom, and topped with dry fruits.",      image: IMG.kheer },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    emoji: "🥤",
    items: [
      { name: "Masala Chai",      description: "Traditional Indian spiced tea brewed with ginger, cardamom, cinnamon, and full-cream milk.",              image: IMG.masalaChai },
      { name: "Filter Coffee",    description: "South Indian decoction coffee — strong, aromatic, and perfectly blended with frothy steamed milk.",       image: IMG.filterCoffee },
      { name: "Sweet Lassi",      description: "Thick blended yoghurt drink sweetened with sugar and flavoured with cardamom and rose water.",            image: IMG.sweetLassi },
      { name: "Salt Lassi",       description: "Chilled savoury yoghurt drink with roasted cumin, black salt, and a hint of mint — refreshing and cooling.", image: IMG.saltLassi },
      { name: "Buttermilk",       description: "Thin, spiced yoghurt drink with coriander, ginger, green chilli, and a pinch of asafoetida.",            image: IMG.buttermilk },
      { name: "Fresh Lime Soda",  description: "Fizzy freshly squeezed lime soda with your choice of sweet, salt, or a tangy combination of both.",      image: IMG.freshLimeSoda },
    ],
  },
];

/* ─── DISH CARD (3D floating) ────────────────────────────── */
function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const floatDuration = 3.2 + (index % 4) * 0.5;
  const floatDelay = (index % 6) * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
      style={{ perspective: "900px" }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay, repeatType: "loop" }}
        whileHover={{
          rotateX: -6,
          rotateY: 5,
          scale: 1.03,
          y: -14,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-panel group cursor-default overflow-hidden transform-gpu hover:border-primary/50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,122,0,0.18),0_0_40px_rgba(255,122,0,0.06)] transition-colors duration-300"
      >
        <div className="aspect-[16/10] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-500 z-10" />
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.1] transition-transform duration-700 ease-out"
            style={{ transform: "translateZ(0)" }}
          />
          {/* 3D shine overlay */}
          <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
        </div>
        <div className="p-5 relative" style={{ transform: "translateZ(20px)" }}>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-b-[inherit]" />
          <h4 className="text-[17px] font-display font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300 relative z-10 leading-snug">
            {dish.name}
          </h4>
          <p className="text-white/50 text-[13px] leading-relaxed font-light relative z-10 line-clamp-2">
            {dish.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CATEGORY SECTION ───────────────────────────────────── */
function CategorySection({ cat, sectionRef }: { cat: Category; sectionRef: (el: HTMLElement | null) => void }) {
  return (
    <section id={cat.id} ref={sectionRef} className="scroll-mt-32 mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-3xl">{cat.emoji}</span>
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">{cat.label}</h2>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/30 to-transparent ml-4" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cat.items.map((dish, i) => (
          <DishCard key={dish.name} dish={dish} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── MAIN MENU PAGE ─────────────────────────────────────── */
export default function Menu() {
  const [activeId, setActiveId] = useState(menuData[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setRef = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = sectionRefs.current.get(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const btn = navButtonRefs.current.get(id);
    if (btn && navRef.current) {
      const nav = navRef.current;
      nav.scrollTo({ left: btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            const btn = navButtonRefs.current.get(id);
            if (btn && navRef.current) {
              navRef.current.scrollTo({ left: btn.offsetLeft - navRef.current.clientWidth / 2 + btn.clientWidth / 2, behavior: "smooth" });
            }
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">

        {/* ── Header ── */}
        <div className="text-center mb-14 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-4 pt-12"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/55 text-lg max-w-2xl mx-auto font-light"
          >
            A complete journey through authentic Indian vegetarian cuisine — fresh, flavourful, and prepared with love every day.
          </motion.p>
        </div>

        {/* ── Sticky Category Nav ── */}
        <div className="sticky top-20 z-30 mb-14 -mx-6 lg:-mx-12 px-6 lg:px-12 py-3 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06]">
          <div ref={navRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {menuData.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => { if (el) navButtonRefs.current.set(cat.id, el); }}
                onClick={() => scrollToSection(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${
                  activeId === cat.id
                    ? "bg-primary text-white shadow-[0_0_18px_rgba(255,122,0,0.45)] scale-[1.04]"
                    : "bg-white/5 border border-white/10 text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Menu Sections ── */}
        <div>
          {menuData.map((cat) => (
            <CategorySection key={cat.id} cat={cat} sectionRef={setRef(cat.id)} />
          ))}
        </div>

      </div>
    </PageTransition>
  );
}
