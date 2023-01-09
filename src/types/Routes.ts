import { Lang } from './AppState';

interface Meta {
  title: string;
  name: string;
  description: string;
}

export type Route = {
  path: string;
  protected: boolean;
} & {
  [key in Lang]: Meta;
};

export interface Routes {
  [key: string]: Route;
}
