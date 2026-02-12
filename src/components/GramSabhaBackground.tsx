import React from 'react';

const GramSabhaBackground = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.08]">
            <svg
                className="w-full h-full"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="sketch-blur">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                    </filter>
                    {/* Premium rich white gradient with sketch texture */}
                    <linearGradient id="gramsabha-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture-gramsabha" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                {/* Sky / Background */}
                <rect width="100%" height="100%" fill="url(#gramsabha-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture-gramsabha)" />

                {/* Distant Hills - Sketch Style */}
                <path
                    d="M0,400 Q300,350 600,420 T1200,380 V600 H0 Z"
                    fill="#E8E6E3"
                    stroke="#C4BCB5"
                    strokeWidth="1"
                />

                {/* Village Elements */}
                <g filter="url(#sketch-blur)">
                    {/* Tree Trunk */}
                    <path
                        d="M200,600 Q220,400 180,300 Q250,400 280,600 Z"
                        fill="#D5CDC7"
                        stroke="#8B7E74"
                        strokeWidth="2"
                    />
                    {/* Tree Canopy - stylized cloud-like shapes */}
                    <circle cx="150" cy="280" r="60" fill="#E0D9D3" stroke="#A89C92" strokeWidth="2" opacity="0.4" />
                    <circle cx="250" cy="250" r="70" fill="#E0D9D3" stroke="#A89C92" strokeWidth="2" opacity="0.4" />
                    <circle cx="220" cy="320" r="50" fill="#E0D9D3" stroke="#A89C92" strokeWidth="2" opacity="0.4" />

                    {/* Simple Houses in background */}
                    <path d="M800,450 L850,400 L900,450 V500 H800 Z" fill="none" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M920,440 L960,400 L1000,440 V490 H920 Z" fill="none" stroke="#8B7E74" strokeWidth="2" />

                    {/* People/Crowd suggestion (abstract circles/shapes) representing Gram Sabha */}
                    <g transform="translate(400, 480)" opacity="0.35">
                        <circle cx="0" cy="0" r="10" fill="#C4BCB5" />
                        <circle cx="30" cy="10" r="10" fill="#C4BCB5" />
                        <circle cx="60" cy="-5" r="10" fill="#C4BCB5" />
                        <circle cx="90" cy="15" r="10" fill="#C4BCB5" />
                        <circle cx="15" cy="25" r="10" fill="#C4BCB5" />
                        <circle cx="45" cy="30" r="10" fill="#C4BCB5" />
                        <path d="M-20,0 Q50,-20 120,0" fill="none" stroke="#8B7E74" strokeWidth="1" />
                    </g>
                </g>

                {/* Ground */}
                <path d="M0,500 Q600,480 1200,520 V600 H0 Z" fill="#EFEBE8" opacity="0.35" />
            </svg>
        </div>
    );
};

export default GramSabhaBackground;
