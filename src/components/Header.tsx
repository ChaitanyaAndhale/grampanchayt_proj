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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.nav.home, href: "#home" },
    { name: t.header.nav.about, href: "#village" },
    { name: t.header.nav.services, href: "#gram-sabha" },
    { name: t.header.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-lg md:text-xl font-bold text-white">GP</span>
                </div>
              )}
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                  {t.header.title}
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
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
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === "en" ? "मराठी" : "English"}</span>
              </button>

              <button
                onClick={handleAdminClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Admin</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full bg-gray-100 text-gray-700"
              >
                <span className="text-sm font-bold">{language === "en" ? "म" : "En"}</span>
              </button>
              <button
                onClick={handleAdminClick}
                className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white"
                title="Admin Login"
              >
                <Lock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-primary"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
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
