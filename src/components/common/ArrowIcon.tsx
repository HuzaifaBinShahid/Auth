import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ArrowIcon = ({color , fontsize}:any) => {
  return (
    <ArrowForwardIcon
      sx={{
        fontSize: fontsize || "20px",
        color: color || "inherit",
        transition: "color 0.5s ease", 
      }}
    />
  );
};

export default ArrowIcon;
