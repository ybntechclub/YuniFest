import React from 'react';

interface RollTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
}

export const RollText: React.FC<RollTextProps> = ({
  text,
  className = "",
  highlightColor = "text-[#CCFF00]"
}) => {
  return (
    <span className={`relative inline-flex overflow-hidden h-[1.3em] align-top group ${className}`}>
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
        <span className="inline-block transition-colors duration-200">
          {text}
        </span>
        <span className={`inline-block ${highlightColor} transition-colors duration-200`}>
          {text}
        </span>
      </span>
    </span>
  );
};
