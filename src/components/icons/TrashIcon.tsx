import React from 'react';

interface TrashIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function TrashIcon({ className, ...props }: TrashIconProps) {
  return (
    <svg 
      width="14" 
      height="16" 
      viewBox="0 0 14 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      {...props}
    >
      <path 
        d="M0.649902 3.76101H12.6499M5.1499 6.87212V11.5388M8.1499 6.87212V11.5388M1.3999 3.76101L2.1499 13.0943C2.1499 13.5069 2.30794 13.9026 2.58924 14.1943C2.87055 14.486 3.25208 14.6499 3.6499 14.6499H9.6499C10.0477 14.6499 10.4293 14.486 10.7106 14.1943C10.9919 13.9026 11.1499 13.5069 11.1499 13.0943L11.8999 3.76101M4.3999 3.76101V1.42768C4.3999 1.2214 4.47892 1.02357 4.61957 0.877708C4.76022 0.731847 4.95099 0.649902 5.1499 0.649902H8.1499C8.34881 0.649902 8.53958 0.731847 8.68023 0.877708C8.82088 1.02357 8.8999 1.2214 8.8999 1.42768V3.76101" 
        stroke="currentColor" 
        strokeOpacity="0.5" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

