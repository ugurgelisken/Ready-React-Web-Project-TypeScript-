import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Informations from "./Informations";
import Password from "./Password";

import { setActivePage } from "../../store/application.store";

import "./User.scss";

const User = () => {
  const { t } = useTranslation();
  document.title = `${t("title")} | ${t("pages.user.title")}`;

  const dispatch = useDispatch();
  dispatch(setActivePage("user"));

  const [tabIndex, setTabIndex] = useState(1);

  const handleChange = (_: React.SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Box className="Tab">
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label={t("pages.user.tabs.1")} value={1} />
          <Tab label={t("pages.user.tabs.2")} value={2} />
        </Tabs>
      </Box>

      {tabIndex === 1 && <Informations />}
      {tabIndex === 2 && <Password />}
    </>
  );
};
export default User;
