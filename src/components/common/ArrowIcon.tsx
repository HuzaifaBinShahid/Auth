import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ArrowIcon = ({color}:any) => {
  return (
    <ArrowForwardIcon
      sx={{
        fontSize: "20px",
        color: color || "inherit",
        transition: "color 0.5s ease", 
      }}
    />
  );
};

export default ArrowIcon;
