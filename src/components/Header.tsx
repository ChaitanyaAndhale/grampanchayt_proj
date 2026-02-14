import React, { useState, useEffect } from "react";
import { Globe, Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/hooks/useSettings";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAdminClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.nav.home, href: "#home" },
    { name: t.header.nav.about, href: "#village" },
    { name: t.header.nav.services, href: "#services" },
    { name: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
          }`}
      >
        {/* Top Bar */}
        <div className={`bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ${isScrolled ? "h-1" : "h-8"
          } flex items-center justify-center overflow-hidden`}>
          {!isScrolled && (
            <div className="container mx-auto text-center text-xs md:text-sm text-white font-semibold animate-fade-in">
              {t.header.govTitle}
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 mt-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              {settings.gram_panchayat_logo ? (
                <img
                  src={settings.gram_panchayat_logo}
                  alt="Logo"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500"
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary via-orange-500 to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  <span className="text-lg md:text-xl font-bold text-white relative z-10">GP</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-all duration-300 gradient-text">
                  {t.header.title}
                </h1>
                <p className="text-[10px] md:text-xs text-muted-foreground font-medium tracking-wide">
                  {t.header.subtitle}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-secondary hover:after:w-full after:transition-all after:duration-500 tracking-wide"
                >
                  {link.name}
                </a>
              ))}

              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-primary hover:to-secondary hover:text-white transition-all duration-500 border border-gray-200 hover:border-transparent relative overflow-hidden group shadow-sm hover:shadow-premium"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: language === "en" ? 0 : 180 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <Globe className="w-4 h-4" />
                </motion.div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm font-semibold"
                  >
                    {language === "en" ? "मराठी" : "English"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <button
                onClick={handleAdminClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary via-orange-500 to-secondary text-white hover:shadow-premium transition-all duration-500 hover:scale-105 hover:brightness-110 font-semibold shadow-lg"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm">Admin</span>
              </button>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={toggleLanguage}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-700 border border-gray-200 shadow-sm active:bg-gray-100"
              >
                <span className="text-[10px] font-bold leading-none">
                  {language === "en" ? "म" : "En"}
                </span>
              </motion.button>

              <button
                onClick={handleAdminClick}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-md active:shadow-sm active:scale-95 transition-all"
                title="Admin Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-8 h-8 text-primary active:scale-95 transition-transform"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium text-gray-800 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
