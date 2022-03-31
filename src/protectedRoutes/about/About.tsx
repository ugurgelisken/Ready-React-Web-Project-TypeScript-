import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { setActivePage } from '../../store/application.store';

const About = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  document.title = `${t('title')} | ${t('pages.about.title')}`;
  dispatch(setActivePage('about'));

  const [text, setText] = useState('');

  useEffect(() => {
    fetch(`./release_notes/ABOUT-${i18n.language}.md`)
      .then((res) => res.text())
      .then((data) => {
        setText(data);
      });
  }, [i18n.language]);

  return <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />;
};
export default About;
