import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLang } from 'redux/selectors';
import { Route } from 'types';

type Props = { route: Route };

export default function MetaData({ route }: Props) {
  const lang = useSelector(selectLang);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  useEffect(() => {
    document.title = route[lang].title;

    const description = document.querySelector(
      'meta[name="description"]'
    );
    if (description) {
      description.setAttribute('content', route[lang].description);
    }
  }, [lang, route]);
  return null;
}
