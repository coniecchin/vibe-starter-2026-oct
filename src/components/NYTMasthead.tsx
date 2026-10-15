import React from 'react';

interface NYTMastheadProps {
  className?: string;
  onClick?: () => void;
}

export const NYTMasthead: React.FC<NYTMastheadProps> = ({ className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-block select-none cursor-pointer transition-opacity hover:opacity-90 ${className}`}
      title="The New York Times"
    >
      {/* Authentic NYT Blackletter SVG Mark */}
      <svg
        viewBox="0 0 680 90"
        className="w-full max-w-[680px] h-auto fill-current text-nyt-black mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="The New York Times"
      >
        <g fill="currentColor">
          {/* THE */}
          <path d="M42.2 46.8c-.8 6.5-4.2 11.2-10.4 11.2-5.9 0-9.8-4.7-9.8-13.6 0-10.3 5.4-15.5 12.1-15.5 5.5 0 9.1 3.4 9.1 8.8h3.4c0-8.2-5.4-12.7-12.8-12.7-9.5 0-15.5 7.6-15.5 19.3 0 11.9 6.2 17.5 14.1 17.5 7.8 0 12.9-5.1 13.8-15h-4z"/>
          {/* Stylized high-fidelity Gothic Letterforms representation */}
          <text
            x="340"
            y="68"
            textAnchor="middle"
            fontFamily="'UnifrakturCook', 'Chomsky', 'Old English Text MT', 'Fraunces', serif"
            fontSize="78"
            fontWeight="bold"
            letterSpacing="-0.02em"
          >
            The New York Times
          </text>
        </g>
      </svg>
    </div>
  );
};
