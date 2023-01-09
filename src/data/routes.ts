import { Routes } from 'types';

export const routes: Routes = {
  root: {
    path: '/',
    protected: false,
    RU: {
      name: 'Главная',
      title: 'YANKEE - Купить одежду из новой коллекции',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Home',
      title: 'YANKEE - Buy clothes from the new collection',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  catalog: {
    path: 'catalog',
    protected: false,
    RU: {
      name: 'Каталог',
      title: 'Каталог одежы YANKEE',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Catalog',
      title: 'YANKEE clothing catalog',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  category: {
    path: 'catalog/:categoryID',
    protected: false,
    RU: {
      name: '@',
      title: 'Каталог | @',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: '@',
      title: 'Catalog | @',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  product: {
    path: 'catalog/:categoryID/:productID',
    protected: false,
    RU: {
      name: '@',
      title: 'YANKEE | @',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: '@',
      title: 'YANKEE | @',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  refund: {
    path: 'refund',
    protected: false,
    RU: {
      name: 'Обмен и возврат',
      title: 'Обмен и возврат товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Exchange and Refund',
      title: 'Exchange and return of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  payment: {
    path: 'payment',
    protected: false,
    RU: {
      name: 'Оплата и доставка',
      title: 'Оплата и доставка товара',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Payment and Delivery',
      title: 'Payment and delivery of goods',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  cart: {
    path: 'cart',
    protected: false,
    RU: {
      name: 'Корзина',
      title: 'Корзина покупок',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Cart',
      title: 'Shopping cart',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },

  contact: {
    path: 'contact',
    protected: false,
    RU: {
      name: 'Контакты',
      title: 'Контактные данные',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Contacts',
      title: 'Contacts',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  user: {
    path: 'user',
    protected: true,
    RU: {
      name: 'Личный кабинет',
      title: 'Личный кабинет',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Personal account',
      title: 'Personal account',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
  favorites: {
    path: 'favorites',
    protected: true,
    RU: {
      name: 'Избранное',
      title: 'Избранное',
      description:
        'YANKEE - Покупайте качественную модную одежду из новой коллекции на каждый день',
    },
    EN: {
      name: 'Favourites',
      title: 'Favourites',
      description:
        'YANKEE - Buy high-quality fashionable clothes from the new collection for every day',
    },
  },
};
