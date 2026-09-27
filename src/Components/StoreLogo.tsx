import React from 'react';

interface StoreLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showPhone?: boolean;
  className?: string;
}

export const StoreLogo: React.FC<StoreLogoProps> = ({
  size = 'md',
  showPhone = true,
  className = ''
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 4 Orange Bubbles Camera Cluster Logo from User's Reference Image */}
      <div
        className={`relative flex-shrink-0 bg-[#121316] border border-[#272A34] rounded-2xl flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105 ${
          isSm ? 'w-10 h-10' : isLg ? 'w-20 h-20' : 'w-13 h-13'
        }`}
        style={{
          boxShadow: '0 0 16px -2px rgba(255, 107, 0, 0.35)'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Left Bubble */}
          <circle cx="34" cy="32" r="18" fill="#FF7A00" />
          {/* Top-Right Accent Dot */}
          <circle cx="68" cy="22" r="7" stroke="#FF7A00" strokeWidth="4" fill="none" />
          {/* Middle-Right Main Bubble */}
          <circle cx="66" cy="48" r="20" fill="#FF7A00" />
          {/* Bottom-Left Bubble */}
          <circle cx="32" cy="70" r="19" fill="#FF7A00" />
          {/* Bottom-Right Small Accent Bubble */}
          <circle cx="68" cy="78" r="6" fill="#FF7A00" />
        </svg>
      </div>

      {/* Typography from User's Reference Image */}
      <div className="flex flex-col select-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight text-white uppercase ${
              isSm ? 'text-base' : isLg ? 'text-2xl' : 'text-lg'
            }`}
          >
            249 <span className="text-[#FF7A00]">IPHONE</span>
          </span>
        </div>
        <span
          className={`font-bold tracking-[0.3em] text-[#9CA3AF] uppercase ${
            isSm ? 'text-[8px]' : isLg ? 'text-xs' : 'text-[10px]'
          }`}
        >
          STORE
        </span>
        {showPhone && (
          <span
            className={`italic font-extrabold text-white tracking-wide transition-colors hover:text-[#FF7A00] ${
              isSm ? 'text-[10px]' : isLg ? 'text-sm' : 'text-xs'
            }`}
          >
            0121816126
          </span>
        )}
      </div>
    </div>
  );
};
