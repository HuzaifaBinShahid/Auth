import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface SpinnerProps {
  size?: number; 
  color?: "primary" | "secondary" | "inherit"; 
  thickness?: number; 
  className?: string; 
  style?: React.CSSProperties; 
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  color = "inherit",
  className = "",
  style = {},
}) => {
  return (
    <CircularProgress
      size={size}
      color={color}
      className={className}
      style={style}
    />
  );
};

export default Spinner;
