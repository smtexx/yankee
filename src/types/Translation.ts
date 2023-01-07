import { Lang } from './AppState';

export type Translation<T extends string> = {
  [key in Lang]: {
    [key in T]: string;
  };
};
