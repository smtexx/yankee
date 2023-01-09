import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import MetaData from 'components/MetaData/MetaData';
import { useSelector } from 'react-redux';
import { selectLang } from 'redux/selectors';
import { Route } from 'types';
import s from './PageCatalog.module.scss';

type Props = { route: Route };

export default function PageCatalog({ route }: Props) {
  const lang = useSelector(selectLang);
  return (
    <>
      <MetaData route={route} />
      <div className={`common-page ${s.pageCatalog}`}>
        <BreadCrumbs lang={lang} />
      </div>
    </>
  );
}
