import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import Link from '@material-ui/core/Link';

import { useTranslation } from 'react-i18next';

import { setLogin, setLogout } from '../../store/application.store';

import { login, jwtValidate } from '../../services/admin.service';

import './Login.scss';

const Login = () => {
  const { t } = useTranslation();
  document.title = `${t('title')} | ${t('pages.login.title')}`;
  const dispatch = useDispatch();

  const { isLogin, jwt } = useSelector((state: any) => state.application);

  const [username, setUsername] = useState('ugurgelisken');
  const [password, setPassword] = useState('12345678');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      if (jwt) {
        const result = await jwtValidate(jwt);
        if (result?.status === 200) {
          history.push('/');
        } else {
          dispatch(setLogout());
        }
      }
    }
    fetch();
  }, [dispatch, history, jwt]);

  const formLogin = async () => {
    const result = await login({ username, password });
    if (result?.status === 200) {
      dispatch(setLogin(result?.data));
    } else if (result?.data?.errorCode) {
      setErrorMessage(t('pages.login.e_code_' + result?.data?.errorCode));
      setOpen(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setUsername('');
    setPassword('');
    setOpen(false);
  };

  return !isLogin ? (
    <div className='Login'>
      <Card className='Card'>
        <img src='./../images/logo.jpeg' alt='' />
        <form noValidate autoComplete='off'>
          <TextField
            label={t('pages.login.username')}
            variant='outlined'
            autoComplete='on'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t('pages.login.password')}
            variant='outlined'
            type='password'
            autoComplete='on'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            disabled={open}
            onClick={() => {
              formLogin();
            }}
          >
            {t('pages.login.login')}
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              reset();
            }}
          >
            {t('btn.reset')}
          </Button>
        </form>
      </Card>
      <br />
      <div>
        <Link href='/register'> {t('pages.login.create_accout')}</Link>
        <Link href='/forgot-password'> {t('pages.login.forgot_password')}</Link>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{errorMessage}</Alert>
      </Snackbar>
    </div>
  ) : (
    <Redirect to='/' />
  );
};

export default Login;
