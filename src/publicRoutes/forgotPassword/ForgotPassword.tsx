import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';

import { useTranslation } from 'react-i18next';

import { forgotPassword } from '../../services/admin.service';

import './ForgotPassword.scss';

const ForgotPassword = () => {
  const { t } = useTranslation();
  document.title = `${t('title')} | ${t('pages.forgot_password.title')}`;

  const { jwt } = useSelector((state: any) => state.application);

  const [email, setEmail] = useState('');
  const [isSent, setisSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const formLogin = async () => {
    const result = await forgotPassword(jwt, email);
    if (result?.status === 200) {
      setisSent(true);
    } else {
      setErrorMessage(
        t('pages.forgot_password.e_code_' + result.data.errorCode)
      );
      setOpen(true);
      setEmail('');
    }
  };

  const handleClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setEmail('');
    setisSent(false);
    setErrorMessage('');
    setOpen(false);
  };

  return !isSent ? (
    <div className='ForgotPassword'>
      <Card className='Card'>
        <img src='./../images/logo.jpeg' alt='' />
        <form noValidate autoComplete='off'>
          <TextField
            label={t('pages.forgot_password.email')}
            variant='outlined'
            value={email}
            autoComplete='on'
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            disabled={open}
            onClick={() => {
              formLogin();
            }}
          >
            {t('pages.forgot_password.send_recovery_link')}
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
      <Link href='/login'>{t('pages.register.go_to_login')}</Link>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='error'>{errorMessage}</Alert>
      </Snackbar>
    </div>
  ) : (
    <div className='SuccessMessageBox'>
      <p>{t('pages.forgot_password.success')} </p>
      <Button
        variant='contained'
        color='primary'
        disabled={open}
        onClick={() => {
          history.push('/login');
        }}
      >
        {t('pages.forgot_password.go_to_login')}
      </Button>
    </div>
  );
};

export default ForgotPassword;
