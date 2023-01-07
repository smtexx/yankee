import s from './Menu.module.scss';
import { ReactComponent as BurgerIcon } from 'svg/burger.svg';
import { ReactComponent as BasketIcon } from 'svg/basket.svg';
import { ReactComponent as HeartIcon } from 'svg/heart.svg';
import { ReactComponent as UserIcon } from 'svg/user.svg';
import { Currency, Lang, Translation } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrency,
  setLang,
} from 'redux/features/appState/appStateSlice';
import CustomSwitcher from 'components/CustomSwitcher/CustomSwitcher';
import { selectCurrency } from 'redux/selectors';
import Search from 'components/Search/Search';

type Props = { lang: Lang };
type Option<T> = { value: T; label: T };

const langOptions: Option<Lang>[] = [
  { value: 'EN', label: 'EN' },
  { value: 'RU', label: 'RU' },
];

const currencyOptions: Option<Currency>[] = [
  { value: 'EUR', label: 'EUR' },
  { value: 'RUB', label: 'RUB' },
  { value: 'USD', label: 'USD' },
];

const text: Translation<
  | 'account'
  | 'new'
  | 'catalog'
  | 'about'
  | 'refund'
  | 'contacts'
  | 'shipping'
> = {
  RU: {
    account: 'личный кабинет',
    new: 'новинки',
    catalog: 'каталог',
    about: 'о нас',
    refund: 'обмен и возврат',
    shipping: 'оплата и доставка',
    contacts: 'контакты',
  },
  EN: {
    account: 'personal account',
    new: 'new items',
    catalog: 'catalog',
    about: 'about us',
    refund: 'exchange and refund',
    shipping: 'payment and delivery',
    contacts: 'contacts',
  },
};

export default function Menu({ lang }: Props) {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  return (
    <div className={`${s.menuBar}`}>
      <button className={s.openButton}>
        <BurgerIcon />
      </button>

      <nav className={s.navigation}>
        <ul className={s.navigationList}>
          <li className={s.navigationListItem}>{text[lang].new}</li>
          <li className={s.navigationListItem}>
            {text[lang].catalog}
          </li>
          <li className={s.navigationListItem}>{text[lang].about}</li>
        </ul>
      </nav>

      <ul className={s.switchers}>
        <li className={s.langSwitcher}>
          <CustomSwitcher
            value={lang}
            handler={(newValue: Lang) => {
              dispatch(setLang(newValue));
            }}
            options={langOptions}
          />
        </li>
        <li className={s.currencySwitcher}>
          <CustomSwitcher
            value={currency}
            options={currencyOptions}
            handler={(newCurrency: Currency) =>
              dispatch(setCurrency(newCurrency))
            }
          />
        </li>
      </ul>

      <h2 className={s.logo}>yankee</h2>

      <div className={s.controls}>
        <button className={s.controlsButton}>
          <UserIcon />
        </button>
        <button className={s.controlsButton}>
          <HeartIcon />
        </button>
        <button className={s.controlsButton}>
          <BasketIcon />
        </button>
      </div>

      <nav className={s.menu}>
        <ul className={s.menuList}>
          <li className={s.listItem}>
            <div className={s.search}>
              <Search lang={lang} />
            </div>
            <div className={s.currencyMobile}>
              <CustomSwitcher
                value={currency}
                options={currencyOptions}
                handler={(newCurrency: Currency) =>
                  dispatch(setCurrency(newCurrency))
                }
              />
            </div>
          </li>
          <li className={s.listItem}>
            <UserIcon />
            {` ${text[lang].account}`}
          </li>
          <li className={s.listItem}>{text[lang].new}</li>
          <li className={s.listItem}>{text[lang].catalog}</li>
          <li className={s.listItem}>{text[lang].about}</li>
          <li className={s.listItem}>{text[lang].refund}</li>
          <li className={s.listItem}>{text[lang].shipping}</li>
          <li className={s.listItem}>{text[lang].contacts}</li>
        </ul>
      </nav>
    </div>
  );
}
