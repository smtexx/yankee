import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLang } from 'redux/selectors';
import { Route } from 'types';
import s from './PageHome.module.scss';

type Props = { route: Route };

export default function PageHome({ route }: Props) {
  const lang = useSelector(selectLang);
  useEffect(() => {
    document.title = route[lang].title;
  }, []);
  return <div className={s.pageHome}>PageHome Component</div>;
}
