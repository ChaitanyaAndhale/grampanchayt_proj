import { motion } from "framer-motion";

const LeadersCarousel = () => {
    // Leader photos - original 4 plus 6 additional leaders
    const leaders = [
        { id: 2, name: "Leader 1", image: "/images/leaders/leader1.jpg" },
        { id: 1, name: "National Emblem", image: "/images/leaders/ashoka.jpg" },
        { id: 3, name: "District Council", image: "/images/leaders/emblem.jpg" },
        { id: 4, name: "Chhatrapati Shivaji Maharaj", image: "/images/leaders/shivaji.jpg" },
        { id: 6, name: "Leader 2", image: "/images/leaders/leader2.jpg" },
        { id: 7, name: "Leader 3", image: "/images/leaders/leader3.jpg" },
        { id: 8, name: "Leader 4", image: "/images/leaders/leader4.jpg" },
        { id: 9, name: "Leader 5", image: "/images/leaders/leader5.jpg" },
        { id: 10, name: "Leader 6", image: "/images/leaders/leader6.jpg" },
        { id: 5, name: "Leader", image: "/images/leaders/leade.jpg" },
    ];

    // Duplicating the list to create a seamless infinite scroll effect
    const extendedLeaders = [...leaders, ...leaders, ...leaders];

    return (
        <div className="relative bg-gradient-to-r from-orange-50/60 via-white to-green-50/60 py-10 overflow-hidden border-y border-gray-200">
            {/* Subtle tri-color overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/20 via-gray-50/50 to-green-50/20 pointer-events-none"></div>

            {/* Subtle geometric background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="professional-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#professional-grid)" />
                </svg>
            </div>

            {/* Tri-color accent bar - Indian flag colors */}
            <div className="absolute top-0 left-0 right-0 h-1 flex shadow-sm pointer-events-none z-20">
                <div className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-green-600 to-green-700"></div>
            </div>

            <h2 className="sr-only">Leaders</h2>

            {/* Marquee Container - Constrained Width on Desktop */}
            <div className="relative w-full max-w-[85rem] mx-auto overflow-hidden z-10">
                {/* Gradient Masks for fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                <motion.div
                    className="flex items-center w-full"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 80,
                            ease: "linear",
                        },
                    }}
                >
                    {extendedLeaders.map((leader, index) => (
                        <div
                            key={`${leader.id}-${index}`}
                            className="relative flex-shrink-0 flex justify-center w-[20%] md:w-[10%] px-1 md:px-2 group"
                        >
                            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white group-hover:border-primary/60 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom tri-color accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 flex shadow-sm pointer-events-none z-20">
                <div className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-green-600 to-green-700"></div>
            </div>
        </div>
    );
};

export default LeadersCarousel;
