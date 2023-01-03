import s from './Menu.module.scss';
import { ReactComponent as BurgerIcon } from 'svg/burger.svg';
import CustomSwitcher from 'components/CustomSwitcher/CustomSwitcher';
import { Lang } from 'types';
import { useDispatch } from 'react-redux';
import { setLang } from 'redux/features/appState/appStateSlice';

type Props = { lang: string };

const langOptions: { value: Lang; label: Lang }[] = [
  { value: 'EN', label: 'EN' },
  { value: 'RU', label: 'RU' },
];

export default function Menu({ lang }: Props) {
  const dispatch = useDispatch();

  return (
    <div className={s.menu}>
      <button className={s.openButton}>
        <BurgerIcon />
      </button>
      <CustomSwitcher
        value={lang}
        handler={(newValue: Lang) => {
          dispatch(setLang(newValue));
        }}
        options={langOptions}
      />
    </div>
  );
}
