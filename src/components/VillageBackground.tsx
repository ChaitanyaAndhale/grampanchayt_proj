import React from 'react';

const VillageBackground = () => {
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
                    <linearGradient id="village-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture-village" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#village-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture-village)" />

                {/* Hills */}
                <path d="M0,400 Q300,320 600,380 T1200,350 V600 H0 Z" fill="#8B7E74" fillOpacity="0.15" />
                <path d="M0,450 Q400,380 800,420 T1200,400 V600 H0 Z" fill="#8B7E74" fillOpacity="0.1" />

                {/* Fields/farmland lines */}
                <g stroke="#8B7E74" strokeWidth="2" opacity="0.2">
                    <path d="M100,450 Q300,470 500,460" fill="none" />
                    <path d="M150,470 Q350,490 550,480" fill="none" />
                    <path d="M700,420 Q900,440 1100,430" fill="none" />
                </g>

                {/* Simple houses */}
                <g fill="#8B7E74" fillOpacity="0.2" stroke="#8B7E74" strokeWidth="2">
                    <rect x="200" y="400" width="40" height="30" />
                    <path d="M195,400 L220,375 L245,400" fill="none" />

                    <rect x="500" y="410" width="35" height="25" />
                    <path d="M497,410 L517,390 L537,410" fill="none" />

                    <rect x="900" y="395" width="45" height="35" />
                    <path d="M895,395 L922,370 L949,395" fill="none" />
                </g>

                {/* Trees */}
                <g fill="#8B7E74" fillOpacity="0.15">
                    <circle cx="350" cy="420" r="20" />
                    <circle cx="330" cy="410" r="15" />
                    <circle cx="370" cy="415" r="18" />
                    <rect x="345" y="440" width="10" height="30" fillOpacity="0.2" />

                    <circle cx="750" cy="400" r="25" />
                    <circle cx="725" cy="395" r="18" />
                    <circle cx="775" cy="390" r="20" />
                    <rect x="745" y="425" width="10" height="35" fillOpacity="0.2" />
                </g>

                {/* Sun */}
                <circle cx="100" cy="100" r="40" fill="#8B7E74" fillOpacity="0.2" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="#8B7E74" strokeWidth="2" opacity="0.2" />

                {/* Birds */}
                <g stroke="#8B7E74" strokeWidth="2" fill="none" opacity="0.2">
                    <path d="M800,150 Q820,140 840,150" />
                    <path d="M850,130 Q870,120 890,130" />
                    <path d="M750,170 Q770,160 790,170" />
                </g>
            </svg>
        </div>
    );
};

export default VillageBackground;
