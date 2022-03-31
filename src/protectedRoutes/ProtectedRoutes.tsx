import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

import DrawerMenu from "../components/drawerMenu/DrawerMenu";
import Header from "../components/header/Header";

import "./ProtectedRoutes.scss";

const ProtectedRoutes = ({ component: Component, isLogin, ...rest }: any) => {
  const location = useLocation();
  const { isMenuOpen } = useSelector((state: any) => state.application);
  return (
    <Route {...rest}>
      {isLogin === true ? (
        <>
          <Header />
          <DrawerMenu />
          <div className={`Main ${isMenuOpen ? "main-open" : "main-close"}`}>
            <Component />
          </div>
        </>
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoutes;
