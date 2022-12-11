interface Meta {
  title: string;
  description: string;
}

export interface Route {
  path: string;
  protected: boolean;
  ru: Meta;
  en: Meta;
  child?: Route;
}
