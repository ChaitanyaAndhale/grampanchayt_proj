import React from 'react';

const SuccessBackground = () => {
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
                    <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture-success" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#success-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture-success)" />

                {/* Rising arrows/growth */}
                <g stroke="#8B7E74" strokeWidth="4" fill="none" opacity="0.2">
                    <path d="M100,500 L200,400 L300,420 L400,300" />
                    <path d="M350,280 L400,300 L380,350" fill="#8B7E74" fillOpacity="0.15" />

                    <path d="M700,550 L800,450 L900,480 L1000,350" />
                    <path d="M950,330 L1000,350 L980,400" fill="#8B7E74" fillOpacity="0.15" />
                </g>

                {/* Stars/achievements */}
                <g fill="#8B7E74" fillOpacity="0.2">
                    {[
                        { cx: 200, cy: 150 },
                        { cx: 500, cy: 100 },
                        { cx: 900, cy: 200 },
                        { cx: 300, cy: 350 },
                        { cx: 1000, cy: 450 }
                    ].map((star, i) => (
                        <path
                            key={i}
                            d={`M${star.cx},${star.cy - 20} L${star.cx + 5},${star.cy - 5} L${star.cx + 20},${star.cy} L${star.cx + 5},${star.cy + 5} L${star.cx},${star.cy + 20} L${star.cx - 5},${star.cy + 5} L${star.cx - 20},${star.cy} L${star.cx - 5},${star.cy - 5} Z`}
                        />
                    ))}
                </g>

                {/* Lightbulbs - ideas */}
                <g fill="none" stroke="#8B7E74" strokeWidth="2" opacity="0.2">
                    <circle cx="600" cy="200" r="25" />
                    <path d="M585,225 L585,240 L615,240 L615,225" fill="#8B7E74" fillOpacity="0.1" />
                    <rect x="590" y="240" width="20" height="10" rx="2" fill="#8B7E74" fillOpacity="0.1" />

                    <circle cx="150" cy="250" r="20" />
                    <path d="M138,270 L138,282 L162,282 L162,270" fill="#8B7E74" fillOpacity="0.1" />
                    <rect x="142" y="282" width="16" height="8" rx="2" fill="#8B7E74" fillOpacity="0.1" />
                </g>

                {/* Trophy */}
                <g fill="#8B7E74" fillOpacity="0.15" stroke="#8B7E74" strokeWidth="2" opacity="0.25">
                    <circle cx="1050" cy="120" r="15" />
                    <path d="M1035,120 L1030,140 L1070,140 L1065,120" />
                    <rect x="1040" y="140" width="20" height="30" />
                    <rect x="1030" y="170" width="40" height="10" rx="2" />
                </g>

                {/* Confetti */}
                <g fill="#8B7E74" opacity="0.2">
                    {[
                        { x: 250, y: 200, r: 4 },
                        { x: 400, y: 180, r: 3 },
                        { x: 700, y: 250, r: 4 },
                        { x: 850, y: 150, r: 3 },
                        { x: 450, y: 400, r: 4 }
                    ].map((dot, i) => (
                        <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default SuccessBackground;
