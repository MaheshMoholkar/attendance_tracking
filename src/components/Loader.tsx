import Backdrop from "@mui/material/Backdrop";
import { AppContext } from "../contexts/AppContext";
import { Box, LinearProgress } from "@mui/material";
import { useContext } from "react";

export default function Loader() {
  const { showLoader } = useContext(AppContext);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showLoader}
      >
        <Box
          sx={{
            // at the top of the screen
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          <LinearProgress color="secondary" />
        </Box>
      </Backdrop>
    </div>
  );
}
