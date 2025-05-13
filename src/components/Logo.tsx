import React from "react";

type LogoProps = {
  height?: string; // Optional prop for height
  width?: string;  // Optional prop for width
};

const Logo: React.FC<LogoProps> = ({ height = "h-10", width = "w-10" }) => {
  return (
    <img 
      src="/sumo-insight-logo.svg" 
      alt="Sumo Insight"
      className={`${height} ${width}`}
      />
  );
};

export default Logo;