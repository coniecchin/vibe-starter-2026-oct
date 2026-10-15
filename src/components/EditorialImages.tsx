import React from 'react';

export const PressSecretaryImage: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-[#1c222b] aspect-[16/10] flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pressBackdrop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2c40" />
            <stop offset="60%" stopColor="#151e2c" />
            <stop offset="100%" stopColor="#0b1017" />
          </linearGradient>
          <linearGradient id="podiumWood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1f1814" />
            <stop offset="25%" stopColor="#3d2c22" />
            <stop offset="50%" stopColor="#4f3a2d" />
            <stop offset="75%" stopColor="#35251c" />
            <stop offset="100%" stopColor="#1a130f" />
          </linearGradient>
          <linearGradient id="spotlight" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="faceLight" cx="0.5" cy="0.4" r="0.4">
            <stop offset="0%" stopColor="#f3ded0" />
            <stop offset="70%" stopColor="#d8bca6" />
            <stop offset="100%" stopColor="#a3826b" />
          </radialGradient>
        </defs>

        {/* Studio backdrop */}
        <rect width="800" height="500" fill="url(#pressBackdrop)" />

        {/* White House briefing blue curtains & acoustic ribbed panels */}
        <g opacity="0.15">
          {Array.from({ length: 40 }).map((_, i) => (
            <rect key={i} x={i * 20} y="0" width="10" height="380" fill="#2d4261" />
          ))}
        </g>

        {/* Dramatic overhead key light cone */}
        <polygon points="300,0 500,0 680,480 120,480" fill="url(#spotlight)" />

        {/* White House logo roundel backdrop subtle outline */}
        <circle cx="400" cy="120" r="64" fill="none" stroke="#3b4d6b" strokeWidth="2" opacity="0.4" />
        <path d="M370,120 L430,120 M400,90 L400,150" stroke="#3b4d6b" strokeWidth="1.5" opacity="0.3" />

        {/* Karoline Leavitt: Silhouette & Editorial Form */}
        <g transform="translate(0, -10)">
          {/* Hair & Shoulders / Dark Blazer */}
          <path
            d="M330,230 C330,170 350,135 400,135 C450,135 470,170 470,230 C475,260 520,300 535,370 L265,370 C280,300 325,260 330,230 Z"
            fill="#12151c"
          />

          {/* Blonde Hair Volume Framing Face */}
          <path
            d="M360,140 C340,165 342,230 348,270 C355,240 365,190 372,175 C380,140 420,140 428,175 C435,190 445,240 452,270 C458,230 460,165 440,140 Z"
            fill="#cfb384"
          />
          <path
            d="M348,180 C338,210 340,265 352,295 C356,260 358,220 362,195 Z"
            fill="#b89a69"
          />
          <path
            d="M452,180 C462,210 460,265 448,295 C444,260 442,220 438,195 Z"
            fill="#b89a69"
          />

          {/* Face Oval */}
          <ellipse cx="400" cy="190" rx="36" ry="46" fill="url(#faceLight)" />

          {/* Distinctive Dark-Framed Designer Eyeglasses */}
          <g stroke="#1a1c22" strokeWidth="3.5" fill="none">
            {/* Left lens frame */}
            <rect x="372" y="178" width="22" height="15" rx="3" fill="#ffffff" fillOpacity="0.2" />
            {/* Right lens frame */}
            <rect x="406" y="178" width="22" height="15" rx="3" fill="#ffffff" fillOpacity="0.2" />
            {/* Bridge */}
            <line x1="394" y1="184" x2="406" y2="184" strokeWidth="2.5" />
          </g>

          {/* Facial features: lips and poise */}
          <ellipse cx="400" cy="216" rx="8" ry="3" fill="#b06461" />

          {/* Crisp White Shirt Collar & Navy Lapels */}
          <polygon points="400,265 385,235 415,235" fill="#f8f9fa" />
          <polygon points="370,240 395,290 355,300" fill="#1b212f" />
          <polygon points="430,240 405,290 445,300" fill="#1b212f" />
        </g>

        {/* Podium Structure */}
        <g>
          {/* Main Walnut Podium Body */}
          <polygon points="250,330 550,330 575,500 225,500" fill="url(#podiumWood)" />
          {/* Top trim & rim */}
          <rect x="235" y="320" width="330" height="15" rx="2" fill="#5c4535" />
          <rect x="240" y="322" width="320" height="4" fill="#846651" opacity="0.6" />

          {/* Official Seal Mockup on Podium Front */}
          <circle cx="400" cy="410" r="38" fill="#182333" stroke="#bfa369" strokeWidth="3" />
          <circle cx="400" cy="410" r="32" fill="none" stroke="#d5be87" strokeWidth="1" strokeDasharray="3 3" />
          {/* Eagle Silhouette */}
          <path d="M400,395 L404,405 L415,408 L406,415 L409,425 L400,419 L391,425 L394,415 L385,408 L396,405 Z" fill="#d5be87" />

          {/* Microphones attached to podium */}
          {/* Left Gooseneck Mic */}
          <path d="M310,325 Q325,275 350,260" fill="none" stroke="#0f1115" strokeWidth="5" strokeLinecap="round" />
          <rect x="345" y="250" width="14" height="22" rx="3" fill="#2b2d35" transform="rotate(-30 352 261)" />
          <rect x="342" y="254" width="6" height="14" fill="#0077c8" transform="rotate(-30 352 261)" />

          {/* Right Gooseneck Mic */}
          <path d="M490,325 Q475,275 450,260" fill="none" stroke="#0f1115" strokeWidth="5" strokeLinecap="round" />
          <rect x="441" y="250" width="14" height="22" rx="3" fill="#2b2d35" transform="rotate(30 448 261)" />
          <rect x="452" y="254" width="6" height="14" fill="#e01a22" transform="rotate(30 448 261)" />
        </g>

        {/* Foreground: Out-of-focus Press Corp silhouette & camera lens bokeh */}
        <g opacity="0.85">
          {/* Left reporters shoulders & notebook */}
          <path d="M-20,500 L60,430 L160,450 L180,500 Z" fill="#06080b" />
          <rect x="110" y="440" width="45" height="30" rx="3" fill="#1e2229" transform="rotate(-15 110 440)" />

          {/* Center-right TV camera rim and telephoto lens hood */}
          <circle cx="680" cy="460" r="90" fill="#06080b" />
          <rect x="620" y="420" width="140" height="80" rx="6" fill="#0c0e12" />
          <circle cx="680" cy="460" r="45" fill="none" stroke="#252a36" strokeWidth="6" />
          <circle cx="680" cy="460" r="35" fill="none" stroke="#3d4454" strokeWidth="3" />
          <circle cx="665" cy="445" r="8" fill="#ffffff" fillOpacity="0.25" />
        </g>

        {/* Press Room subtle lower banner ticker */}
        <rect x="0" y="475" width="800" height="25" fill="#090c10" opacity="0.9" />
        <text x="24" y="492" fill="#8892a0" fontFamily="sans-serif" fontSize="11" fontWeight="bold" letterSpacing="0.1em">
          WHITE HOUSE PRESS BRIEFING ROOM · WASHINGTON, D.C.
        </text>
      </svg>
    </div>
  );
};

export const CookingChickenImage: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-[#241a15] aspect-[16/10] flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 600 380"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="sheetPanBg" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#4a3e35" />
            <stop offset="60%" stopColor="#2c221a" />
            <stop offset="100%" stopColor="#150f0c" />
          </radialGradient>
          <linearGradient id="roastSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d98c36" />
            <stop offset="50%" stopColor="#b45f1b" />
            <stop offset="85%" stopColor="#7a340b" />
            <stop offset="100%" stopColor="#491b03" />
          </linearGradient>
          <radialGradient id="lemonWheel" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ffea75" />
            <stop offset="70%" stopColor="#f5c832" />
            <stop offset="90%" stopColor="#b37812" />
            <stop offset="100%" stopColor="#633904" />
          </radialGradient>
        </defs>

        {/* Dark Rimmed Baking Sheet Base */}
        <rect width="600" height="380" fill="url(#sheetPanBg)" />
        <rect x="20" y="20" width="560" height="340" rx="8" fill="#1a1410" stroke="#3d3128" strokeWidth="4" />

        {/* Parchment paper layer with crinkled effect */}
        <rect x="35" y="35" width="530" height="310" rx="4" fill="#dfd3be" opacity="0.92" />
        <path d="M40,50 Q180,45 300,52 Q440,48 550,55 L555,335 Q380,340 250,332 Q120,338 45,330 Z" fill="#e8deca" />

        {/* Roasted baby potatoes & red onion wedges scattered */}
        {/* Potatoes */}
        {[
          { cx: 110, cy: 90, r: 24, rot: 15 },
          { cx: 210, cy: 80, r: 22, rot: -20 },
          { cx: 480, cy: 95, r: 26, rot: 40 },
          { cx: 90, cy: 260, r: 25, rot: -10 },
          { cx: 500, cy: 270, r: 24, rot: 25 },
          { cx: 310, cy: 65, r: 20, rot: 5 },
          { cx: 290, cy: 310, r: 23, rot: -30 }
        ].map((p, idx) => (
          <g key={idx} transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}>
            <ellipse cx={p.cx} cy={p.cy} rx={p.r} ry={p.r * 0.78} fill="#e5b866" stroke="#966118" strokeWidth="2.5" />
            <path d={`M${p.cx - 10},${p.cy - 4} Q${p.cx},${p.cy - 12} ${p.cx + 12},${p.cy - 6}`} stroke="#70440b" strokeWidth="2" fill="none" opacity="0.6" />
            <circle cx={p.cx + 4} cy={p.cy + 3} r="2" fill="#502d04" opacity="0.7" />
          </g>
        ))}

        {/* Red onion charred wedges */}
        {[
          { d: "M150,110 Q170,125 190,120 Q175,100 150,110", c: "#75223c" },
          { d: "M430,110 Q455,130 470,125 Q450,95 430,110", c: "#591328" },
          { d: "M140,290 Q170,305 185,285 Q160,270 140,290", c: "#75223c" },
          { d: "M420,290 Q445,310 460,295 Q435,275 420,290", c: "#591328" }
        ].map((o, idx) => (
          <path key={idx} d={o.d} fill={o.c} stroke="#2e0511" strokeWidth="1.5" />
        ))}

        {/* Big Golden Roasted Chicken Thighs (Main Heroes) */}
        {/* Left Thigh */}
        <g>
          <path
            d="M140,195 C140,140 210,130 260,150 C310,170 305,240 270,265 C230,290 150,275 140,195 Z"
            fill="url(#roastSkin)"
            stroke="#491b03"
            strokeWidth="3"
          />
          {/* Sizzling blistered skin texture */}
          <path d="M175,165 Q230,155 260,185 Q280,215 245,245" fill="none" stroke="#612304" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.8" />
          <circle cx="210" cy="180" r="16" fill="#8f4311" opacity="0.7" />
        </g>

        {/* Right Thigh */}
        <g>
          <path
            d="M330,190 C330,135 410,130 455,155 C495,180 490,250 450,270 C405,290 340,265 330,190 Z"
            fill="url(#roastSkin)"
            stroke="#491b03"
            strokeWidth="3"
          />
          <path d="M365,160 Q420,155 450,190 Q465,225 425,250" fill="none" stroke="#612304" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.8" />
          <circle cx="400" cy="185" r="18" fill="#8f4311" opacity="0.7" />
        </g>

        {/* Charred Lemon Wheels */}
        {[
          { cx: 300, cy: 195, r: 28 },
          { cx: 170, cy: 130, r: 22 },
          { cx: 430, cy: 245, r: 24 }
        ].map((lem, idx) => (
          <g key={idx}>
            <circle cx={lem.cx} cy={lem.cy} r={lem.r} fill="url(#lemonWheel)" stroke="#573104" strokeWidth="2.5" />
            <circle cx={lem.cx} cy={lem.cy} r={lem.r * 0.75} fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
            {/* Spokes */}
            {Array.from({ length: 8 }).map((_, s) => {
              const ang = (s * Math.PI) / 4;
              return (
                <line
                  key={s}
                  x1={lem.cx}
                  y1={lem.cy}
                  x2={lem.cx + Math.cos(ang) * lem.r * 0.75}
                  y2={lem.cy + Math.sin(ang) * lem.r * 0.75}
                  stroke="#573104"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              );
            })}
            {/* Char spots */}
            <circle cx={lem.cx - 6} cy={lem.cy + 4} r="3" fill="#301902" opacity="0.8" />
          </g>
        ))}

        {/* Crumbled warm Feta chunks (creamy white with browned edges) */}
        {[
          { x: 230, y: 130, w: 18, h: 14, rot: 12 },
          { x: 360, y: 120, w: 22, h: 16, rot: -8 },
          { x: 250, y: 255, w: 20, h: 18, rot: 25 },
          { x: 380, y: 260, w: 24, h: 15, rot: -15 },
          { x: 120, y: 210, w: 16, h: 14, rot: 45 },
          { x: 470, y: 200, w: 17, h: 16, rot: 30 }
        ].map((feta, idx) => (
          <rect
            key={idx}
            x={feta.x}
            y={feta.y}
            width={feta.w}
            height={feta.h}
            rx="3"
            transform={`rotate(${feta.rot} ${feta.x + feta.w / 2} ${feta.y + feta.h / 2})`}
            fill="#fcfbf7"
            stroke="#a87f48"
            strokeWidth="1.8"
          />
        ))}

        {/* Fresh Herb Sprigs (Green dill/oregano flecks) */}
        <g fill="#2d6e32">
          {Array.from({ length: 28 }).map((_, i) => (
            <ellipse
              key={i}
              cx={90 + (i * 15) % 430}
              cy={80 + ((i * 37) % 200)}
              rx="4"
              ry="2"
              transform={`rotate(${i * 24})`}
              opacity="0.9"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export const ColumnistPortrait: React.FC<{ initials: string; name: string; className?: string }> = ({
  initials,
  name,
  className = ''
}) => {
  const isPamela = initials === 'PB';
  return (
    <div className={`relative w-11 h-11 rounded-full overflow-hidden border border-nyt bg-[#f3efe6] flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background newsprint parchment tint */}
        <circle cx="50" cy="50" r="50" fill="#ede7dc" />
        {/* Editorial Crosshatch & Linocut Portrait Stylization */}
        <g stroke="#262320" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {isPamela ? (
            /* Pamela Paul editorial sketch */
            <>
              {/* Hair outline */}
              <path d="M22,65 C18,35 32,18 50,18 C68,18 82,35 78,65 C76,75 72,82 72,85 L28,85 C28,82 24,75 22,65 Z" fill="#2d2925" />
              {/* Face */}
              <ellipse cx="50" cy="52" rx="22" ry="26" fill="#fcf9f2" strokeWidth="2" />
              {/* Features: eyes, brow, smile */}
              <path d="M40,46 Q44,44 48,46 M52,46 Q56,44 60,46" strokeWidth="2" />
              <circle cx="44" cy="50" r="2" fill="#262320" />
              <circle cx="56" cy="50" r="2" fill="#262320" />
              <path d="M49,53 L48,60 L52,60" strokeWidth="1.5" />
              <path d="M44,67 Q50,71 56,67" strokeWidth="2" />
              {/* Glasses */}
              <rect x="38" y="46" width="11" height="9" rx="2" strokeWidth="1.5" />
              <rect x="51" y="46" width="11" height="9" rx="2" strokeWidth="1.5" />
              <line x1="49" y1="50" x2="51" y2="50" strokeWidth="1.5" />
            </>
          ) : (
            /* Ezra Klein editorial sketch */
            <>
              {/* Hair */}
              <path d="M28,42 C26,22 42,16 50,16 C60,16 74,22 72,42 C72,36 68,26 50,26 C36,26 30,36 28,42 Z" fill="#262320" />
              {/* Face */}
              <ellipse cx="50" cy="52" rx="21" ry="27" fill="#fcf9f2" strokeWidth="2" />
              {/* Distinctive thick dark-rimmed glasses */}
              <rect x="34" y="44" width="14" height="12" rx="2" fill="#262320" strokeWidth="2" />
              <rect x="36" y="46" width="10" height="8" rx="1" fill="#fcf9f2" stroke="none" />
              <rect x="52" y="44" width="14" height="12" rx="2" fill="#262320" strokeWidth="2" />
              <rect x="54" y="46" width="10" height="8" rx="1" fill="#fcf9f2" stroke="none" />
              <line x1="48" y1="49" x2="52" y2="49" stroke="#262320" strokeWidth="3" />
              {/* Eyes inside frames */}
              <circle cx="41" cy="50" r="2" fill="#262320" />
              <circle cx="59" cy="50" r="2" fill="#262320" />
              {/* Nose & Smile */}
              <path d="M50,56 L48,63 L53,63" strokeWidth="1.5" />
              <path d="M43,70 Q50,74 57,70" strokeWidth="2" />
              {/* Collar */}
              <polygon points="50,82 42,75 58,75" fill="#fcf9f2" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
