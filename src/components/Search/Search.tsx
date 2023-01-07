import { ReactComponent as SearchIcon } from 'svg/search.svg';
import { Lang, Translation } from 'types';
import { useState } from 'react';
import s from './Search.module.scss';

type Props = { lang: Lang };

const text: Translation<'placeholder' | 'formLabel' | 'buttonLabel'> =
  {
    RU: {
      placeholder: 'Введите ваш запрос',
      formLabel: 'Поиск товаров',
      buttonLabel: 'Найти',
    },
    EN: {
      placeholder: 'Enter your request',
      formLabel: 'Product search',
      buttonLabel: 'Find',
    },
  };

export default function SearchOpened({ lang }: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <form
      className={`${s.searchOpened} ${s.homePage} ${
        isActive ? s.active : ''
      }`}
      id="search"
      role="search"
      aria-label={text[lang].formLabel}
    >
      <input
        type="text"
        className={s.input}
        id="searchField"
        name="searchField"
        size={10}
        autoComplete="off"
        placeholder={text[lang].placeholder}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      <button
        className={s.searchButton}
        onClick={(e) => e.preventDefault()}
        aria-label={text[lang].buttonLabel}
      >
        <SearchIcon />
      </button>
    </form>
  );
}
