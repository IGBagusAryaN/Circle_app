import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const FileAddIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={size}
      height={size}
      {...props}>
        <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="#FFFF"/>
        <path d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10" stroke="#FFFF"/>
        <path d="M15.75 5H21.25" stroke="#FFFF" />
        <path d="M18.5 7.75V2.25" stroke="#FFFF" />
        <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="#FFFF"/>
      </svg>  
  );
};

export default FileAddIcon;
