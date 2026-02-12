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

    return (
        <div className="relative bg-gradient-to-r from-orange-50/40 via-white to-green-50/40 py-8 overflow-hidden border-y border-gray-200">
            {/* Subtle tri-color overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/20 via-gray-50/50 to-green-50/20"></div>

            {/* Subtle geometric background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
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
            <div className="absolute top-0 left-0 right-0 h-1 flex shadow-sm">
                <div className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-green-600 to-green-700"></div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-2 border-orange-200/20 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 border-2 border-green-200/20 rounded-full"></div>

            <h2 className="sr-only">Leaders</h2>

            {/* Static centered layout with professional frames */}
            <div className="container mx-auto relative z-10">
                <div className="flex justify-start md:justify-center items-center gap-3 md:gap-4 px-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
                    {leaders.map((leader) => (
                        <motion.div
                            key={leader.id}
                            className="flex flex-col items-center justify-center group flex-shrink-0 first:ml-4 md:first:ml-0 last:mr-4 md:last:mr-0"
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md bg-white group-hover:border-primary/40 group-hover:shadow-xl transition-all duration-300">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Professional overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom tri-color accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 flex shadow-sm">
                <div className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-gradient-to-r from-green-600 to-green-700"></div>
            </div>
        </div>
    );
};

export default LeadersCarousel;
