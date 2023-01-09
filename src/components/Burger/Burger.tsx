import { useState } from 'react';
import s from './Burger.module.scss';

type Props = { handler(val: boolean): void };

export default function Burger({ handler }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={`${s.button} ${isOpen ? s.open : ''}`}
      onClick={() => {
        setIsOpen(!isOpen);
        handler(!isOpen);
      }}
    >
      <span className={s.figure}>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
      </span>
    </button>
  );
}
