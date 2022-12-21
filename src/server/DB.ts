import {
  Category,
  ExchangeRate,
  Feature,
  Product,
  RegisteredOrder,
  UnregisteredOrder,
  UnregisteredUser,
  User_DB,
} from 'types';
import { history } from './initialData/history';
import { products } from './initialData/products';
import { rates } from './initialData/exchangeRates';

export class DB {
  protected storage: {
    products: Product[];
    entries: {
      [key: Product['id']]: Product;
    };
  };
  protected subscribeList: string[] = [];
  protected exchangeRate = rates;

  private getUserStorageKey(login: User_DB['login']) {
    return `user__${login}`;
  }
  private saveUser(user: User_DB): void {
    try {
      localStorage.setItem(
        this.getUserStorageKey(user.login),
        JSON.stringify(user)
      );
    } catch (error) {
      throw new DataBaseError(
        'Unable to save user, check local storage availability'
      );
    }
  }

  constructor(products: Product[]) {
    this.storage = {
      entries: {},
      products,
    };
    products.forEach(
      (product) => (this.storage.entries[product.id] = product)
    );
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
  hasUser(login: User_DB['login']): boolean {
    return localStorage.getItem(this.getUserStorageKey(login))
      ? true
      : false;
  }
  createUser(
    login: User_DB['login'],
    password: User_DB['password'],
    newUser: UnregisteredUser
  ): User_DB {
    if (this.hasUser(login)) {
      throw new DataBaseError(`User ${login} already exist in DB`);
    }

    const storagedUser: User_DB = {
      ...newUser,
      favorites: [],
      orders: history,
      login,
      password,
    };

    this.saveUser(storagedUser);
    return storagedUser;
  }
  getUser(login: User_DB['login']): User_DB {
    const storageKey = this.getUserStorageKey(login);
    const userJSON = localStorage.getItem(storageKey);
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      throw new DataBaseError(`User "${login}" not found in DB`);
    }
  }
  updateUser(
    login: User_DB['login'],
    user: Partial<UnregisteredUser>
  ): User_DB {
    const oldUser = this.getUser(login);
    const updatedUser: User_DB = {
      ...oldUser,
      ...user,
    };
    this.saveUser(updatedUser);
    return updatedUser;
  }
  changePassword(
    login: User_DB['login'],
    newPassword: User_DB['password']
  ): void {
    const user = this.getUser(login);
    user.password = newPassword;
    this.saveUser(user);
  }

  // Order
  addOrder(
    login: User_DB['login'],
    order: UnregisteredOrder
  ): RegisteredOrder {
    const user = this.getUser(login);
    const registeredOrder: RegisteredOrder = {
      ...order,
      id: Math.ceil(Math.random() * 1000).toString(),
      date: new Date().toString(),
    };

    user.orders.push(registeredOrder);
    this.saveUser(user);
    return registeredOrder;
  }

  // Favorite
  addToFavorite(
    login: User_DB['login'],
    productID: Product['id']
  ): void {
    const user = this.getUser(login);
    if (!user.favorites.includes(productID)) {
      user.favorites.push(productID);
    }
    this.saveUser(user);
  }
  getFavorites(login: User_DB['login']): Product[] {
    const { favorites } = this.getUser(login);
    return this.getProductsByIDs(favorites);
  }
  deleteFromFavorite(
    login: User_DB['login'],
    productID: Product['id']
  ): void {
    const user = this.getUser(login);
    user.favorites = user.favorites.filter((id) => id !== productID);
    this.saveUser(user);
  }

  // Subscribe
  subscribe(email: string): true {
    if (this.subscribeList.includes(email)) {
      throw new DataBaseError(`User ${email} already subscribed`);
    } else {
      this.subscribeList.push(email);
      return true;
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
