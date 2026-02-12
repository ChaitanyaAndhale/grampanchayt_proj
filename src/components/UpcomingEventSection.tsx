import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const UpcomingEventSection = () => {
    const { t } = useLanguage();

    // Temporary Hardcoded Data (This would ideally come from Supabase later)
    const event = {
        title: "प्रजासत्ताक दिन सोहळा २०२६", // Republic Day Celebration 2026
        description: "२६ जानेवारी रोजी होणाऱ्या प्रजासत्ताक दिनाच्या ध्वजवंदन सोहळ्यासाठी सर्व ग्रामस्थांनी उपस्थित राहावे. या वेळी विशेष ग्रामसभेचे आयोजन देखील करण्यात आले आहे.",
        date: "26 Jan 2026",
        time: "07:30 AM",
        location: "ग्रामपंचायत कार्यालय, गोळेगाव"
    };

    return (
        <section className="py-8 md:py-12 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 shadow-2xl border border-indigo-500/20"
                >
                    {/* Background Patterns */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '30px 30px'
                            }}>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row">

                        {/* Left Side: Date & visual */}
                        <div className="bg-white/10 backdrop-blur-md p-8 md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 text-center group transition-colors hover:bg-white/15">
                            <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-bounce">
                                <Bell className="w-3 h-3" />
                                <span>{t.upcoming.badge}</span>
                            </div>

                            <div className="text-6xl font-black text-white mb-2 font-mono tracking-tighter">
                                26
                            </div>
                            <div className="text-xl font-bold text-orange-200 uppercase tracking-widest mb-4">
                                January
                            </div>

                            <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium bg-indigo-950/50 px-4 py-2 rounded-lg">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center space-y-6">
                            <div>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    {event.title}
                                </h3>
                                <p className="text-indigo-100 text-base md:text-lg leading-relaxed opacity-90">
                                    {event.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center pt-4 border-t border-white/10">
                                <div className="flex items-center gap-3 text-emerald-300 font-medium">
                                    <div className="p-2 bg-emerald-500/20 rounded-full">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span>{event.location}</span>
                                </div>

                                <div className="sm:ml-auto">
                                    <button className="group flex items-center gap-2 text-white font-semibold bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full transition-all duration-300">
                                        <span>{t.upcoming.cta}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default UpcomingEventSection;
