import React from 'react';

const AwardsBackground = () => {
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
                    <linearGradient id="awards-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#awards-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture)" />

                {/* Main trophy */}
                <g fill="#8B7E74" fillOpacity="0.15" stroke="#8B7E74" strokeWidth="3">
                    <circle cx="600" cy="180" r="40" />
                    <path d="M560,180 L550,240 L650,240 L640,180" />
                    <rect x="580" y="240" width="40" height="80" />
                    <rect x="560" y="320" width="80" height="20" rx="4" />

                    {/* Handles */}
                    <path d="M560,180 Q530,180 530,210 L540,220" fill="none" />
                    <path d="M640,180 Q670,180 670,210 L660,220" fill="none" />
                </g>

                {/* Medals */}
                <g fill="none" stroke="#8B7E74" strokeWidth="2" opacity="0.25">
                    {/* Left medal */}
                    <circle cx="200" cy="250" r="30" fill="#8B7E74" fillOpacity="0.1" />
                    <circle cx="200" cy="250" r="20" />
                    <path d="M185,210 L195,230 M215,210 L205,230" strokeWidth="3" />
                    <text x="200" y="257" textAnchor="middle" fill="#8B7E74" fontSize="16" fontWeight="bold">1</text>

                    {/* Right medal */}
                    <circle cx="1000" cy="300" r="30" fill="#8B7E74" fillOpacity="0.1" />
                    <circle cx="1000" cy="300" r="20" />
                    <path d="M985,260 L995,280 M1015,260 L1005,280" strokeWidth="3" />
                    <text x="1000" y="307" textAnchor="middle" fill="#8B7E74" fontSize="16" fontWeight="bold">2</text>
                </g>

                {/* Laurel wreaths */}
                <g stroke="#8B7E74" strokeWidth="2" fill="none" opacity="0.20">
                    <path d="M350,150 Q340,130 330,150 Q340,140 350,150" />
                    <path d="M340,160 Q330,140 320,160 Q330,150 340,160" />
                    <path d="M330,170 Q320,150 310,170 Q320,160 330,170" />

                    <path d="M850,150 Q860,130 870,150 Q860,140 850,150" />
                    <path d="M860,160 Q870,140 880,160 Q870,150 860,160" />
                    <path d="M870,170 Q880,150 890,170 Q880,160 870,170" />
                </g>

                {/* Ribbons */}
                <g fill="#8B7E74" fillOpacity="0.12" stroke="#8B7E74" strokeWidth="1">
                    <path d="M100,400 L130,380 L140,420 L110,440 Z" />
                    <path d="M900,450 L930,430 L940,470 L910,490 Z" />
                </g>

                {/* Stars of excellence */}
                <g fill="#8B7E74" fillOpacity="0.18">
                    {[
                        { x: 450, y: 100 },
                        { x: 750, y: 120 },
                        { x: 300, y: 350 },
                        { x: 950, y: 200 },
                        { x: 150, y: 180 }
                    ].map((pos, i) => (
                        <path
                            key={i}
                            d={`M${pos.x},${pos.y - 12} L${pos.x + 3.5},${pos.y - 3} L${pos.x + 12},${pos.y} L${pos.x + 3.5},${pos.y + 3} L${pos.x},${pos.y + 12} L${pos.x - 3.5},${pos.y + 3} L${pos.x - 12},${pos.y} L${pos.x - 3.5},${pos.y - 3} Z`}
                        />
                    ))}
                </g>

                {/* Podium */}
                <g fill="#8B7E74" fillOpacity="0.1" stroke="#8B7E74" strokeWidth="2" opacity="0.2">
                    <rect x="480" y="450" width="80" height="100" />
                    <rect x="570" y="400" width="80" height="150" />
                    <rect x="660" y="470" width="80" height="80" />
                    <text x="520" y="510" textAnchor="middle" fill="#8B7E74" fontSize="24" fontWeight="bold">2</text>
                    <text x="610" y="485" textAnchor="middle" fill="#8B7E74" fontSize="24" fontWeight="bold">1</text>
                    <text x="700" y="520" textAnchor="middle" fill="#8B7E74" fontSize="24" fontWeight="bold">3</text>
                </g>
            </svg>
        </div>
    );
};

export default AwardsBackground;
