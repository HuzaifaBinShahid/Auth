import React from "react";
import ArrowIcon from "./ArrowIcon";

type ButtonVariant = "primary" | "danger" | "success" | "warning" | "normal";

interface CommonButtonProps {
  variant: ButtonVariant;
  onClick?: () => void;
  className?: string;
  btnText: string;
  isArrowIcon?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-700",
  danger: "bg-red-500 text-white hover:bg-red-700",
  success: "bg-green-500 text-white hover:bg-green-700",
  warning: "bg-yellow-500 text-white hover:bg-yellow-700",
  normal: "bg-white font-semibold text-black hover:bg-[#B1DE00]",
};

const CommonButton: React.FC<CommonButtonProps> = ({
  variant,
  onClick,
  className,
  btnText,
  isArrowIcon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${variantClasses[variant]} ${className}`}
    >
      {btnText} {isArrowIcon ? <ArrowIcon /> : null} 
    </button>
  );
};

export default CommonButton;
