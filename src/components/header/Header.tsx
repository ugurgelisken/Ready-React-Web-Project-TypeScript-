import { useState } from "react";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircleRounded";
import HelpIcon from "@material-ui/icons/HelpOutlineOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import LanguageChanger from "../languageChanger/LanguageChanger";
import "./Header.scss";

import { useDispatch } from "react-redux";
import { toggleMenu } from "../../store/application.store";

import { useTranslation } from "react-i18next";
import "./../../i18n";

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleDrawerMenu = () => {
    dispatch(toggleMenu());
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  const goTo = (page: string) => {
    history.push(page);
    menuClose();
  };

  return (
    <div className="Header">
      <AppBar position="static" className="Appbar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleDrawerMenu()}
          >
            <MenuIcon />
          </IconButton>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6"></Typography>
            </Grid>
            <Grid item>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={menuClose}
              >
                <MenuItem onClick={() => goTo("/user")}>
                  {t("btn.user")}
                </MenuItem>
                <MenuItem onClick={() => goTo("/logout")}>
                  {t("btn.logout")}
                </MenuItem>
              </Menu>

              <LanguageChanger />

              <IconButton
                color="inherit"
                onClick={() => {
                  goTo("/help");
                }}
              >
                <HelpIcon />
              </IconButton>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={menuOpen}
                color="inherit"
              >
                <AccountIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
