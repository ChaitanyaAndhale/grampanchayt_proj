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
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-8 text-center shadow-sm">
                        <Bell className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-amber-900">No Upcoming Events</h3>
                        <p className="text-amber-700 text-sm">Check back later for new announcements.</p>
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
        <section className="py-8 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                <div className="text-center mb-8">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-wider mb-2 border border-orange-200">
                        {t.upcoming?.badge || "नवीनतम"}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-950">
                        {t.upcoming?.title || "आगामी कार्यक्रम आणि घोषणा"}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    onClick={playSound}
                    className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-50 via-white to-orange-50 shadow-xl shadow-orange-900/5 border border-amber-200/60 cursor-pointer group hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                    {/* Golden Shine Effect */}
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] group-hover:bg-[position:200%_0,0_0] transition-[background-position] duration-[1500ms]"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 opacity-80"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-stretch min-h-[140px]">

                        {/* Left Side: Date - Shine Orange */}
                        <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-5 sm:w-32 flex flex-col items-center justify-center text-center shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                            <div className="relative z-10 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 shadow-sm border border-white/20">
                                <Bell className="w-3 h-3" />
                                <span className="uppercase tracking-wide">{t.upcoming?.new || "नवीन"}</span>
                            </div>

                            <div className="relative z-10 text-4xl font-black text-white leading-none tracking-tight shadow-sm">
                                {day}
                            </div>
                            <div className="relative z-10 text-xs font-bold text-orange-100 uppercase tracking-widest mt-1">
                                {month}
                            </div>
                        </div>

                        {/* Right Side: Details - Silent Gold */}
                        <div className="p-5 sm:p-6 flex-grow flex flex-col justify-center">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/50 px-2 py-0.5 rounded border border-amber-200/50">
                                            {event.type || 'Announcement'}
                                        </span>
                                        {event.event_time && (
                                            <div className="flex items-center gap-1 text-[10px] font-medium text-amber-800/60">
                                                <Clock className="w-3 h-3 text-orange-400" />
                                                <span>{event.event_time}</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-amber-950 leading-snug group-hover:text-orange-700 transition-colors">
                                        {event.title}
                                    </h3>
                                </div>

                                <div className="hidden sm:flex gap-1 shrink-0">
                                    {activeEvents.length > 1 && (
                                        <>
                                            <button onClick={prevSlide} className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-orange-50 text-amber-700 border border-amber-200/50 shadow-sm transition-all">
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button onClick={nextSlide} className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-orange-50 text-amber-700 border border-amber-200/50 shadow-sm transition-all">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-amber-900/80 text-sm line-clamp-2 leading-relaxed mb-4 max-w-3xl border-l-2 border-amber-200 pl-3">
                                {event.description}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-amber-100/50 mt-auto">
                                <div className="flex items-center gap-2 text-amber-800/60 text-xs truncate max-w-[60%]">
                                    {event.location && (
                                        <>
                                            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                            <span className="truncate font-medium text-amber-900/70">{event.location}</span>
                                        </>
                                    )}
                                </div>

                                <button className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-lg transition-all border border-orange-200/50 group/btn">
                                    <span>{t.upcoming?.cta || "अधिक माहिती"}</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Navigation Dots */}
                {activeEvents.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
                        {activeEvents.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-orange-500 w-3' : 'bg-amber-200'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEventSection;
