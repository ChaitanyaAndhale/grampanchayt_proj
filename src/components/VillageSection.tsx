import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useGallery } from "@/hooks/useGallery";
import { useSettings } from "@/hooks/useSettings";

const VillageSection = () => {
  const { t } = useLanguage();
  const { images } = useGallery();
  const { settings } = useSettings();

  // Fallback images if none in DB (optional, or just show DB images)
  // For now, we'll use DB images if available, else empty or static fallback if needed.
  // We will just map DB images.

  return (
    <section id="village" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">{t.village.title}</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">{t.village.heritageTitle}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {settings.heritage_desc || t.village.heritageDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">{t.village.communityTitle}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {settings.community_desc || t.village.communityDesc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Village Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {[
            { value: settings.population || "1200+", label: t.village.stats.population, color: "text-secondary" },
            { value: settings.area || "850", label: t.village.stats.area, color: "text-accent" },
            { value: settings.schools || "3", label: t.village.stats.schools, color: "text-primary" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Village Gallery */}
        <div id="gallery">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-primary mb-8 text-center"
          >
            {t.village.galleryTitle}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.length > 0 ? (
              images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <img
                      src={image.url}
                      alt={image.caption || "Gallery Image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-4 text-center">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No images in gallery yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillageSection;
