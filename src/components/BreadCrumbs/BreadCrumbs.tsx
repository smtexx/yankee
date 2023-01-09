import { ReactComponent as ArrowIcon } from 'svg/arrow.svg';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from 'redux/store';
import { Lang } from 'types';
import s from './BreadCrumbs.module.scss';
import { getPathName } from './getPathName';

type Props = { lang: Lang };

export default function BreadCrumbs({ lang }: Props) {
  const route = useLocation().pathname.split('/')[1];
  const params = useParams();
  const productName = useSelector(
    (state: RootState): null | string => {
      if (params.productID) {
        const product = state.data.products.entries[params.productID];
        return product[lang].title || null;
      }
      return null;
    }
  );

  const routePaths = [getPathName('route', 'root', lang)];

  if (route) {
    routePaths.push(getPathName('route', route, lang));
  }
  if (params.categoryID) {
    routePaths.push(getPathName('category', params.categoryID, lang));
  }
  if (params.productID && productName) {
    routePaths.push(productName);
  }

  return (
    <ul className={s.breadCrumbs}>
      {routePaths.map((text, idx) => {
        if (idx === 0) {
          return (
            <li className={s.route} key={text}>
              {text}
            </li>
          );
        }
        return (
          <li className={s.route} key={text}>
            <span>
              <ArrowIcon />
            </span>
            {text}
          </li>
        );
      })}
    </ul>
  );
}
