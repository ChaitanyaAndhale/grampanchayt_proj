import React from 'react';

const WarliBackground = () => {
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
                    <linearGradient id="premium-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Subtle texture overlay pattern */}
                    <pattern id="texture-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                {/* Premium gradient background */}
                <rect width="100%" height="100%" fill="url(#premium-bg)" />

                {/* Subtle texture overlay */}
                <rect width="100%" height="100%" fill="url(#texture-pattern)" />

                {/* Warli Style Tree - warm gray color for sketch look */}
                <g transform="translate(100, 100) scale(1.5)">
                    {/* Trunk */}
                    <path d="M80,300 L90,200 L70,200 L80,300" fill="#8B7E74" />
                    {/* Branches */}
                    <path d="M90,200 L120,150" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M70,200 L40,150" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M90,180 L110,120" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M70,180 L50,120" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M80,160 L80,100" stroke="#8B7E74" strokeWidth="2" />
                    {/* Leaves (Circles) */}
                    <circle cx="120" cy="150" r="5" fill="#8B7E74" />
                    <circle cx="40" cy="150" r="5" fill="#8B7E74" />
                    <circle cx="110" cy="120" r="5" fill="#8B7E74" />
                    <circle cx="50" cy="120" r="5" fill="#8B7E74" />
                    <circle cx="80" cy="100" r="5" fill="#8B7E74" />
                </g>

                {/* Another Tree on right */}
                <g transform="translate(900, 120) scale(1.2)">
                    <path d="M80,300 L90,200 L70,200 L80,300" fill="#8B7E74" />
                    <path d="M90,200 L120,150" stroke="#8B7E74" strokeWidth="2" />
                    <path d="M70,200 L40,150" stroke="#8B7E74" strokeWidth="2" />
                    <circle cx="120" cy="150" r="5" fill="#8B7E74" />
                    <circle cx="40" cy="150" r="5" fill="#8B7E74" />
                </g>

                {/* Hut */}
                <g transform="translate(500, 200) scale(1.5)">
                    <path d="M50,100 L150,100 L100,50 Z" fill="none" stroke="#8B7E74" strokeWidth="3" /> {/* Roof */}
                    <rect x="60" y="100" width="80" height="60" fill="none" stroke="#8B7E74" strokeWidth="3" /> {/* Body */}
                    <rect x="90" y="130" width="20" height="30" fill="none" stroke="#8B7E74" strokeWidth="2" /> {/* Door */}
                </g>

                {/* Warli Figures - Gram Sabha Circle */}
                <g transform="translate(200, 350)">
                    {/* Center Leader */}
                    <g transform="translate(400, 10)">
                        <circle cx="10" cy="5" r="5" fill="#8B7E74" /> {/* Head */}
                        <path d="M10,10 L0,25 L20,25 Z" fill="#8B7E74" /> {/* Upper body (triangle) */}
                        <path d="M10,40 L0,25 L20,25 Z" fill="#8B7E74" /> {/* Lower body (triangle) */}
                        <line x1="10" y1="40" x2="5" y2="55" stroke="#8B7E74" strokeWidth="2" /> {/* Leg */}
                        <line x1="10" y1="40" x2="15" y2="55" stroke="#8B7E74" strokeWidth="2" /> {/* Leg */}
                        <line x1="5" y1="15" x2="-5" y2="10" stroke="#8B7E74" strokeWidth="2" /> {/* Arm */}
                        <line x1="15" y1="15" x2="25" y2="10" stroke="#8B7E74" strokeWidth="2" /> {/* Arm */}
                    </g>

                    {/* Villagers sitting in semi-circles */}
                    {[0, 30, 60, 90, 120, 150].map((offset, i) => (
                        <g key={i} transform={`translate(${200 + offset}, 80)`}>
                            <circle cx="10" cy="5" r="4" fill="#8B7E74" />
                            <path d="M10,10 L2,22 L18,22 Z" fill="#8B7E74" />
                            <path d="M10,34 L2,22 L18,22 Z" fill="#8B7E74" />
                            {/* Sitting legs */}
                            <path d="M6,32 L0,38 M14,32 L20,38" stroke="#8B7E74" strokeWidth="2" />
                        </g>
                    ))}
                    {[0, 30, 60, 90, 120, 150].map((offset, i) => (
                        <g key={`row2-${i}`} transform={`translate(${200 + offset}, 130)`}>
                            <circle cx="10" cy="5" r="4" fill="#8B7E74" />
                            <path d="M10,10 L2,22 L18,22 Z" fill="#8B7E74" />
                            <path d="M10,34 L2,22 L18,22 Z" fill="#8B7E74" />
                            <path d="M6,32 L0,38 M14,32 L20,38" stroke="#8B7E74" strokeWidth="2" />
                        </g>
                    ))}
                </g>

                {/* Decorative Sun */}
                <g transform="translate(100, 50)">
                    <circle cx="30" cy="30" r="15" fill="none" stroke="#8B7E74" strokeWidth="2" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <line
                            key={i}
                            x1="30" y1="30"
                            x2="30" y2="5"
                            stroke="#8B7E74"
                            strokeWidth="2"
                            transform={`rotate(${angle} 30 30)`}
                        />
                    ))}
                </g>

            </svg>
        </div>
    );
};

export default WarliBackground;
