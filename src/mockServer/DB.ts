import {
  Category,
  ExchangeRate,
  Feature,
  Product,
  RegisteredOrder,
  StoragedUser,
  UnregisteredOrder,
  UnregisteredUser,
} from 'types';
import { history } from './initialData/history';
import { products } from './initialData/products';
import { rates } from './initialData/exchangeRates';

export class DB {
  protected storage: {
    products: Product[];
    entries: {
      [key: string]: Product;
    };
  };

  protected subscribeList: string[] = [];
  protected exchangeRate = rates;

  constructor(products: Product[]) {
    this.storage = {
      entries: {},
      products,
    };
    products.forEach(
      (product) => (this.storage.entries[product.id] = product)
    );
  }

  private static getUserStorageKey(login: string) {
    return `user__${login}`;
  }

  private saveUser(user: StoragedUser): void {
    try {
      localStorage.setItem(
        DB.getUserStorageKey(user.login),
        JSON.stringify(user)
      );
    } catch (error) {
      throw new DataBaseError(
        'Unable to save user, check local storage availability'
      );
    }
  }

  // Products
  getProductsByIDs(IDs: Product['id'][]): Product[] {
    return IDs.filter((product) => product).map(
      (id) => this.storage.entries[id]
    );
  }
  getProductsByCategory(category: Category): Product[] {
    if (category === 'all') {
      return this.storage.products;
    }
    return this.storage.products.filter(
      (product) => product.category === category
    );
  }
  getProductsByFeature(feature: Feature): Product[] {
    return this.storage.products.filter(
      (product) => product[feature]
    );
  }

  // User
  hasUser(login: string): boolean {
    return localStorage.getItem(DB.getUserStorageKey(login))
      ? true
      : false;
  }
  createUser(
    login: string,
    password: string,
    newUser: UnregisteredUser
  ): StoragedUser {
    if (this.hasUser(login)) {
      throw new DataBaseError(`User ${login} already exist in DB`);
    }

    const storagedUser: StoragedUser = {
      ...newUser,
      favorites: [],
      orders: history,
      login,
      password,
    };

    this.saveUser(storagedUser);
    return storagedUser;
  }
  getUser(login: string): StoragedUser {
    const storageKey = DB.getUserStorageKey(login);
    const userJSON = localStorage.getItem(storageKey);
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      throw new DataBaseError(`User "${login}" not found in DB`);
    }
  }
  updateUser(login: string, user: UnregisteredUser): StoragedUser {
    const oldUser = this.getUser(login);
    const updatedUser: StoragedUser = {
      ...oldUser,
      ...user,
    };
    this.saveUser(updatedUser);
    return updatedUser;
  }
  changePassword(login: string, newPassword: string): void {
    const user = this.getUser(login);
    user.password = newPassword;
    this.saveUser(user);
  }

  // Order
  addOrder(
    login: string,
    order: UnregisteredOrder
  ): RegisteredOrder[] {
    const user = this.getUser(login);
    const registeredOrder: RegisteredOrder = {
      ...order,
      id: Math.ceil(Math.random() * 1000).toString(),
      date: new Date().toString(),
    };

    user.orders.push(registeredOrder);
    this.saveUser(user);
    return user.orders;
  }
  getOrders(login: string): RegisteredOrder[] {
    return this.getUser(login).orders;
  }

  // Favorite
  addToFavorite(
    login: string,
    productID: Product['id']
  ): Product['id'][] {
    const user = this.getUser(login);
    user.favorites.push(productID);
    this.saveUser(user);
    return user.favorites;
  }
  getFavorites(login: string): Product['id'][] {
    return this.getUser(login).favorites;
  }
  deleteFromFavorite(
    login: string,
    productID: Product['id']
  ): Product['id'][] {
    const user = this.getUser(login);
    user.favorites = user.favorites.filter((id) => id !== productID);
    this.saveUser(user);
    return user.favorites;
  }

  // Subscribe
  subscribe(email: string): void {
    if (this.subscribeList.includes(email)) {
      throw new DataBaseError(`User ${email} already subscribed`);
    } else {
      this.subscribeList.push(email);
    }
  }

  // Currencies Ratio
  getCurrenciesRatio(): ExchangeRate {
    return this.exchangeRate;
  }
}

export class DataBaseError extends Error {
  constructor(message: string) {
    super(`DataBase: ${message}`);
    this.name = 'DataBaseError';
  }
}

export const db = new DB(products);
