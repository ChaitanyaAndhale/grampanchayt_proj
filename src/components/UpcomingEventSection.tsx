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
            <section className="py-12 bg-[#FFFAF0] relative overflow-hidden flex justify-center items-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>
                <div className="relative rounded-xl border-2 border-orange-200 border-dashed p-8 text-center max-w-md bg-white/50 backdrop-blur-sm">
                    <Scroll className="w-10 h-10 text-orange-400 mx-auto mb-3 opacity-50" />
                    <h3 className="text-xl font-bold text-amber-900 font-serif">सध्या कोणतीही घोषणा नाही</h3>
                    <p className="text-amber-800/70 text-sm mt-1">नवीन अपडेट्ससाठी नंतर तपासा.</p>
                </div>
            </section>
        );
    }

    const event = activeEvents[currentIndex];
    const eventDate = new Date(event.event_date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });

    return (
        <section className="py-16 relative overflow-hidden bg-[#FFF8E1]">
            {/* Background Texture - Parchment Paper Vibe */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none mix-blend-multiply"></div>

            {/* Traditional Decorative Top Border (Toran Style Gradient) */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-700 shadow-md"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Heading with Traditional 'Davandi' Sketch Vibe */}
                <div className="text-center mb-12 relative">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        {/* Decorative Line Left */}
                        <div className="h-[2px] w-12 md:w-32 bg-gradient-to-l from-orange-600 to-transparent rounded-full opacity-60"></div>

                        <div className="relative group cursor-default">
                            <div className="absolute -inset-2 bg-orange-100 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
                            <span className="relative inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-gradient-to-br from-orange-50 to-white border border-orange-200 text-orange-800 text-xs font-bold tracking-widest uppercase shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                {t.upcoming?.badge || "नवीनतम घोषणा"}
                            </span>
                        </div>

                        {/* Decorative Line Right */}
                        <div className="h-[2px] w-12 md:w-32 bg-gradient-to-r from-orange-600 to-transparent rounded-full opacity-60"></div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-[#5D4037] drop-shadow-sm leading-tight font-serif tracking-tight">
                        {t.upcoming?.title || "आगामी कार्यक्रम"}
                    </h2>

                    {/* Decorative Paint Brush Underline */}
                    <div className="relative w-64 h-3 mx-auto mt-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 rounded-full opacity-90" style={{ clipPath: 'polygon(0 45%, 100% 45%, 98% 100%, 2% 100%)' }}></div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45 rounded-sm"></div>
                    </div>
                </div>

                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onClick={playSound}
                    className="relative max-w-5xl mx-auto bg-[#FFFAF0] rounded-lg overflow-hidden shadow-[0_20px_60px_-15px_rgba(124,45,18,0.15)] border border-[#E0C09F] cursor-pointer group"
                >
                    {/* Paper Texture Overlay on Card */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply pointer-events-none"></div>

                    {/* Corner Decorations (Mandala style corners) */}
                    <svg className="absolute top-0 left-0 w-24 h-24 text-orange-300 opacity-60 pointer-events-none z-20" viewBox="0 0 100 100">
                        <path d="M0 0 L100 0 Q50 0 20 20 Q0 50 0 100 Z" fill="currentColor" />
                        <path d="M5 5 L90 5 Q45 5 20 25 Q5 50 5 90 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-24 h-24 text-orange-300 opacity-60 pointer-events-none z-20 rotate-180" viewBox="0 0 100 100">
                        <path d="M0 0 L100 0 Q50 0 20 20 Q0 50 0 100 Z" fill="currentColor" />
                        <path d="M5 5 L90 5 Q45 5 20 25 Q5 50 5 90 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    </svg>

                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row relative z-10">

                        {/* Left Side: Date & Sketch Illustration */}
                        <div className="md:w-[35%] bg-gradient-to-br from-[#D84315] to-[#BF360C] relative overflow-hidden flex flex-col items-center justify-center p-8 text-center text-white isolate">
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>
                            {/* Mandala Background Pattern */}
                            <div className="absolute -right-16 -bottom-16 w-64 h-64 border-[30px] border-white/5 rounded-full z-0"></div>
                            <div className="absolute -left-16 -top-16 w-48 h-48 border-[20px] border-white/5 rounded-full z-0"></div>

                            {/* Davandi / Drum Icon (Sketch Style) */}
                            <div className="mb-6 relative z-10 group-hover:rotate-12 transition-transform duration-500 ease-out">
                                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
                                {/* Custom Davandi Icon Composition */}
                                <div className="relative w-20 h-20 flex items-center justify-center">
                                    <Volume2 className="w-16 h-16 text-[#FFD54F] drop-shadow-[2px_4px_6px_rgba(0,0,0,0.3)]" strokeWidth={1.5} />
                                    {/* Sketch marks */}
                                    <svg className="absolute inset-0 w-full h-full text-white/40 rotate-12" viewBox="0 0 100 100">
                                        <path d="M10,50 Q50,10 90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                                        <path d="M10,50 Q50,90 90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-inner w-full max-w-[180px]">
                                <div className="text-6xl font-black tracking-tighter drop-shadow-lg font-serif">
                                    {day}
                                </div>
                                <div className="text-sm font-bold text-orange-100 uppercase tracking-[0.2em] border-t border-white/20 pt-2 mt-1">
                                    {month}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="md:w-[65%] p-8 md:p-10 flex flex-col justify-center relative">
                            {/* Decorative Brush Stroke Bg */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="mb-5">
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <span className="inline-flex items-center px-3 py-1 bg-[#FFF3E0] text-[#E65100] text-xs font-bold uppercase tracking-wider rounded border border-orange-200">
                                        <Bell className="w-3 h-3 mr-1.5" />
                                        {event.type || 'जाहीर सूचना'}
                                    </span>

                                    {/* Desktop Nav Arrows */}
                                    {activeEvents.length > 1 && (
                                        <div className="hidden md:flex gap-2">
                                            <button onClick={prevSlide} className="w-8 h-8 rounded-full border border-orange-200 flex items-center justify-center text-orange-800 hover:bg-orange-100 transition-colors">
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button onClick={nextSlide} className="w-8 h-8 rounded-full border border-orange-200 flex items-center justify-center text-orange-800 hover:bg-orange-100 transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-2xl md:text-4xl font-black text-[#3E2723] group-hover:text-[#BF360C] transition-colors leading-tight font-serif">
                                    {event.title}
                                </h3>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-orange-200 via-orange-300 to-transparent mb-5"></div>

                            <p className="text-[#5D4037] text-base md:text-lg leading-relaxed mb-8 font-medium line-clamp-3">
                                {event.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-auto">
                                <div className="flex flex-col gap-2 text-sm text-[#795548] font-medium w-full sm:w-auto">
                                    {event.event_time && (
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <Clock className="w-4 h-4 text-orange-700" />
                                            </div>
                                            <span>{event.event_time}</span>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <MapPin className="w-4 h-4 text-orange-700" />
                                            </div>
                                            <span className="truncate max-w-[200px]">{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <button className="w-full sm:w-auto relative overflow-hidden bg-[#BF360C] text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all group/btn flex items-center justify-center gap-2 font-bold tracking-wide text-sm border-b-4 border-[#870000] active:translate-y-0.5 active:border-b-0 hover:bg-[#D84315]">
                                    <span className="relative z-10">{t.upcoming?.cta || "सविस्तर माहिती"}</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Navigation Dots */}
                {activeEvents.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8 md:hidden">
                        {activeEvents.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#BF360C] w-8' : 'bg-orange-200 w-2'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEventSection;
