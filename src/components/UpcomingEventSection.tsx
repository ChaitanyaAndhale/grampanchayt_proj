import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Bell, ChevronLeft, ChevronRight, Volume2, Scroll } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnnouncements } from "@/hooks/useAnnouncements";

// Base64 encoded simple notification bell sound
const NOTIFICATION_SOUND = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Placeholder

const UpcomingEventSection = () => {
    const { t } = useLanguage();
    const { announcements } = useAnnouncements();
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Filter only active announcements and sort by date (nearest first)
    const activeEvents = announcements
        .filter(a => a.is_active)
        .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

    useEffect(() => {
        if (activeEvents.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
        }, 8000); // Auto-rotate every 8 seconds

        return () => clearInterval(interval);
    }, [activeEvents.length]);

    const playSound = () => {
        // Create audio instance if not exists
        if (!audioRef.current) {
            audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audioRef.current.volume = 0.5;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log("Audio play failed interaction required", e));
    };

    const nextSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
    };

    const prevSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length);
    };

    if (activeEvents.length === 0) {
        return (
            <section className="py-6 bg-[#FFFAF0] relative overflow-hidden flex justify-center items-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>
                <div className="relative rounded-lg border border-orange-200 border-dashed p-6 text-center max-w-sm bg-white/50 backdrop-blur-sm">
                    <h3 className="text-base font-bold text-amber-900 font-serif">सध्या कोणतीही घोषणा नाही</h3>
                </div>
            </section>
        );
    }

    const event = activeEvents[currentIndex];
    const eventDate = new Date(event.event_date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });

    return (
        <section className="py-8 relative overflow-hidden bg-[#FFF8E1]">
            {/* Background Texture - Parchment Paper Vibe */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none mix-blend-multiply"></div>

            {/* Traditional Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-700 shadow-sm"></div>

            <div className="container mx-auto px-4 relative z-10 transition-all duration-300">

                {/* Heading */}
                <div className="text-center mb-4 relative">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="h-[1px] w-8 bg-orange-400/60 rounded-full"></div>
                        <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-gradient-to-br from-orange-50 to-white border border-orange-200 text-orange-800 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            {t.upcoming?.badge || "नवीनतम"}
                        </span>
                        <div className="h-[1px] w-8 bg-orange-400/60 rounded-full"></div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-[#5D4037] drop-shadow-sm leading-tight font-serif tracking-tight">
                        {t.upcoming?.title || "आगामी कार्यक्रम"}
                    </h2>
                </div>

                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.98, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={playSound}
                    className="relative max-w-2xl mx-auto bg-[#FFFAF0] rounded-lg overflow-hidden shadow-md border border-[#E0C09F] cursor-pointer group hover:shadow-lg transition-shadow"
                >
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply pointer-events-none"></div>

                    {/* Corner Decorations */}
                    <svg className="absolute top-0 left-0 w-8 h-8 text-orange-300 opacity-60 pointer-events-none z-20" viewBox="0 0 100 100">
                        <path d="M0 0 L100 0 Q50 0 20 20 Q0 50 0 100 Z" fill="currentColor" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-8 h-8 text-orange-300 opacity-60 pointer-events-none z-20 rotate-180" viewBox="0 0 100 100">
                        <path d="M0 0 L100 0 Q50 0 20 20 Q0 50 0 100 Z" fill="currentColor" />
                    </svg>

                    <div className="flex flex-row relative z-10 h-[110px]">

                        {/* Left Side: Date */}
                        <div className="w-[20%] bg-gradient-to-br from-[#D84315] to-[#BF360C] flex flex-col items-center justify-center p-2 text-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>

                            <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-md shadow-inner">
                                <div className="text-3xl font-black font-serif leading-none">
                                    {day}
                                </div>
                                <div className="text-[9px] font-bold text-orange-100 uppercase tracking-widest pt-0.5 border-t border-white/20 mt-0.5">
                                    {month}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="w-[80%] p-4 pl-5 flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                            <div className="flex justify-between items-start mb-1.5">
                                <div className="flex-1 min-w-0 mr-3">
                                    <h3 className="text-lg font-bold text-[#3E2723] group-hover:text-[#BF360C] transition-colors font-serif leading-tight truncate">
                                        {event.title}
                                    </h3>
                                    <span className="inline-block text-[#E65100] text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
                                        {event.type || 'जाहीर सूचना'}
                                    </span>
                                </div>

                                <div className="flex gap-2 shrink-0 items-center">
                                    {activeEvents.length > 1 && (
                                        <div className="hidden sm:flex gap-1 mr-1">
                                            <button onClick={prevSlide} className="w-6 h-6 rounded-full border border-orange-200 flex items-center justify-center text-orange-800 hover:bg-orange-100">
                                                <ChevronLeft className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={nextSlide} className="w-6 h-6 rounded-full border border-orange-200 flex items-center justify-center text-orange-800 hover:bg-orange-100">
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}
                                    <button className="bg-[#BF360C] text-white px-3 py-1.5 rounded shadow hover:shadow-md transition-all flex items-center gap-1.5 text-[11px] font-bold hover:bg-[#D84315]">
                                        <span>{t.upcoming?.cta || "पहा"}</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-[#5D4037] text-xs leading-snug mb-2 line-clamp-2 opacity-90">
                                {event.description}
                            </p>

                            <div className="flex items-center gap-4 text-[11px] text-[#795548] font-medium border-t border-orange-200/50 pt-2 mt-auto">
                                {event.event_time && (
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 text-orange-700" />
                                        <span>{event.event_time}</span>
                                    </div>
                                )}
                                {event.location && (
                                    <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                                        <MapPin className="w-3 h-3 text-orange-700 flex-shrink-0" />
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Navigation Dots */}
                {activeEvents.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
                        {activeEvents.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-[#BF360C] w-4' : 'bg-orange-200 w-1.5'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEventSection;
