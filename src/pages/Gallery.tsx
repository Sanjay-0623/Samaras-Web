import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

const img01 = "/gallery/IMG_6427-1_1773696883206.jpg";
const img02 = "/gallery/_DSC1844-59_1773696883212.jpg";
const img03 = "/gallery/_DSC1837-58_1773696883216.jpg";
const img04 = "/gallery/_DSC1835-57_1773696883220.jpg";
const img05 = "/gallery/_DSC1831-56_1773696883224.jpg";
const img06 = "/gallery/_DSC1828-55_1773696883229.jpg";
const img07 = "/gallery/_DSC1827-54_1773696883233.jpg";
const img08 = "/gallery/_DSC1820-53_1773696883236.jpg";
const img09 = "/gallery/_DSC1819-52_1773696883240.jpg";
const img10 = "/gallery/_DSC1816-51_1773696883244.jpg";
const img11 = "/gallery/_DSC1813-50_1773696883248.jpg";
const img12 = "/gallery/_DSC1808-49_1773696883252.jpg";
const img13 = "/gallery/_DSC1807-48_1773696883256.jpg";
const img14 = "/gallery/_DSC1805-47_1773696883262.jpg";
const img15 = "/gallery/_DSC1803-46_1773696883267.jpg";
const img16 = "/gallery/_DSC1802-45_1773696883271.jpg";
const img17 = "/gallery/_DSC1801-44_1773696883276.jpg";
const img18 = "/gallery/_DSC1795-43_1773696883280.jpg";
const img19 = "/gallery/_DSC1784-42_1773696883285.jpg";
const img20 = "/gallery/_DSC1782-41_1773696883290.jpg";

const galleryImages = [
  { src: img01,  alt: "Signature Thali plate",        label: "Signature Thali",    tall: true  },
  { src: img02,  alt: "Crispy Rava Dosa with chutney",label: "Rava Dosa",          tall: false },
  { src: img03,  alt: "Tomato Dosa with chutneys",    label: "Tomato Dosa",        tall: false },
  { src: img04,  alt: "Fluffy Set Dosa",              label: "Set Dosa",           tall: true  },
  { src: img05,  alt: "Ragi Dosa on plate",           label: "Ragi Dosa",          tall: false },
  { src: img06,  alt: "Carrot Halwa in glass cup",    label: "Carrot Halwa",       tall: false },
  { src: img07,  alt: "Sweet Halwa top view",         label: "Sweet Halwa",        tall: true  },
  { src: img08,  alt: "Masala Dosa triangle",         label: "Masala Dosa",        tall: false },
  { src: img09,  alt: "Golden Medu Vada",             label: "Medu Vada",          tall: false },
  { src: img10,  alt: "Cone Dosa served with chutney",label: "Cone Dosa",          tall: true  },
  { src: img11,  alt: "Large Benne Dosa",             label: "Benne Dosa",         tall: false },
  { src: img12,  alt: "Crispy Oats Dosa",             label: "Oats Dosa",          tall: false },
  { src: img13,  alt: "Plain Dosa folded",            label: "Plain Dosa",         tall: true  },
  { src: img14,  alt: "Idli Vada combo plate",        label: "Idli Vada",          tall: false },
  { src: img15,  alt: "Spicy Veg Noodles",            label: "Veg Noodles",        tall: false },
  { src: img16,  alt: "Veg Fried Rice",               label: "Veg Fried Rice",     tall: true  },
  { src: img17,  alt: "Veg Stir Fry",                 label: "Veg Stir Fry",       tall: false },
  { src: img18,  alt: "Chinese-style Noodles",        label: "Chinese Noodles",    tall: false },
  { src: img19,  alt: "Gobi Manchurian with peppers", label: "Gobi Manchurian",    tall: true  },
  { src: img20,  alt: "Starter Platter",              label: "Starter Platter",    tall: false },
];

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
  tall: boolean;
}

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
      >
        <img src={image.src} alt={image.alt} className="w-full max-h-[80vh] object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
          <p className="text-white font-display font-bold text-xl">{image.label}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors text-xl font-bold"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4 pt-12"
          >
            Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-5"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/55 text-lg max-w-2xl mx-auto font-light"
          >
            A glimpse into the warmth, flavours, and experience that define Samara's Veg.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: "easeOut" }}
              className="break-inside-avoid mb-4 relative group cursor-zoom-in overflow-hidden rounded-2xl"
              onClick={() => setSelected(img)}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out ${img.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl flex items-end p-5">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-display font-bold text-lg leading-tight">{img.label}</p>
                  <p className="text-white/60 text-xs mt-0.5 tracking-wider">Tap to enlarge</p>
                </div>
              </div>

              {/* Orange accent dot */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,122,0,0.8)]" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
          <p className="text-white/30 text-sm font-light italic">
            "Every dish tells a story — come be part of ours."
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && <Lightbox image={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
}
