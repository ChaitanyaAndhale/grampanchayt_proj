import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Bell, ChevronLeft, ChevronRight, Volume2, Scroll, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";

// Base64 encoded simple notification bell sound
const NOTIFICATION_SOUND = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Placeholder

const UpcomingEventSection = () => {
    const { t } = useLanguage();
    const { announcements } = useAnnouncements();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Filter only active announcements and sort by date (nearest first)
    const activeEvents = announcements
        .filter(a => a.is_active)
        .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

    useEffect(() => {
        if (activeEvents.length <= 1 || isModalOpen) return; // Pause auto-rotate if modal is open

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
        }, 8000); // Auto-rotate every 8 seconds

        return () => clearInterval(interval);
    }, [activeEvents.length, isModalOpen]);

    const playSound = () => {
        // Create audio instance if not exists
        if (!audioRef.current) {
            audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audioRef.current.volume = 0.5;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.warn("Audio play failed interaction required", e));
    };

    const nextSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
    };

    const prevSlide = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length);
    };

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    // Swipe logic
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
            // Swiped Left -> Next
            setCurrentIndex((prev) => (prev + 1) % activeEvents.length);
        } else if (swipe > swipeConfidenceThreshold) {
            // Swiped Right -> Prev
            setCurrentIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length);
        }
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
    const fullMonth = eventDate.toLocaleString('default', { month: 'long' });
    const year = eventDate.getFullYear();

    return (
        <section className="py-8 relative overflow-hidden bg-[#FFF8E1]">
            {/* Background Texture - Parchment Paper Vibe */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none mix-blend-multiply"></div>

            {/* Traditional Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-700 via-yellow-500 to-orange-700 shadow-sm"></div>

            <div className="container mx-auto px-4 relative z-10 transition-all duration-300">

                {/* Heading */}
                <div className="text-center mb-6 relative">
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

                {/* Main Content Area with External Navigation */}
                <div className="flex items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">

                    {/* Previous Button (External) - Desktop */}
                    {activeEvents.length > 1 && (
                        <button
                            onClick={prevSlide}
                            className="hidden md:flex w-10 h-10 rounded-full bg-[#FFFAF0] border border-orange-200 items-center justify-center text-orange-800 shadow-sm hover:bg-orange-100 hover:scale-110 transition-all z-20 group"
                            aria-label="Previous event"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    )}

                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.98, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98, x: -20 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        onClick={playSound}
                        className="relative w-full max-w-2xl bg-[#FFFAF0] rounded-lg overflow-hidden shadow-md border border-[#E0C09F] cursor-pointer group hover:shadow-lg transition-shadow touch-pan-y"
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

                                    <button
                                        onClick={openModal}
                                        className="bg-[#BF360C] text-white px-3 py-1.5 rounded shadow hover:shadow-md transition-all flex items-center gap-1.5 text-[11px] font-bold hover:bg-[#D84315] shrink-0 z-30 relative"
                                    >
                                        <span>{t.upcoming?.cta || "पहा"}</span>
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
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

                    {/* Next Button (External) - Desktop */}
                    {activeEvents.length > 1 && (
                        <button
                            onClick={nextSlide}
                            className="hidden md:flex w-10 h-10 rounded-full bg-[#FFFAF0] border border-orange-200 items-center justify-center text-orange-800 shadow-sm hover:bg-orange-100 hover:scale-110 transition-all z-20 group"
                            aria-label="Next event"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    )}
                </div>

                {/* Mobile Navigation Dots (Keep for mobile as external arrows might take too much width) */}
                {activeEvents.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-4 md:hidden">
                        {activeEvents.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-[#BF360C] w-4' : 'bg-orange-200 w-1.5'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Event Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-md bg-[#FFFAF0] border-orange-200 p-0 overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none mix-blend-multiply"></div>

                    <div className="bg-gradient-to-r from-[#D84315] to-[#BF360C] p-4 text-white relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                        <DialogTitle className="text-xl font-bold font-serif relative z-10 leading-snug pr-8">
                            {event.title}
                        </DialogTitle>
                        <div className="flex items-center gap-2 mt-2 text-orange-100 text-xs font-medium relative z-10">
                            <span className="bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider">{event.type || 'Announcement'}</span>
                        </div>
                        <DialogClose className="absolute right-3 top-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors z-20">
                            <X className="w-5 h-5" />
                        </DialogClose>
                    </div>

                    <div className="p-6 relative z-10">
                        <div className="flex items-center gap-4 mb-6 text-sm text-[#5D4037]">
                            <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <div className="flex flex-col leading-none">
                                    <span className="font-bold">{day} {fullMonth}</span>
                                    <span className="text-[10px] opacity-70">{year}</span>
                                </div>
                            </div>
                            {event.event_time && (
                                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-100">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="font-bold">{event.event_time}</span>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-sm max-w-none text-[#5D4037]">
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        {event.location && (
                            <div className="mt-6 flex items-start gap-2 text-sm text-[#795548] bg-orange-50/50 p-3 rounded-lg border border-orange-100/50">
                                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                                <span>{event.location}</span>
                            </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-orange-100 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-bold rounded-lg hover:bg-orange-200 transition-colors"
                            >
                                {t.common?.close || "बंद करा"}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default UpcomingEventSection;
