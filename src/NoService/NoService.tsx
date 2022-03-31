import { useTranslation } from 'react-i18next';

import './NoService.scss';

const NoService = () => {
  const { t } = useTranslation();
  return (
    <div className='NoService'>
      <img src='./icons/disconnect.svg' alt='No Service' />
      <p>{t('pages.no_service.text')}</p>
      <small>{t('pages.no_service.info')}</small>
    </div>
  );
};

export default NoService;
