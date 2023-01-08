import MetaData from 'components/MetaData/MetaData';
import Poster from 'components/Poster/Poster';
import { Route } from 'types';
import s from './PageHome.module.scss';

type Props = { route: Route };

export default function PageHome({ route }: Props) {
  return (
    <>
      <MetaData route={route} />
      <Poster />
    </>
  );
}
