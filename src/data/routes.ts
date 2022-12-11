import { Route } from 'types';

interface Routes {
  [key: string]: Route;
}

export const routes: Routes = {
  root: {
    path: '/',
    protected: false,
    ru: {
      title: 'YANKEE - купить одежду из новой коллекции',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'YANKEE - Buy clothes from the new collection',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  catalog: {
    path: 'catalog',
    protected: false,
    ru: {
      title: 'Каталог одежы YANKEE',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'YANKEE clothing catalog',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
    child: {
      path: ':categoryID',
      protected: false,
      ru: {
        title: '{Category title}',
        description:
          'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
      },
      en: {
        title: '{Category title}',
        description:
          'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
      },
      child: {
        path: ':productID',
        protected: false,
        ru: {
          title: '{Product title}',
          description:
            'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
        },
        en: {
          title: '{Product title}',
          description:
            'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
        },
      },
    },
  },
  refund: {
    path: 'refund',
    protected: false,
    ru: {
      title: 'Обмен и возврат товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Exchange and return of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  payment: {
    path: 'payment',
    protected: false,
    ru: {
      title: 'Оплата и доставка товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Payment and delivery of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  cart: {
    path: 'cart',
    protected: true,
    ru: {
      title: 'Корзина покупок',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Shopping cart',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  favorite: {
    path: 'favorite',
    protected: true,
    ru: {
      title: 'Избранное',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Favourites',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  contacts: {
    path: 'contacts',
    protected: false,
    ru: {
      title: 'Контактные данные',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Contacts',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  history: {
    path: 'history',
    protected: true,
    ru: {
      title: 'История покупок',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    en: {
      title: 'Shopping history',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
};
