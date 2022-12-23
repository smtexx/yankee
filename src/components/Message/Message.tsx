import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from 'redux/features/appState/appStateSlice';
import { selectLang } from 'redux/selectors';
import s from './Message.module.scss';

type Props = {
  text: string;
};

export default function Message({ text }: Props) {
  const dispatch = useDispatch();

  const lang = useSelector(selectLang);
  return (
    <div className={s.message}>
      <p className={s.text}>{text}</p>
      <button
        className={`button ${s.close}`}
        onClick={() => dispatch(clearMessage())}
      >
        {lang === 'RU' ? 'Закрыть' : 'Close'}
      </button>
    </div>
  );
}
