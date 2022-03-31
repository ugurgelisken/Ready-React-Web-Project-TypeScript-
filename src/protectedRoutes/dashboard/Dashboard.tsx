import { useDispatch } from "react-redux";
import { setActivePage } from "../../store/application.store";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";

import "./Dashboard.scss";

const Dashboard = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  dispatch(setActivePage("dashboard"));
  document.title = `${t("title")} | ${t("pages.dashboard.title")}`;

  return (
    <Box className="Dashboard">
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }} columns={12}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          Dashboard
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
