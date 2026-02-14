import { motion } from "framer-motion";
import { CheckCircle2, Star, FileText, Globe } from "lucide-react";

const ServicesSection = () => {
    const g2cServices = [
        "जन्म नोंदणी व प्रमाणपत्र",
        "मृत्यू नोंदणी व प्रमाणपत्र",
        "रहिवासी दाखला व प्रमाणपत्र",
        "विवाहाचा दाखला",
        "नोकरी व्यवसायासाठी ना हरकत प्रमाणपत्र",
        "मालमत्ता आकारणी प्रमाणपत्र",
        "मालमत्ता फेरफार प्रमाणपत्र/प्रत",
        "नादेय प्रमाणपत्र",
        "बेरोजगार प्रमाणपत्र",
        "वीज जोडणीसाठी ना हरकत प्रमाणपत्र",
        "कोणत्याही योजनेचा फायदा घेतला नसल्याचे प्रमाणपत्र",
        "शौचालय दाखला",
        "जॉब कार्ड",
        "बांधकामासाठी अनुमती प्रमाणपत्र",
        "चारित्र्याचा दाखला",
        "निराधार योजनेसाठी वयाचा दाखला",
        "दारिद्र्य रेषेखालील प्रमाणपत्र",
        "हयातीचा दाखला"
    ];

    const b2cServices = [
        "रेल्वे / बस आरक्षण",
        "डी.टी.एच. रिचार्ज",
        "बँकींग सेवा",
        "आर्थिक समावेशन",
        "ई-कॉमर्स",
        "पॅनकार्ड",
        "विमा हप्ता भरणे",
        "पासपोर्ट",
        "वीजबिल भरणे",
        "पोस्ट विभागाच्या सेवा इ.",
        "सातबारा उतारा",
        "८ अ",
        "डोमासाईल / नॉनक्रिमिलेअर"
    ];

    return (
        <section id="services" className="py-16 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4"
                    >
                        नागरिक सेवा
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
                    >
                        आमच्या सेवा
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 max-w-2xl mx-auto"
                    >
                        ग्रामपंचायतीमार्फत नागरिकांसाठी उपलब्ध विविध दाखले आणि जनसेवा केंद्रामार्फत मिळणार्या सुविधा.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* G2C Services Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold">ग्रामपंचायत दाखले व कागदपत्रे (G2C)</h3>
                            </div>
                            <p className="text-red-100 text-sm pl-14">गावातील नागरिकांसाठी अत्यावश्यक शासकीय दाखले</p>
                        </div>

                        <div className="p-6 md:p-8">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                {g2cServices.map((service, index) => (
                                    <li key={index} className="flex items-start gap-2.5 text-slate-700 hover:text-red-700 transition-colors group">
                                        <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm md:text-base font-medium">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* B2C Services Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                    >
                        <div className="bg-gradient-to-r from-red-900 to-red-800 p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold">इतर उपयुक्त सेवा (B2C)</h3>
                            </div>
                            <p className="text-red-100 text-sm pl-14">लोकांसाठी उपयोगी व ग्रामपंचायतीशी संबंधित नसलेल्या सेवा</p>
                        </div>

                        <div className="p-6 md:p-8 flex-grow">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                {b2cServices.map((service, index) => (
                                    <li key={index} className="flex items-center gap-2.5 text-slate-700 hover:text-red-900 transition-colors group">
                                        <Star className="w-4 h-4 text-amber-500 shrink-0 group-hover:rotate-45 transition-transform" fill="currentColor" />
                                        <span className="text-sm md:text-base font-medium">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Decorative bottom pattern for B2C card */}
                        <div className="h-2 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 opacity-30"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
