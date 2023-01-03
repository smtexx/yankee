import React from 'react';
import { useSelector } from 'react-redux';
import { selectLang, selectMessage } from 'redux/selectors';
import Message from 'components/Message/Message';
import s from './Layout.module.scss';
import Menu from 'components/Menu/Menu';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const message = useSelector(selectMessage);
  const lang = useSelector(selectLang);

  return (
    <div className={s.layout}>
      <div className={s.menu}>
        <Menu lang={lang} />
      </div>
      <div className={s.content}>{children}</div>
      <div className={s.footer}></div>
      {message && (
        <div className={s.message}>
          <Message text={message} lang={lang} />
        </div>
      )}
    </div>
  );
}
