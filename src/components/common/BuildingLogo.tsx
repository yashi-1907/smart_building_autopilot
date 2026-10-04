import React from 'react';

interface BuildingLogoProps {
  className?: string;
  size?: number | string;
}

export const BuildingLogo: React.FC<BuildingLogoProps> = ({
  className = 'w-full max-w-[340px] h-auto',
  size,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs select-none"
      >
        {/* Background rounded soft card backdrop for contrast */}
        <rect
          x="12"
          y="12"
          width="476"
          height="476"
          rx="32"
          fill="#FFFFFF"
          stroke="#27302C"
          strokeWidth="3.5"
          strokeOpacity="0.08"
        />

        {/* 1. Left Cloud */}
        <path
          d="M 45 110 
             C 45 98, 55 90, 68 90 
             C 74 80, 92 80, 100 90 
             C 112 88, 124 96, 124 108 
             C 126 120, 116 128, 102 128 
             L 60 128 
             C 48 128, 45 120, 45 110 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Right Cloud */}
        <path
          d="M 370 100 
             C 370 88, 380 80, 395 80 
             C 402 70, 420 70, 428 80 
             C 440 78, 452 86, 452 98 
             C 454 110, 444 118, 430 118 
             L 388 118 
             C 374 118, 370 110, 370 100 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Four Sparkle Stars */}
        {/* Top-Left Sparkle */}
        <path
          d="M 148 65 Q 148 80 135 80 Q 148 80 148 95 Q 148 80 161 80 Q 148 80 148 65 Z"
          fill="#1F2723"
          stroke="#1F2723"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Mid-Left Sparkle */}
        <path
          d="M 48 290 Q 48 302 36 302 Q 48 302 48 314 Q 48 302 60 302 Q 48 302 48 290 Z"
          fill="#1F2723"
          stroke="#1F2723"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Mid-Right Sparkle */}
        <path
          d="M 458 178 Q 458 190 446 190 Q 458 190 458 202 Q 458 190 470 190 Q 458 190 458 178 Z"
          fill="#1F2723"
          stroke="#1F2723"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Ground Baseline */}
        <line
          x1="20"
          y1="465"
          x2="480"
          y2="465"
          stroke="#1F2723"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 4. Left Angled Skyscraper */}
        {/* Outer Shell */}
        <path
          d="M 85 465 L 85 160 L 175 95 L 175 465 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left Building Slanted Roof Cap */}
        <line
          x1="82"
          y1="162"
          x2="178"
          y2="93"
          stroke="#1F2723"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* 4 Vertical Window Strips */}
        <line
          x1="105"
          y1="185"
          x2="105"
          y2="435"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="124"
          y1="170"
          x2="124"
          y2="435"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="143"
          y1="155"
          x2="143"
          y2="435"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="160"
          y1="140"
          x2="160"
          y2="435"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 5. Right Skyscraper */}
        {/* Outer Shell */}
        <path
          d="M 335 465 L 335 180 L 370 150 L 435 225 L 435 465 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Building Gable Roof lines */}
        <line
          x1="334"
          y1="182"
          x2="370"
          y2="150"
          stroke="#1F2723"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1="368"
          y1="150"
          x2="438"
          y2="228"
          stroke="#1F2723"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Horizontal Window Bars */}
        {[235, 265, 295, 325, 355, 385, 415].map((y, idx) => (
          <rect
            key={`r-win-${idx}`}
            x="348"
            y={y}
            width="68"
            height="18"
            rx="3"
            fill="#FFFFFF"
            stroke="#1F2723"
            strokeWidth="3.5"
          />
        ))}

        {/* 6. Center Skyscraper (Prominent Foreground Tower) */}
        {/* Rooftop Antenna Spire */}
        <line
          x1="250"
          y1="15"
          x2="250"
          y2="50"
          stroke="#1F2723"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="250" cy="15" r="2.5" fill="#1F2723" />

        {/* Tiered Cornice Pediment */}
        <rect
          x="235"
          y="42"
          width="30"
          height="12"
          rx="2"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
        />
        <rect
          x="220"
          y="54"
          width="60"
          height="14"
          rx="2"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
        />
        <rect
          x="205"
          y="68"
          width="90"
          height="14"
          rx="2"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
        />

        {/* Main Tower Roof Ledge */}
        <rect
          x="175"
          y="82"
          width="150"
          height="18"
          rx="4"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4.5"
        />

        {/* Main Tower Wall Body */}
        <rect
          x="184"
          y="100"
          width="132"
          height="365"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4.5"
        />

        {/* 3 Columns × 8 Rows of Windows */}
        {[115, 150, 185, 220, 255, 290, 325, 360].map((rowY, rIdx) => (
          <g key={`row-${rIdx}`}>
            {/* Left col */}
            <rect
              x="200"
              y={rowY}
              width="24"
              height="24"
              rx="4"
              fill="#FFFFFF"
              stroke="#1F2723"
              strokeWidth="3.5"
            />
            {/* Center col */}
            <rect
              x="238"
              y={rowY}
              width="24"
              height="24"
              rx="4"
              fill="#FFFFFF"
              stroke="#1F2723"
              strokeWidth="3.5"
            />
            {/* Right col */}
            <rect
              x="276"
              y={rowY}
              width="24"
              height="24"
              rx="4"
              fill="#FFFFFF"
              stroke="#1F2723"
              strokeWidth="3.5"
            />
          </g>
        ))}

        {/* Arched Entrance Doors at Bottom */}
        {/* Left Door */}
        <path
          d="M 205 465 L 205 425 C 205 405, 230 405, 230 425 L 230 465 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left door glass reflection slash */}
        <line
          x1="218"
          y1="432"
          x2="225"
          y2="445"
          stroke="#1F2723"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Right Door */}
        <path
          d="M 270 465 L 270 425 C 270 405, 295 405, 295 425 L 295 465 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right door glass reflection slash */}
        <line
          x1="283"
          y1="432"
          x2="290"
          y2="445"
          stroke="#1F2723"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 7. Left Tree */}
        <line
          x1="45"
          y1="465"
          x2="45"
          y2="400"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 45 420 
             C 15 400, 15 340, 45 315 
             C 75 340, 75 400, 45 420 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tree vein line */}
        <line
          x1="45"
          y1="345"
          x2="45"
          y2="395"
          stroke="#1F2723"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="360"
          x2="40"
          y2="375"
          stroke="#1F2723"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 8. Right Tree */}
        <line
          x1="455"
          y1="465"
          x2="455"
          y2="400"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 455 420 
             C 425 400, 425 340, 455 315 
             C 485 340, 485 400, 455 420 Z"
          fill="#FFFFFF"
          stroke="#1F2723"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tree vein line */}
        <line
          x1="455"
          y1="345"
          x2="455"
          y2="395"
          stroke="#1F2723"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="464"
          y1="360"
          x2="460"
          y2="375"
          stroke="#1F2723"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
