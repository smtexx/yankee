import { useRouteError } from 'react-router-dom';
import { Lang, Translation } from 'types';
import s from './PageError.module.scss';

type Props = {};

export default function PageError({}: Props) {
  const lang = (document.documentElement.lang.toUpperCase() ||
    'EN') as Lang;
  const error = useRouteError();

  console.error(error);

  const text: Translation<'header' | 'message'> = {
    RU: {
      header: 'Ошибка приложения',
      message:
        'Во время работы приложения произошла ошибка. Мы уже работаем над ее устранением. Попробуйте перезагрузить страницу.',
    },
    EN: {
      header: 'Application Error',
      message:
        'An error occurred while the application was running. We are already working on its elimination. Try to reload the page.',
    },
  };

  return (
    <div className={s.pageError}>
      <div className={s.window}>
        <h1 className={s.header}>{text[lang].header}</h1>
        <p className={s.message}>{text[lang].message}</p>
      </div>
    </div>
  );
}
