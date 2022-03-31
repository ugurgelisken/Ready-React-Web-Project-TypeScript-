import { useSelector } from "react-redux";

import Box from "@mui/material/Box";

import LinearProgress from "@mui/material/LinearProgress";

import "./Loader.scss";

export default function LinearIndeterminate() {
  const { isLoading } = useSelector((state: any) => state.application);

  return isLoading ? (
    <div className="Loader">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  ) : (
    <></>
  );
}
