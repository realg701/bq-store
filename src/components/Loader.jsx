import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Loader({ children, top }) {
  const style = {
    zIndex: 3,
  };

  return (
    <Box>
      <LinearProgress color="secondary" sx={style} />
      <Box
        sx={{
          position: "absolute",
          top: top || "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
}
