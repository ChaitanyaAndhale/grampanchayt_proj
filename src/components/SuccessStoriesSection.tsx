import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { ChevronRight, Sparkles, Heart, Building2, Home, Users, TrendingUp, Award, Shield, Leaf, GraduationCap, Tractor } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SuccessBackground from "./SuccessBackground";

const SuccessStoriesSection = () => {
    const { t, language } = useLanguage();
    const { stories, loading } = useSuccessStories();
    const [selectedStory, setSelectedStory] = useState<any>(null);

    // Simplified 2-color scheme - Orange and Green only
    const categoryColors = [
        {
            bg: "bg-gradient-to-br from-orange-50 via-orange-100/50 to-white",
            border: "border-orange-200",
            icon: "bg-gradient-to-br from-orange-500 to-orange-600",
            hover: "group-hover:border-orange-400 group-hover:shadow-orange-200/50",
            text: "text-orange-700"
        },
        {
            bg: "bg-gradient-to-br from-green-50 via-green-100/50 to-white",
            border: "border-green-200",
            icon: "bg-gradient-to-br from-green-500 to-green-600",
            hover: "group-hover:border-green-400 group-hover:shadow-green-200/50",
            text: "text-green-700"
        }
    ];

    const iconMap: { [key: string]: any } = {
        Sparkles,
        Heart,
        Building2,
        Home,
        Users,
        TrendingUp,
        Award,
        Shield,
        Leaf,
        GraduationCap,
        Tractor
    };

    if (loading) {
        return (
            <section id="success-stories" className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center text-muted-foreground">Loading...</div>
                </div>
            </section>
        );
    }

    if (!stories || stories.length === 0) {
        return null;
    }

    return (
        <>
            <section id="success-stories" className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
                <SuccessBackground />
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
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-semibold text-gray-700">{t.successStories?.badge}</span>
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-orange-600 to-secondary bg-clip-text text-transparent mb-6 leading-relaxed px-4 py-2">
                            {t.successStories?.title}
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t.successStories?.description}
                        </p>
                    </motion.div>

                    {/* Success Stories Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {stories.map((story, index) => {
                            // Alternate between orange and green only
                            const colorScheme = categoryColors[index % 2];
                            const IconComponent = story.icon ? iconMap[story.icon] || Sparkles : Sparkles;
                            const title = language === 'mr' ? story.title_mr : story.title_en;
                            const content = language === 'mr' ? story.content_mr : story.content_en;

                            return (
                                <motion.div
                                    key={story.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Card
                                        className={`h-full ${colorScheme.bg} ${colorScheme.border} border-2 shadow-lg hover:shadow-2xl ${colorScheme.hover} transition-all duration-300 group cursor-pointer overflow-hidden relative`}
                                        onClick={() => setSelectedStory(story)}
                                    >
                                        {/* Decorative corner accent */}
                                        <div className={`absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 ${colorScheme.icon} opacity-10 rounded-bl-full transition-all duration-300 group-hover:w-32 group-hover:h-32`}></div>

                                        <CardContent className="p-3 md:p-8 relative z-10 flex flex-col h-full">
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                className={`w-10 h-10 md:w-16 md:h-16 ${colorScheme.icon} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-5 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                            >
                                                <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-white" />
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className={`text-sm md:text-2xl font-bold mb-1 md:mb-4 ${colorScheme.text} group-hover:text-opacity-80 transition-all duration-300 leading-tight line-clamp-3 md:line-clamp-2`}>
                                                {title}
                                            </h3>

                                            {/* Description - increased visibility */}
                                            <p className="text-gray-600 text-xs md:text-base leading-relaxed mb-3 md:mb-6 line-clamp-3 md:line-clamp-5 flex-grow">
                                                {content}
                                            </p>

                                            {/* Read More Link */}
                                            <div className={`flex items-center gap-1 md:gap-2 font-semibold ${colorScheme.text} group-hover:gap-3 transition-all duration-300 mt-auto`}>
                                                <span className="text-xs md:text-base">{t.successStories?.readMore}</span>
                                                <ChevronRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Full Content Dialog */}
            <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
                <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    {selectedStory && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`flex-shrink-0 ${categoryColors[stories.indexOf(selectedStory) % 2].icon} p-3 rounded-2xl`}>
                                        {(() => {
                                            const IconComponent = selectedStory.icon ? iconMap[selectedStory.icon] || Sparkles : Sparkles;
                                            return <IconComponent className="w-8 h-8 text-white" />;
                                        })()}
                                    </div>
                                    <div className="flex-1">
                                        <DialogTitle className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                            {language === 'mr' ? selectedStory.title_mr : selectedStory.title_en}
                                        </DialogTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedStory(null)}
                                        className="rounded-full"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </DialogHeader>

                            {/* Full text - all content readable */}
                            <div className="prose prose-sm md:prose-base max-w-none mt-6">
                                <p className="text-base md:text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                                    {language === 'mr' ? selectedStory.content_mr : selectedStory.content_en}
                                </p>
                            </div>

                            {/* Close button */}
                            <div className="flex gap-3 pt-6 border-t mt-6">
                                <Button
                                    onClick={() => setSelectedStory(null)}
                                    className="flex-1"
                                    size="lg"
                                >
                                    {language === 'mr' ? 'बंद करा' : 'Close'}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SuccessStoriesSection;
