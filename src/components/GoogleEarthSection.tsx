import { motion } from "framer-motion";
import { Globe, ArrowRight, MapPin, ExternalLink } from "lucide-react";

const GoogleEarthSection = () => {
    const googleEarthLink = "https://earth.google.com/web/search/Golegaon+Grampanchayat";

    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#0f172a] shadow-2xl transform hover:scale-[1.01] transition-transform duration-500"
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-blue-900/20 z-10"></div>
                        {/* Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '30px 30px'
                            }}>
                        </div>
                        {/* Map Image Background (Right Side) */}
                        <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 lg:p-14 gap-8">

                        {/* Left Content */}
                        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 backdrop-blur-sm mx-auto md:mx-0">
                                <Globe className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                                <span className="text-blue-200 text-[10px] md:text-xs font-bold tracking-widest uppercase">3D Satellite View</span>
                            </div>

                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                See <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Golegaon</span> From Above
                            </h2>

                            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-md mx-auto md:mx-0">
                                Fly through the village streets and landmarks with an immersive 3D Google Earth tour.
                            </p>

                            <div className="pt-2">
                                <motion.a
                                    href={googleEarthLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-blue-50 font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 group"
                                >
                                    <Globe className="w-4 h-4 text-blue-600" />
                                    <span>Start Virtual Tour</span>
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </div>

                        {/* Right Visual (Interactive-looking Card) */}
                        <div className="w-full md:w-auto flex-shrink-0">
                            <motion.a
                                href={googleEarthLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5 }}
                                className="block relative w-full md:w-72 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-600/50 shadow-2xl group"
                            >
                                <div className="absolute inset-0 bg-slate-800">
                                    {/* Placeholder Map Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="absolute -inset-8 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                                            <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg relative z-10" fill="currentColor" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-4">
                                    <div className="w-full flex justify-between items-center backdrop-blur-sm bg-white/10 p-2 rounded-lg border border-white/10">
                                        <span className="text-xs font-medium text-white">Golegaon, MH</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-white opacity-70" />
                                    </div>
                                </div>
                            </motion.a>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};


export default GoogleEarthSection;
