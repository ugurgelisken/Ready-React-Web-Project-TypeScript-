import { useState } from 'react';

import { Redirect, useHistory, useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Link from '@material-ui/core/Link';

import { useTranslation } from 'react-i18next';

import { passwordRecovery } from '../../services/admin.service';

import './PasswordRecovery.scss';

interface IRouteParams {
  token: string;
}

const PasswordRecovery = () => {
  const { t } = useTranslation();
  document.title = `${t('title')} | ${t('pages.password_recovery.title')}`;

  const { token } = useParams<IRouteParams>();

  const history = useHistory();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const formLogin = async () => {
    const result = await passwordRecovery({
      newPassword,
      confirmPassword,
      passwordResetToken: token,
    });
    if (result?.status === 200) {
      history.push('/');
    } else {
      setErrorMessage(
        t('pages.password_recovery.e_code_' + result.data.errorCode)
      );
      setOpen(true);
    }
  };

  const handleClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setOpen(false);
  };

  return token ? (
    <div className='PasswordRecovery'>
      <Card className='Card'>
        <img src='./../images/logo.jpeg' alt='' />
        <form noValidate autoComplete='off'>
          <TextField
            label={t('pages.password_recovery.new_password')}
            variant='outlined'
            autoComplete='on'
            fullWidth
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <br />
          <TextField
            label={t('pages.password_recovery.confirm_new_password')}
            variant='outlined'
            autoComplete='on'
            fullWidth
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            variant='contained'
            color='primary'
            disabled={open}
            onClick={() => {
              formLogin();
            }}
          >
            {t('pages.password_recovery.save')}
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
    <Redirect to='/' />
  );
};

export default PasswordRecovery;
