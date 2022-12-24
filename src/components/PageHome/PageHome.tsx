import MetaData from 'components/MetaData/MetaData';

import { Route } from 'types';
import s from './PageHome.module.scss';

type Props = { route: Route };

export default function PageHome({ route }: Props) {
  return (
    <>
      <MetaData route={route} />
      <div className={s.pageHome}>PageHome Component</div>;
    </>
  );
}
