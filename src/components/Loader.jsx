import { Box, CircularProgress, LinearProgress } from "@mui/material";

export default function Loader({ loading, ring, top }) {
  const style = {
    zIndex: 3,
  };

  return (
    <Box position={"relative"}>
      <LinearProgress
        color="secondary"
        sx={style}
        variant={loading ? "determinate" : "indeterminate"}
        value={100}
      />
      {ring && (
        <Box
          sx={{
            position: "fixed",
            top: top || "36%",
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
