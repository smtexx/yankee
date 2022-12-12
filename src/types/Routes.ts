import { Lang } from './AppState';

interface Meta {
  title: string;
  description: string;
}

export type Route = {
  path: string;
  protected: boolean;
  child?: Route;
} & {
  [key in Lang]: Meta;
};

export interface Routes {
  [key: string]: Route;
}
