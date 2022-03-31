import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Login from "./publicRoutes/login/Login";
import Logout from "./publicRoutes/logout/Logout";
import Register from "./publicRoutes/register/Register";
import PasswordRecovery from "./publicRoutes/passwordRecovery/PasswordRecovery";
import ForgotPassword from "./publicRoutes/forgotPassword/ForgotPassword";
import NotFound from "./404/404";
import NoService from "./NoService/NoService";

import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

import About from "./protectedRoutes/about/About";
import Dashboard from "./protectedRoutes/dashboard/Dashboard";
import User from "./protectedRoutes/user/User";
import Help from "./protectedRoutes/help/Help";

import Loader from "./components/loader/Loader";

import { jwtValidate } from "./services/admin.service";

const App = () => {
  const history = useHistory();

  const { isLogin, jwt } = useSelector((state: any) => state.application);

  const [isJwtValid, setIsJwtValid] = useState(false);

  const fetch = async () => {
    if (jwt) {
      const result = await jwtValidate(jwt);
      if (result?.status === 200) {
        setIsJwtValid(true);
      } else {
        history && history.push("/login");
      }
    }
  };

  isJwtValid === false && fetch();

  return (
    <>
      <Loader />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/password-recovery/:token"
            component={PasswordRecovery}
          />
          <ProtectedRoutes
            exact
            path="/help"
            component={Help}
            isLogin={isLogin}
          />
          <ProtectedRoutes
            exact
            path="/version"
            component={About}
            isLogin={isLogin}
          />
          <ProtectedRoutes
            exact
            path="/about"
            component={About}
            isLogin={isLogin}
          />
          <ProtectedRoutes
            exact
            path="/"
            component={Dashboard}
            isLogin={isLogin}
          />

          <ProtectedRoutes
            exact
            path="/user"
            component={User}
            isLogin={isLogin}
          />
          <Route exact path="/no-service" component={NoService} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
