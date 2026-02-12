import React from 'react';

const VideosBackground = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.08]">
            <svg
                className="w-full h-full"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Premium rich white gradient with sketch texture */}
                    <linearGradient id="videos-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture-videos" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#videos-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture-videos)" />

                {/* Video camera */}
                <g fill="#8B7E74" fillOpacity="0.15" stroke="#8B7E74" strokeWidth="3">
                    <rect x="500" y="250" width="120" height="80" rx="5" />
                    <circle cx="560" cy="290" r="25" fill="none" strokeWidth="4" />
                    <path d="M620,270 L680,240 L680,320 L620,290 Z" />

                    {/* Tripod legs */}
                    <line x1="560" y1="330" x2="540" y2="370" strokeWidth="2" />
                    <line x1="560" y1="330" x2="580" y2="370" strokeWidth="2" />
                </g>

                {/* Play buttons */}
                <g fill="#8B7E74" fillOpacity="0.2">
                    <circle cx="200" cy="200" r="35" fillOpacity="0.1" />
                    <path d="M190,185 L190,215 L215,200 Z" />

                    <circle cx="950" cy="350" r="30" fillOpacity="0.1" />
                    <path d="M942,338 L942,362 L964,350 Z" />
                </g>

                {/* Film strip */}
                <g fill="none" stroke="#8B7E74" strokeWidth="2" opacity="0.2">
                    <rect x="100" y="350" width="150" height="100" rx="5" />
                    {[0, 1, 2, 3, 4].map((i) => (
                        <g key={i}>
                            <rect x={105 + i * 30} y="355" width="4" height="8" fill="#8B7E74" fillOpacity="0.15" />
                            <rect x={105 + i * 30} y="437" width="4" height="8" fill="#8B7E74" fillOpacity="0.15" />
                            <line x1={120 + i * 30} y1="350" x2={120 + i * 30} y2="450" />
                        </g>
                    ))}
                </g>

                {/* Soundwaves */}
                <g stroke="#8B7E74" strokeWidth="3" fill="none" opacity="0.2">
                    <path d="M800,150 Q800,130 820,130 T840,150" />
                    <path d="M795,150 Q795,120 820,120 T845,150" />
                    <path d="M790,150 Q790,110 820,110 T850,150" />

                    <path d="M300,450 Q300,430 320,430 T340,450" />
                    <path d="M295,450 Q295,420 320,420 T345,450" />
                </g>

                {/* Clapperboard */}
                <g fill="#8B7E74" fillOpacity="0.15" stroke="#8B7E74" strokeWidth="2">
                    <rect x="900" y="120" width="100" height="80" rx="3" />
                    <g fill="#8B7E74" fillOpacity="0.25">
                        <rect x="900" y="120" width="20" height="20" />
                        <rect x="940" y="120" width="20" height="20" />
                        <rect x="980" y="120" width="20" height="20" />
                    </g>
                    <line x1="900" y1="145" x2="1000" y2="145" strokeWidth="3" />
                </g>

                {/* Screen/monitor frames */}
                <g fill="none" stroke="#8B7E74" strokeWidth="3" opacity="0.15">
                    <rect x="350" y="100" width="120" height="80" rx="5" />
                    <rect x="355" y="105" width="110" height="70" rx="3" />

                    <rect x="750" y="420" width="100" height="70" rx="5" />
                    <rect x="755" y="425" width="90" height="60" rx="3" />
                </g>

                {/* Signal waves */}
                <g stroke="#8B7E74" strokeWidth="2" fill="none" opacity="0.15">
                    {[0, 15, 30].map((offset, i) => (
                        <circle key={i} cx="150" cy="500" r={30 + offset} />
                    ))}
                    {[0, 15, 30].map((offset, i) => (
                        <circle key={`right-${i}`} cx="1050" cy="150" r={25 + offset} />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default VideosBackground;
