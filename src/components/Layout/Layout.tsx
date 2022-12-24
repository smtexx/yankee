import React from 'react';
import { useSelector } from 'react-redux';
import { selectMessage } from 'redux/selectors';
import Message from 'components/Message/Message';
import s from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const message = useSelector(selectMessage);

  return (
    <div className={s.layout}>
      <div className={s.menu}></div>
      <div className={s.content}>{children}</div>
      <div className={s.footer}></div>
      {message && (
        <div className={s.message}>
          <Message text={message} />
        </div>
      )}
    </div>
  );
}
