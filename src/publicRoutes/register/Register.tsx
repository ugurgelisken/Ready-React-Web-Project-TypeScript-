import { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";

import { useTranslation } from "react-i18next";

import { register } from "../../services/admin.service";

import "./Register.scss";

const Register = () => {
  const { t } = useTranslation();
  document.title = `${t("title")} | ${t("pages.register.title")}`;

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [open, setOpen] = useState(false);

  const formRegister = async () => {
    const result = await register({
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (result?.status === 201) {
      setIsCreated(true);
    } else {
      setErrorMessage(t("pages.register.e_code_" + result.data.errorCode));
      setOpen(true);
    }
  };

  const handleClose = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOpen(false);
  };

  return !isCreated ? (
    <div className="Register">
      <Card className="Card">
        <img src="./../images/logo.jpeg" alt="" />
        <form noValidate autoComplete="off">
          <TextField
            label={t("pages.register.username")}
            variant="outlined"
            autoComplete="on"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t("pages.register.firstname")}
            variant="outlined"
            autoComplete="on"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t("pages.register.lastname")}
            variant="outlined"
            autoComplete="on"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t("pages.register.email")}
            variant="outlined"
            autoComplete="on"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t("pages.register.password")}
            variant="outlined"
            type="password"
            autoComplete="on"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t("pages.register.confirm_password")}
            variant="outlined"
            type="password"
            autoComplete="on"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={open}
            onClick={() => {
              formRegister();
            }}
          >
            {t("btn.create")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              reset();
            }}
          >
            {t("btn.reset")}
          </Button>
        </form>
      </Card>
      <br />
      <Link href="/login">{t("pages.register.go_to_login")}</Link>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </div>
  ) : (
    <div className="SuccessMessageBox">
      <p>{t("pages.register.success")} </p>
      <Button
        variant="contained"
        color="primary"
        disabled={open}
        onClick={() => {
          history.push("/login");
        }}
      >
        {t("pages.register.go_to_login")}
      </Button>
    </div>
  );
};

export default Register;
