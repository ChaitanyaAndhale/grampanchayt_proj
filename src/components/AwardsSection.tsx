import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Trophy, Medal, Star, Calendar, MapPin, ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AwardsBackground from "./AwardsBackground";

interface AwardItem {
    id: string;
    title_mr: string;
    title_en: string;
    description_mr: string;
    description_en: string;
    year: string;
    award_date?: string;
    organization_mr: string;
    organization_en: string;
    image_url?: string;
    icon_name?: string;
    display_order: number;
    is_active: boolean;
}

const AwardsSection = () => {
    const { t, language } = useLanguage();
    const [awards, setAwards] = useState<AwardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const { data, error } = await supabase
                .from('awards')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (error) throw error;
            setAwards(data || []);
        } catch (error) {
            console.error('Error fetching awards:', error);
        } finally {
            setLoading(false);
        }
    };

    const iconMap: { [key: string]: any } = {
        Award,
        Trophy,
        Medal,
        Star
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return language === 'mr'
            ? date.toLocaleDateString('mr-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            : date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Color schemes for awards
    const awardColors = [
        {
            bg: "bg-gradient-to-br from-amber-50 via-yellow-100/50 to-white",
            border: "border-amber-200",
            icon: "bg-gradient-to-br from-amber-500 to-yellow-600",
            hover: "group-hover:border-amber-400 group-hover:shadow-amber-200/50",
            text: "text-amber-700"
        },
        {
            bg: "bg-gradient-to-br from-orange-50 via-orange-100/50 to-white",
            border: "border-orange-200",
            icon: "bg-gradient-to-br from-orange-500 to-orange-600",
            hover: "group-hover:border-orange-400 group-hover:shadow-orange-200/50",
            text: "text-orange-700"
        }
    ];

    if (loading) {
        return (
            <section id="awards" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center text-muted-foreground">Loading...</div>
                </div>
            </section>
        );
    }

    if (awards.length === 0) {
        return null;
    }

    return (
        <section id="awards" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
            <AwardsBackground />
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-6"
                    >
                        <Trophy className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-semibold text-gray-700">{t.awards?.badge}</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-6 leading-relaxed px-4 py-2">
                        {t.awards?.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t.awards?.description}
                    </p>
                </motion.div>

                {/* Awards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {awards.map((award, index) => {
                        const colorScheme = awardColors[index % 2];
                        const IconComponent = award.icon_name ? iconMap[award.icon_name] || Trophy : Trophy;
                        const title = language === 'mr' ? award.title_mr : award.title_en;
                        const description = language === 'mr' ? award.description_mr : award.description_en;
                        const organization = language === 'mr' ? award.organization_mr : award.organization_en;
                        const formattedDate = formatDate(award.award_date);

                        return (
                            <motion.div
                                key={award.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className={`h-full ${colorScheme.bg} ${colorScheme.border} border-2 shadow-lg hover:shadow-2xl ${colorScheme.hover} transition-all duration-300 group overflow-hidden relative flex flex-col`}>
                                    {/* Award Image */}
                                    {award.image_url && (
                                        <div className="relative h-48 md:h-56 overflow-hidden">
                                            <img
                                                src={award.image_url}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onClick={() => setSelectedImage(award.image_url!)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                            {/* Icon overlay on image */}
                                            <div className="absolute top-4 left-4">
                                                <motion.div
                                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`w-12 h-12 ${colorScheme.icon} rounded-xl flex items-center justify-center shadow-lg`}
                                                >
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </motion.div>
                                            </div>

                                            {/* Year badge on image */}
                                            {award.year && (
                                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-600" />
                                                    <span className="text-xs font-bold text-gray-700">{award.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <CardContent className="p-6 md:p-8 relative z-10 flex-1 flex flex-col">
                                        {/* No image case - show icon and year at top */}
                                        {!award.image_url && (
                                            <>
                                                {/* Decorative corner accent */}
                                                <div className={`absolute top-0 right-0 w-24 h-24 ${colorScheme.icon} opacity-10 rounded-bl-full transition-all duration-300 group-hover:w-32 group-hover:h-32`}></div>

                                                <div className="flex items-start justify-between mb-5">
                                                    <motion.div
                                                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                                        transition={{ duration: 0.5 }}
                                                        className={`w-14 h-14 md:w-16 md:h-16 ${colorScheme.icon} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                                    >
                                                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                                    </motion.div>

                                                    {award.year && (
                                                        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                                                            <Calendar className="w-3 h-3 text-gray-600" />
                                                            <span className="text-xs font-semibold text-gray-700">{award.year}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Title */}
                                        <h3 className={`text-xl md:text-2xl font-bold mb-3 ${colorScheme.text} group-hover:text-opacity-80 transition-all duration-300 leading-tight ${award.image_url ? 'mt-0' : ''}`}>
                                            {title}
                                        </h3>

                                        {/* Date (if award_date is available) */}
                                        {formattedDate && (
                                            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                <span className="font-medium">{formattedDate}</span>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 flex-1">
                                            {description}
                                        </p>

                                        {/* Organization */}
                                        {organization && (
                                            <div className="flex items-start gap-2 pt-4 border-t border-gray-200/50 mt-auto">
                                                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs md:text-sm text-gray-500 font-medium">
                                                    {organization}
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Image Lightbox */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        src={selectedImage}
                        alt="Award"
                        className="max-w-4xl max-h-[85vh] w-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors"
                    >
                        <span className="text-2xl">×</span>
                    </button>
                </motion.div>
            )}
        </section>
    );
};

export default AwardsSection;
