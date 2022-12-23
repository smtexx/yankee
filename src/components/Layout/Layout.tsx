import s from './Layout.module.scss';
import { useSelector } from 'react-redux';
import { selectMessage } from 'redux/selectors';
import Message from 'components/Message/Message';

export default function Layout() {
  const message = useSelector(selectMessage);

  return (
    <div className={s.layout}>
      <div className={s.menu}></div>
      <div className={s.content}>
        {/* Routes from react-router */}
      </div>
      <div className={s.footer}></div>
      {message && (
        <div className={s.message}>
          <Message text={message} />
        </div>
      )}
    </div>
  );
}
