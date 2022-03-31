import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLogout } from '../../store/application.store';

import { useTranslation } from 'react-i18next';

import './Logout.scss';

const Logout = () => {
  const { t } = useTranslation();
  document.title = `${t('title')} | ${t('pages.logout.title')}`;
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch(setLogout());
      history.push('/login');
    }, 3000);
    return () => {
      window.clearInterval(timer);
    };
  }, [dispatch, history]);

  return (
    <div className='Logout'>
      <img src='/images/world.png' alt='' />
      <p> {t('pages.logout.goodbye')}</p>
      <img src='images/logout-background.jpg' alt=''></img>
    </div>
  );
};

export default Logout;
