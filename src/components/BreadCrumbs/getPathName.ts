import { Lang } from 'types';

import { categoryNames } from 'data/categoryNames';
import { routes } from 'data/routes';

export function getPathName(
  type: 'route' | 'category',
  key: string,
  lang: Lang
): string | null {
  let result;

  if (type === 'route' && key in routes) {
    const translation = routes[key][lang];
    result = translation.name;
  }

  if (type === 'category' && key in categoryNames[lang]) {
    const translation = categoryNames[lang];
    result = translation[key as keyof typeof translation];
  }

  return result || null;
}
