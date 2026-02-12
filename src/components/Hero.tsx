import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/hooks/useSettings";
import { useCountUp } from "@/hooks/useCountUp";

const Hero = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Ultra-Rich Premium Background - Not Plain! */}
      <div className="absolute inset-0">
        {/* Base Gradient - Multiple Color Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-500"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-600 via-emerald-500 to-teal-400 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/50 via-cyan-500/40 to-sky-400/30"></div>

        {/* Complex Geometric Pattern Layer 1 - Triangles */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, #f97316 12%, transparent 12.5%, transparent 87%, #f97316 87.5%),
              linear-gradient(150deg, #10b981 12%, transparent 12.5%, transparent 87%, #10b981 87.5%),
              linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%),
              linear-gradient(150deg, #f59e0b 12%, transparent 12.5%, transparent 87%, #f59e0b 87.5%)
            `,
            backgroundSize: '60px 100px',
            backgroundPosition: '0 0, 0 0, 30px 50px, 30px 50px'
          }}></div>
        </div>

        {/* Pattern Layer 2 - Dots Matrix */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 15px 15px, rgba(255,255,255,0.6) 2px, transparent 2px),
              radial-gradient(circle at 45px 45px, rgba(255,255,255,0.4) 2px, transparent 2px),
              radial-gradient(circle at 30px 60px, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Pattern Layer 3 - Warli Art Inspired Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px),
              radial-gradient(circle at 50px 50px, rgba(255,255,255,0.3) 20px, transparent 20px),
              radial-gradient(circle at 100px 20px, rgba(255,255,255,0.2) 15px, transparent 15px)
            `,
            backgroundSize: '120px 120px'
          }}></div>
        </div>

        {/* Diagonal Stripe Pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
          }}></div>
        </div>

        {/* Large Decorative Circles - Traditional Design */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full border-8 border-white/10"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border-8 border-white/10"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full border-4 border-white/10 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Multiple Animated Floating Orbs with Gradients */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/30 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-gradient-to-br from-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/25 to-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-amber-400/20 to-yellow-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-gradient-to-br from-purple-400/15 to-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

        {/* Animated Shimmer Waves */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer"></div>

        {/* Mesh Gradient Overlay for Depth */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(251,146,60,0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16,185,129,0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59,130,246,0.3) 0%, transparent 60%),
              radial-gradient(circle at 60% 20%, rgba(245,158,11,0.3) 0%, transparent 60%)
            `
          }}></div>
        </div>

        {/* Subtle Dark Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45"></div>

        {/* Radial Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40"></div>

        {/* Bottom Premium Shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
      </div>

      {/* Content with improved spacing */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <motion.div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Welcome badge with proper spacing */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-lg px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-white/30 shadow-2xl mb-8 md:mb-16"
            >
              <span className="text-sm md:text-base font-bold tracking-wider uppercase text-white">{t.hero.welcome}</span>
            </motion.div>

            {/* Village name with increased top margin to prevent overlap */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-8 leading-tight tracking-tight"
            >
              <span className="inline-block text-white drop-shadow-2xl [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                {t.hero.villageName}
              </span>
            </motion.h2>

            {/* Description with better spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-white/95 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg px-4"
            >
              {settings.village_desc || t.hero.description}
            </motion.p>

            {/* Contact button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white text-base md:text-lg px-10 md:px-12 py-7 md:py-8 h-auto w-full sm:w-auto transition-all duration-300 shadow-2xl hover:shadow-primary/30 font-bold rounded-full border-2 border-orange-400/50"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t.hero.contact} <Phone className="ml-3 w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats section with animated counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t-2 border-white/20 pt-8 md:pt-12"
          >
            {[
              { value: settings.population || "2064", label: t.hero.stats.population, animate: true },
              { value: settings.established_year || "1956", label: t.hero.stats.established, animate: false },
              { value: settings.families || "300", label: t.hero.stats.families, animate: true },
              { value: settings.area || "2411", label: t.hero.stats.area, animate: true },
            ].map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Separate component for animated stat cards
const StatCard = ({ stat, index }: { stat: { value: string; label: string; animate: boolean }; index: number }) => {
  const { count, ref } = useCountUp(
    stat.animate ? parseInt(stat.value.replace(/\D/g, '')) : 0,
    2000
  );

  const displayValue = stat.animate
    ? (stat.value.includes('+') ? `${count.toLocaleString()}+` : count.toLocaleString())
    : stat.value;

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="p-5 md:p-7 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/15 hover:shadow-2xl hover:border-white/30 transition-all duration-300 flex flex-col items-center justify-center gap-2"
    >
      <div className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-none">
        {displayValue}
      </div>
      <div className="text-xs md:text-sm text-white/90 font-semibold uppercase tracking-wide text-center leading-tight mt-1">
        {stat.label}
      </div>
    </motion.div>
  );
};

export default Hero;
