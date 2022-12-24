import MetaData from 'components/MetaData/MetaData';
import { Route } from 'types';
import s from './PageContact.module.scss';

type Props = { route: Route };

export default function PageContact({ route }: Props) {
  return (
    <>
      <MetaData route={route} />
      <div className={s.pageContact}>PageContact Component</div>;
    </>
  );
}
