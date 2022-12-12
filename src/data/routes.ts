import { Routes } from 'types';

export const routes: Routes = {
  root: {
    path: '/',
    protected: false,
    RU: {
      title: 'YANKEE - купить одежду из новой коллекции',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'YANKEE - Buy clothes from the new collection',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  catalog: {
    path: 'catalog',
    protected: false,
    RU: {
      title: 'Каталог одежы YANKEE',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'YANKEE clothing catalog',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
    child: {
      path: ':categoryID',
      protected: false,
      RU: {
        title: '{Category title}',
        description:
          'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
      },
      EN: {
        title: '{Category title}',
        description:
          'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
      },
      child: {
        path: ':productID',
        protected: false,
        RU: {
          title: '{Product title}',
          description:
            'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
        },
        EN: {
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
    RU: {
      title: 'Обмен и возврат товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Exchange and return of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  payment: {
    path: 'payment',
    protected: false,
    RU: {
      title: 'Оплата и доставка товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Payment and delivery of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  cart: {
    path: 'cart',
    protected: true,
    RU: {
      title: 'Корзина покупок',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Shopping cart',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  favorite: {
    path: 'favorite',
    protected: true,
    RU: {
      title: 'Избранное',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Favourites',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  contacts: {
    path: 'contacts',
    protected: false,
    RU: {
      title: 'Контактные данные',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Contacts',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  history: {
    path: 'history',
    protected: true,
    RU: {
      title: 'История покупок',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      title: 'Shopping history',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
};
