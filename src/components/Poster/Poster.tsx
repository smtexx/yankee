import s from './Poster.module.scss';

type Props = {};

export default function Poster({}: Props) {
  return (
    <div className={s.poster}>
      <div className={s.slide}></div>
      <div className={s.slide}></div>
      <div className={s.slide}></div>
      <div className={s.message}></div>
    </div>
  );
}
