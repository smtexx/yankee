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
import { history } from './history';
import { products } from './products';

class DB {
  protected storage: {
    products: Product[];
    entries: {
      [key: string]: Product;
    };
  };
  protected subscribeList: string[] = [];
  protected exchangeRate: ExchangeRate = {
    USD: 1,
    EUR: 1.06,
    RUB: 64.5,
  };

  constructor(products: Product[]) {
    this.storage = {
      entries: {},
      products,
    };
    products.forEach(
      (product) => (this.storage.entries[product.id] = product)
    );
  }

  private static getUserStorageKey(email: string) {
    return `user__${email}`;
  }
  private static encodeUser(user: StoragedUser): string {
    return JSON.stringify(user);
  }
  private static decodeUser(user: string): StoragedUser {
    return JSON.parse(user, (key, value) => {
      if (key === 'date' && value !== '' && value !== null) {
        return new Date(value);
      }
      return value;
    });
  }
  private saveUser(user: StoragedUser): void {
    try {
      localStorage.setItem(
        DB.getUserStorageKey(user.email),
        DB.encodeUser(user)
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
  createUser(
    newUser: UnregisteredUser,
    passBase64: string
  ): StoragedUser {
    if (this.getUser(newUser.email)) {
      throw new DataBaseError('User already exist in DB');
    }

    const storagedUser: StoragedUser = {
      ...newUser,
      favorites: [],
      orders: history,
      passBase64,
    };

    this.saveUser(storagedUser);
    return storagedUser;
  }
  getUser(email: string): StoragedUser {
    const storageKey = DB.getUserStorageKey(email);
    const userJSON = localStorage.getItem(storageKey);
    if (userJSON) {
      return DB.decodeUser(userJSON);
    } else {
      throw new DataBaseError(`User "${email}" not found in DB`);
    }
  }
  updateUser(user: UnregisteredUser): StoragedUser {
    const oldUser = this.getUser(user.email);
    const updatedUser: StoragedUser = {
      ...oldUser,
      ...user,
    };
    this.saveUser(updatedUser);
    return updatedUser;
  }
  changePassword(email: string, password: string): void {
    const user = this.getUser(email);
    user.passBase64 = password;
    this.saveUser(user);
  }

  // Order
  addOrder(
    email: string,
    order: UnregisteredOrder
  ): RegisteredOrder[] {
    const user = this.getUser(email);
    const registeredOrder: RegisteredOrder = {
      ...order,
      id: Math.ceil(Math.random() * 1000).toString(),
      date: new Date(),
    };

    user.orders.push(registeredOrder);
    this.saveUser(user);
    return user.orders;
  }
  getOrders(email: string): RegisteredOrder[] {
    return this.getUser(email).orders;
  }

  // Favorite
  addToFavorite(
    email: string,
    productID: Product['id']
  ): Product['id'][] {
    const user = this.getUser(email);
    user.favorites.push(productID);
    this.saveUser(user);
    return user.favorites;
  }
  getFavorites(email: string): Product['id'][] {
    return this.getUser(email).favorites;
  }
  deleteFromFavorite(
    email: string,
    productID: Product['id']
  ): Product['id'][] {
    const user = this.getUser(email);
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

class DataBaseError extends Error {
  constructor(message: string) {
    super(`DataBase: ${message}`);
    this.name = 'DataBaseError';
  }
}

export const db = new DB(products);
