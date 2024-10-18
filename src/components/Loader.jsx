import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Loader({ ring, top }) {
  const style = {
    zIndex: 3,
  };

  return (
    <Box position={"relative"}>
      <LinearProgress color="secondary" sx={style} value={100} />
      {ring && (
        <Box
          sx={{
            position: "absolute",
            top: top || "36dvh",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress color="secondary" size={60} />
        </Box>
      )}
    </Box>
  );
}
