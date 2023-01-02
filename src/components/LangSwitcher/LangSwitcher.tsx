import { useState } from 'react';
import { Lang } from 'types';
import { ReactComponent as IndicatorIcon } from 'svg/indicator.svg';
import s from './LangSwitcher.module.scss';
import { useDispatch } from 'react-redux';
import { setLang } from 'redux/features/appState/appStateSlice';

type Props = { lang: string };

const langs: Lang[] = ['EN', 'RU'];

export default function LangSwitcher({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={s.langSwitcher}>
      <div className={s.lang} onClick={() => setOpen(!open)}>
        {lang}
        <span className={`${s.indicator} ${open ? s.open : ''}`}>
          <IndicatorIcon />
        </span>
      </div>
      {open ? (
        <ul className={s.menu}>
          {langs
            .filter((val) => val !== lang)
            .map((val) => (
              <li
                className={s.menuItem}
                key={val}
                onClick={() => {
                  dispatch(setLang(val));
                  setOpen(false);
                }}
              >
                {val}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
}
