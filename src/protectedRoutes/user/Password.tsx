import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";

import { setLogin, setLoading } from "../../store/application.store";

import { passwordChange, getUser } from "../../services/admin.service";

const Password = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { user, jwt } = useSelector((state: any) => state.application);

  const [currentPassword, setCurrentPassword] = useState(user.currentPassword);
  const [newPassword, setNewPassword] = useState(user.newPassword);
  const [confirmPassword, setConfirmPassword] = useState(user.confirmPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const update = async () => {
    dispatch(setLoading(true));
    const result = await passwordChange(jwt, user.id, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (result?.status === 200) {
      setSuccessMessage(t("pages.user.2.update_success"));
      get();
    } else if (result?.data?.errorCode) {
      setErrorMessage(t("pages.user.2.e_code_" + result?.data?.errorCode));
      setError(true);
      dispatch(setLoading(false));
    }
  };

  const get = async () => {
    const result = await getUser(jwt, user.id);
    dispatch(setLoading(false));
    if (result?.status === 200) {
      dispatch(setLogin(result?.data));
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else if (result?.data?.errorCode) {
      setErrorMessage(t("pages.user.2.update_fail"));
    }
  };

  const handleClose = (_: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  return (
    <>
      <Card className="user-container">
        <Stack spacing={1} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              update();
            }}
          >
            {t("btn.update")}
          </Button>
        </Stack>
        <br />
        <form className="User">
          <TextField
            type="password"
            autoComplete="off"
            className="input"
            label={t("pages.user.current_password")}
            variant="outlined"
            value={currentPassword || ""}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            type="password"
            autoComplete="off"
            className="input"
            label={t("pages.user.new_password")}
            variant="outlined"
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            type="password"
            autoComplete="off"
            className="input"
            id="outlined-basic"
            label={t("pages.user.confirm_new_password")}
            variant="outlined"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
      </Card>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default Password;
