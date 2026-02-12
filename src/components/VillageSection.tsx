import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/hooks/useSettings";
import { useGallery } from "@/hooks/useGallery";
import { Users, MapPin, School, TrendingUp, Home, Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import VillageBackground from "./VillageBackground";

const VillageSection = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { images } = useGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const stats = [
    { icon: Users, label: t.village.stats.families, value: settings.families || "300+", color: "text-orange-600", bg: "bg-orange-100" },
    { icon: MapPin, label: t.village.stats.area, value: settings.area ? `${settings.area} ${t.village.stats.area.toLowerCase().includes('acre') ? '' : 'Acres'}` : "850 Acres", color: "text-green-600", bg: "bg-green-100" },
    { icon: Home, label: t.village.stats.population, value: settings.population || "1200+", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: School, label: t.village.stats.schools, value: "3", color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const nextImage = () => {
    if (selectedImage !== null && images.length > 0) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && images.length > 0) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedImage, images.length]);

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      <VillageBackground />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-orange-600 to-secondary bg-clip-text text-transparent mb-6 leading-relaxed px-4 py-2">
            {t.village.title}
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Heritage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-orange-50/30 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{t.village.heritageTitle}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {t.village.heritageDesc}
              </p>
            </Card>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-green-50/30 border-l-4 border-l-secondary">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary">{t.village.communityTitle}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {t.village.communityDesc}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} opacity-20 rounded-bl-full transition-all duration-300 group-hover:w-20 group-hover:h-20`}></div>
                <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-2 relative z-10`}>
                  <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground mb-0.5 relative z-10">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium relative z-10">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Section - Enhanced */}
        <div id="gallery" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-full mb-4">
              <ImageIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-700">{t.village.galleryTitle}</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              {t.village.galleryTitle}
            </h3>

            {/* View Mode Toggles */}
            {images.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${viewMode === 'grid'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span>Grid View</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('masonry')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${viewMode === 'masonry'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Masonry View</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          {images.length > 0 ? (
            <div className={viewMode === 'grid'
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              : "columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
            }>
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group cursor-pointer relative ${viewMode === 'masonry' ? 'break-inside-avoid mb-4 md:mb-6' : ''}`}
                  onClick={() => openLightbox(index)}
                >
                  {/* Photo Card with Creative Frame */}
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-4 border-white">
                    {/* Decorative Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Photo Number Badge */}
                    <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {String(index + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
                    </div>

                    {/* Image Container */}
                    <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : ''} overflow-hidden bg-gray-100`}>
                      <img
                        src={image.url}
                        alt={image.caption || "Gallery Image"}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/30 backdrop-blur-md rounded-full p-4 border-2 border-white/50"
                          >
                            <ZoomIn className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Creative Caption - Always Visible */}
                    <div className="relative p-4 bg-gradient-to-r from-orange-50 to-green-50">
                      {/* Decorative Line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                      {image.caption ? (
                        <div className="space-y-1">
                          <p className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 leading-snug">
                            {image.caption}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <ImageIcon className="w-3 h-3" />
                            <span>गाव चित्र</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm italic">गावाचे छान दृश्य</span>
                        </div>
                      )}
                    </div>

                    {/* Decorative Film Strip Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-secondary to-primary opacity-50" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-secondary to-primary opacity-50" />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl border-2 border-dashed border-gray-300">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">No images in gallery yet.</p>
              <p className="text-sm text-gray-500 mt-2">Images will appear here once uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage !== null && images[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Top Bar with Info */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="container mx-auto flex items-center justify-between">
                {/* Enhanced Photo Counter */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-2xl shadow-lg">
                    <span className="text-2xl font-bold">
                      {String(selectedImage + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/70 mx-2">/</span>
                    <span className="text-lg font-medium text-white/90">
                      {String(images.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white/80 text-sm">
                    <ImageIcon className="w-4 h-4" />
                    <span>गाव गॅलरी</span>
                  </div>
                </motion.div>

                {/* Keyboard Hints */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white/70 text-xs"
                >
                  <kbd className="px-2 py-1 bg-white/20 rounded">←</kbd>
                  <kbd className="px-2 py-1 bg-white/20 rounded">→</kbd>
                  <span>Navigate</span>
                  <span className="mx-2">•</span>
                  <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd>
                  <span>Close</span>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeLightbox}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 border border-white/20"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary backdrop-blur-md text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 border-2 border-white/20 shadow-lg group"
                >
                  <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </motion.button>
                <motion.button
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary backdrop-blur-md text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 border-2 border-white/20 shadow-lg group"
                >
                  <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </motion.button>
              </>
            )}

            {/* Main Image with Enhanced Caption */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Frame */}
              <div className="relative bg-white p-2 md:p-4 rounded-2xl shadow-2xl">
                <img
                  src={images[selectedImage].url}
                  alt={images[selectedImage].caption || "Gallery Image"}
                  className="w-full h-full object-contain rounded-lg max-h-[70vh]"
                />
              </div>

              {/* Creative Caption Section */}
              {images[selectedImage].caption && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">Photo Caption</span>
                      </div>
                      <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed">
                        {images[selectedImage].caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Decorative Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VillageSection;
