import { motion } from "framer-motion";

const MissionVision = () => {
    return (
        <section className="py-2 bg-gradient-to-r from-primary/90 to-primary text-white overflow-hidden border-b-4 border-secondary/50 shadow-md relative z-20">
            <div className="flex whitespace-nowrap">
                <div className="flex animate-marquee min-w-full shrink-0 items-center">
                    <span className="mx-8 text-lg md:text-xl font-bold tracking-wide flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm uppercase text-yellow-300 border border-yellow-300/30">Mission</span>
                        एकतेच्या बळावर हरित विचार, चांगले शिक्षण आणि विकासाच्या मार्गाने गावाला उज्ज्वल भविष्याकडे नेणे.
                    </span>
                    <span className="mx-8 text-2xl text-secondary">✦</span>
                    <span className="mx-8 text-lg md:text-xl font-bold tracking-wide flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm uppercase text-yellow-300 border border-yellow-300/30">Vision</span>
                        परंपरा आणि प्रगती यांचा सुंदर संगम घडवत समृद्ध, स्मार्ट आणि हिरवळ गाव निर्माण करणे.
                    </span>
                    <span className="mx-8 text-2xl text-secondary">✦</span>
                </div>

                {/* Duplicate content for seamless loop */}
                <div className="flex animate-marquee min-w-full shrink-0 items-center" aria-hidden="true">
                    <span className="mx-8 text-lg md:text-xl font-bold tracking-wide flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm uppercase text-yellow-300 border border-yellow-300/30">Mission</span>
                        एकतेच्या बळावर हरित विचार, चांगले शिक्षण आणि विकासाच्या मार्गाने गावाला उज्ज्वल भविष्याकडे नेणे.
                    </span>
                    <span className="mx-8 text-2xl text-secondary">✦</span>
                    <span className="mx-8 text-lg md:text-xl font-bold tracking-wide flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm uppercase text-yellow-300 border border-yellow-300/30">Vision</span>
                        परंपरा आणि प्रगती यांचा सुंदर संगम घडवत समृद्ध, स्मार्ट आणि हिरवळ गाव निर्माण करणे.
                    </span>
                    <span className="mx-8 text-2xl text-secondary">✦</span>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
