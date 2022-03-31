import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";

import "./../../i18n";

import "./DrawerMenu.scss";

const DrawerMenu = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { isMenuOpen, activePage } = useSelector(
    (state: any) => state.application
  );

  return (
    <div className={`Menu ${isMenuOpen ? "open" : "close"}`}>
      <List component="nav">
        <ListItem
          button
          selected={activePage === "dashboard"}
          onClick={() => {
            history.push("/");
          }}
        >
          <ListItemIcon>
            <img
              className="icon"
              src="../icons/dashboard.svg"
              alt={t("btn.dashboard")}
            />
          </ListItemIcon>
          <ListItemText primary={t("btn.dashboard")} />
        </ListItem>
        <Divider />
      </List>
      <div
        className="version"
        onClick={() => {
          history.push("/about");
        }}
      >
        v {process.env.REACT_APP_VERSION}
      </div>
    </div>
  );
};
export default DrawerMenu;
