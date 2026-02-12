import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Bell, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnnouncements } from "@/hooks/useAnnouncements";

// Base64 encoded simple notification bell sound
const NOTIFICATION_SOUND = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Placeholder, will replace with real short base64 or URL

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
            // Using a public URL for a pleasant notification bell since base64 can be long
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
            <section className="py-6 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 p-8 text-center shadow-sm">
                        <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-slate-600">No Upcoming Events</h3>
                        <p className="text-slate-500 text-sm">Check back later for new announcements.</p>
                    </div>
                </div>
            </section>
        );
    }

    const event = activeEvents[currentIndex];
    const eventDate = new Date(event.event_date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });

    return (
        <section className="py-6 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onClick={playSound}
                    className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shadow-xl border border-indigo-500/30 cursor-pointer group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
                >
                    {/* Compact Background Patterns */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-stretch min-h-[140px]">

                        {/* Left Side: Date Compact */}
                        <div className="bg-white/5 backdrop-blur-sm p-4 sm:w-28 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/10 text-center shrink-0">
                            <div className="inline-flex items-center gap-1 bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 shadow-sm animate-pulse">
                                <Bell className="w-2.5 h-2.5" />
                                <span className="uppercase tracking-wide">New</span>
                            </div>

                            <div className="text-3xl font-black text-white leading-none tracking-tighter">
                                {day}
                            </div>
                            <div className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-1">
                                {month}
                            </div>

                            {event.event_time && (
                                <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-300 bg-black/20 px-2 py-0.5 rounded opacity-80">
                                    <Clock className="w-2.5 h-2.5" />
                                    <span>{event.event_time}</span>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Details Compact */}
                        <div className="p-4 sm:p-6 flex-grow flex flex-col justify-center">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
                                            {event.type || 'Announcement'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                                        {event.title}
                                    </h3>
                                </div>

                                <div className="hidden sm:flex gap-1 shrink-0">
                                    {activeEvents.length > 1 && (
                                        <>
                                            <button onClick={prevSlide} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors border border-white/10">
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button onClick={nextSlide} className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors border border-white/10">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-indigo-100/80 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3 max-w-3xl">
                                {event.description}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                                <div className="flex items-center gap-2 text-gray-400 text-xs truncate max-w-[60%]">
                                    {event.location && (
                                        <>
                                            <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                                            <span className="truncate">{event.location}</span>
                                        </>
                                    )}
                                </div>

                                <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95">
                                    <span>Details</span>
                                    <ArrowRight className="w-3 h-3" />
                                </button>
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
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-indigo-600 w-3' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEventSection;
