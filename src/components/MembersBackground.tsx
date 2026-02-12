import React from 'react';

const MembersBackground = () => {
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
                    <linearGradient id="members-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FDFCFB', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#F9F8F6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#F7F5F3', stopOpacity: 1 }} />
                    </linearGradient>
                    {/* Subtle sketch texture pattern */}
                    <pattern id="sketch-texture-members" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="50" cy="50" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <circle cx="80" cy="30" r="0.5" fill="#E8E6E3" opacity="0.3" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#E8E6E3" strokeWidth="0.2" opacity="0.2" />
                    </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#members-gradient)" />
                {/* Sketch texture overlay */}
                <rect width="100%" height="100%" fill="url(#sketch-texture-members)" />

                {/* Government building */}
                <g fill="#8B7E74" fillOpacity="0.15" stroke="#8B7E74" strokeWidth="3">
                    <rect x="450" y="250" width="300" height="200" />
                    <path d="M430,250 L600,150 L770,250" fill="none" />

                    {/* Columns */}
                    <rect x="480" y="300" width="15" height="150" fillOpacity="0.2" />
                    <rect x="550" y="300" width="15" height="150" fillOpacity="0.2" />
                    <rect x="620" y="300" width="15" height="150" fillOpacity="0.2" />
                    <rect x="690" y="300" width="15" height="150" fillOpacity="0.2" />

                    {/* Door */}
                    <rect x="575" y="380" width="50" height="70" fillOpacity="0.1" />
                </g>

                {/* People silhouettes around the building */}
                <g fill="#8B7E74" fillOpacity="0.15">
                    {[300, 340, 380, 820, 860, 900].map((x, i) => (
                        <g key={i} transform={`translate(${x}, 420)`}>
                            <circle cx="0" cy="0" r="8" />
                            <rect x="-6" y="8" width="12" height="20" rx="2" />
                        </g>
                    ))}
                </g>

                {/* Decorative circles - representing unity/community */}
                <g fill="none" stroke="#8B7E74" strokeWidth="2" opacity="0.15">
                    <circle cx="150" cy="150" r="40" />
                    <circle cx="150" cy="150" r="60" />
                    <circle cx="150" cy="150" r="80" />

                    <circle cx="1050" cy="450" r="50" />
                    <circle cx="1050" cy="450" r="70" />
                </g>

                {/* Abstract document/paper icons */}
                <g fill="#8B7E74" fillOpacity="0.1" stroke="#8B7E74" strokeWidth="2" opacity="0.2">
                    <rect x="100" y="350" width="60" height="80" rx="5" />
                    <line x1="115" y1="370" x2="145" y2="370" />
                    <line x1="115" y1="390" x2="145" y2="390" />
                    <line x1="115" y1="410" x2="140" y2="410" />

                    <rect x="1000" y="200" width="60" height="80" rx="5" />
                    <line x1="1015" y1="220" x2="1045" y2="220" />
                    <line x1="1015" y1="240" x2="1045" y2="240" />
                    <line x1="1015" y1="260" x2="1040" y2="260" />
                </g>
            </svg>
        </div>
    );
};

export default MembersBackground;
