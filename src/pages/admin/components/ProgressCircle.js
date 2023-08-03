import { Box, useTheme } from "@mui/material";



const ProgressCircle = ({ progress, size = "40" }) => {


  const theme = useTheme();

  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(#393434 55%, transparent 56%),conic-gradient(transparent 0deg ${angle}deg, #8670b6 ${angle}deg 360deg),#52c146`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;