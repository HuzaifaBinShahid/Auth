import React from "react";
import ArrowIcon from "./ArrowIcon";

interface ServicesCardProps {
  title: string;
  description: string;
  image: string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <>
    
      <div className=" w-[90%] flex items-center justify-between p-4 border-b border-[#d9d9d921] opacity-1 hover:border-none">
        <div>
          <p className="text-[#878889] text-15px font-semibold">{description}</p>
          <h3 className="text-white font-bold text-[1.5rem] hover:text-orangetext">{title}</h3>
        </div>
        <div className="text-red-500">
          <ArrowIcon />
        </div>
        
      </div>
    </>
  );
};

export default ServicesCard;
