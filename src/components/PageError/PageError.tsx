import { Link, useRouteError } from 'react-router-dom';
import { Lang, Translation } from 'types';
import s from './PageError.module.scss';

type Props = {};

export default function PageError({}: Props) {
  const lang = (document.documentElement.lang.toUpperCase() ||
    'EN') as Lang;
  const error = useRouteError();

  console.error(error);

  const text: Translation<'header' | 'message' | 'link'> = {
    RU: {
      header: 'Ошибка приложения',
      message: `Запрашиваемая страница не найдена, возможно в приложении произошла ошибка. 
         Мы уже работаем над ее устранением. Попробуйте перейти на главную страницу.`,
      link: 'Перейти на главную страницу',
    },
    EN: {
      header: 'Application Error',
      message: `Requested page was not found, an error may have occurred in the application. 
         We are already working on its elimination. Try to go to the main page.`,
      link: 'Go to the main page',
    },
  };

  return (
    <div className={s.pageError}>
      <div className={s.window}>
        <h1 className={s.header}>{text[lang].header}</h1>
        <p className={s.message}>{text[lang].message}</p>
        <Link to="/" className="link">
          {text[lang].link}
        </Link>
      </div>
    </div>
  );
}
