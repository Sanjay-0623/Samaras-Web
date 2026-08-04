import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";

interface StaticReview {
  name: string;
  rating: number;
  text: string;
  when: string;
}

const REVIEW_LINK =
  "https://search.google.com/local/writereview?placeid=ChIJ_____SamarasVeg";

const STATIC_REVIEWS: StaticReview[] = [
  {
    name: "Aarav Sharma",
    rating: 5,
    text: "Had the most authentic North Karnataka thali here on our way to Hyderabad. The bisi bele bath and ragi mudde were unbelievably fresh. Service was warm and the place is spotlessly clean. Easily the best vegetarian stop on NH 44.",
    when: "2 weeks ago",
  },
  {
    name: "Priya Reddy",
    rating: 5,
    text: "Stopped at the Bagepalli branch with my family during a long drive. The masala dosa was crispy, the sambar had a perfect tang, and the filter coffee took me right back to my grandmother's kitchen. Will definitely return.",
    when: "1 month ago",
  },
  {
    name: "Rahul Iyer",
    rating: 4,
    text: "Great vegetarian options and a peaceful ambience. Loved the paneer butter masala and the soft butter naan. Slightly crowded during dinner but the food more than makes up for the wait.",
    when: "3 weeks ago",
  },
  {
    name: "Sneha Kulkarni",
    rating: 5,
    text: "Samara's Veg in Chikkaballapur is a hidden gem. The pav bhaji and Mumbai-style sandwich were outstanding, and the staff genuinely cares about every guest. My kids loved the gulab jamun. Highly recommended for families.",
    when: "5 days ago",
  },
  {
    name: "Vikram Patil",
    rating: 5,
    text: "Came for a quick lunch and ended up ordering twice — the curd rice and Mysore bonda were that good. Premium vibe, very reasonable prices, and parking was easy. Big thumbs up to the kitchen team.",
    when: "2 months ago",
  },
  {
    name: "Anjali Menon",
    rating: 4,
    text: "Loved the South Indian breakfast spread — idli was fluffy, vada was crisp, and the chutneys were freshly ground. The interior is modern yet cozy. Will be back for the lunch buffet next time.",
    when: "1 week ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-[#FF7A00]" : "text-white/15"}
          size={14}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: StaticReview; index: number }) {
  const MAX_LENGTH = 220;
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > MAX_LENGTH;
  const displayText =
    isLong && !expanded ? review.text.slice(0, MAX_LENGTH).trimEnd() + "…" : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative group flex flex-col rounded-3xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#FF7A00]/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,122,0,0.12)] transition-all duration-300 overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A00]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />

      <FaQuoteLeft className="text-[#FF7A00]/25 absolute top-6 right-6" size={32} />

      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] font-bold text-lg ring-2 ring-white/10 group-hover:ring-[#FF7A00]/30 transition-all duration-300">
            {review.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold text-[15px] leading-tight">
            {review.name}
          </h4>
          <p className="text-white/40 text-xs mt-0.5">{review.when}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5 relative z-10">
        <StarRating rating={review.rating} />
        <span className="text-[#FF7A00] font-bold text-sm">{review.rating}.0</span>
      </div>

      <p className="text-white/60 text-[15px] leading-relaxed flex-1 relative z-10">
        {displayText}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[#FF7A00] text-sm font-medium hover:text-white transition-colors relative z-10 self-start"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-6 pt-4 border-t border-white/8 flex items-center gap-2 relative z-10">
        <FaStar className="text-[#FF7A00]" size={11} />
        <span className="text-white/30 text-xs tracking-wider uppercase">Verified Guest</span>
      </div>
    </motion.div>
  );
}

function AverageRatingBadge({ reviews }: { reviews: StaticReview[] }) {
  if (reviews.length === 0) return null;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="inline-flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm mt-8"
    >
      <span className="text-5xl font-bold text-[#FF7A00]">{avg}</span>
      <StarRating rating={Math.round(Number(avg))} />
      <span className="text-white/40 text-sm">
        Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
      </span>
    </motion.div>
  );
}

export default function Reviews() {
  const reviews = STATIC_REVIEWS;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative min-h-[60vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent mb-16" />

        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FF7A00] text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Guest Experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight"
          >
            What Our Customers Say
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/45 text-sm"
          >
            <FaStar className="text-[#FF7A00]" size={14} />
            <span>Stories from our wonderful guests</span>
          </motion.div>

          <AverageRatingBadge reviews={reviews} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://maps.app.goo.gl/yH5BbVWAhXPif5Vk7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm hover:border-[#FF7A00]/40 hover:text-white hover:bg-white/[0.06] transition-all duration-300 group"
          >
            <FaGoogle className="text-[#4285F4] group-hover:scale-110 transition-transform" size={14} />
            View on Google Maps
          </a>
          <a
            href={REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FF7A00] text-white text-sm font-semibold tracking-wide hover:bg-[#FF7A00]/90 hover:shadow-[0_0_30px_rgba(255,122,0,0.35)] transition-all duration-300"
          >
            <FaStar size={14} />
            Leave a Review
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
}
