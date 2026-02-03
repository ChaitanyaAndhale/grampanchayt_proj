import { ArrowRight, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/hooks/useSettings";

const Hero = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1623152672566-50a80e607418?q=80&w=2070&auto=format&fit=crop"
          alt="Village Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-secondary">{t.hero.welcome}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              {t.hero.villageName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 h-auto w-full sm:w-auto transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.hero.contact} <Phone className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-white/20 pt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{settings.population || "1200+"}</div>
              <div className="text-sm text-white/70">{t.hero.stats.population}</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{settings.established_year || "1956"}</div>
              <div className="text-sm text-white/70">{t.hero.stats.established}</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{settings.area || "850"}</div>
              <div className="text-sm text-white/70">{t.hero.stats.area}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-16 md:h-24 fill-background">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
