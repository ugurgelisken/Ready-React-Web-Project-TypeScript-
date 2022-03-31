import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import { FormControlLabel, Switch } from "@mui/material";

import { setLogin, setLoading } from "../../store/application.store";

import { updateUserData, getUser } from "../../services/admin.service";

const Informations = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { user, jwt } = useSelector((state: any) => state.application);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const update = async () => {
    dispatch(setLoading(true));
    const result = await updateUserData(jwt, user.id, {
      username,
      firstName,
      lastName,
    });
    if (result?.status === 200) {
      get();
    } else if (result?.data?.errorCode) {
      setErrorMessage(t("pages.user.1.e_code_" + result?.data?.errorCode));
      setError(true);
      dispatch(setLoading(false));
    }
  };

  const get = async () => {
    const result = await getUser(jwt, user.id);
    dispatch(setLoading(false));
    if (result?.status === 200) {
      dispatch(setLogin(result?.data));
      setSuccessMessage(t("pages.user.1.update_success"));
      setSuccess(true);
    } else if (result?.data?.errorCode) {
      setErrorMessage(t("pages.user.1.update_fail"));
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
        <div className="User">
          <TextField
            className="input"
            label={t("pages.user.username")}
            variant="outlined"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="input"
            label={t("pages.user.firstname")}
            variant="outlined"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            className="input"
            label={t("pages.user.lastname")}
            variant="outlined"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            disabled
            className="input"
            id="outlined-basic"
            label={t("pages.user.email")}
            variant="outlined"
            defaultValue={user.email}
          />
          <TextField
            disabled
            className="input"
            id="outlined-basic"
            label={t("pages.user.role")}
            variant="outlined"
            defaultValue={user.role}
          />
          <FormControlLabel
            label={t("pages.user.status")}
            control={<Switch defaultChecked={user.status} disabled />}
          />
        </div>
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

export default Informations;
