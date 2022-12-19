import {
  Method,
  Path,
  RegisteredUser,
  StatusCode,
  UnregisteredOrder,
  UnregisteredUser,
} from 'types';
import { history } from './initialData/history';
import { products } from './initialData/products';
import { rates } from './initialData/exchangeRates';
import { mockFetch } from './server';

function getUrl(...arg: string[]): string {
  return `http://localhost:3000/${arg.join('/')}`;
}

const unregisteredUser: UnregisteredUser = {
  firstname: 'Roman',
  lastname: 'Smtexx',
  address: 'Beograd',
  email: 'smtexx@mail.com',
  phone: '+381-62-777-7777',
};

const registeredUser: RegisteredUser = {
  ...unregisteredUser,
  favorites: [],
  orders: history,
  login: null,
  password: null,
};

const login = 'Roman';
let password = 'my_password';

function resetStorage() {
  localStorage.clear();
  localStorage.setItem(
    `user__${login}`,
    JSON.stringify({
      ...registeredUser,
      login,
      password,
    })
  );
}

resetStorage();

describe('Get products:', () => {
  test('Get products by "all" category', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.category, 'all')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(products);
  });

  test('Get products by "jacket" category', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.category, 'jacket')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(products);
  });

  test('Get products by "coat" category', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.category, 'coat')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual([]);
  });

  test('Get products by "unknown" category', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.category, 'unknown')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual([]);
  });

  test('Get products by "bestseller" feature', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.feature, 'bestseller')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(products.filter((p) => p.bestseller));
  });

  test('Get products by "new" feature', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.feature, 'new')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(products.filter((p) => p.new));
  });

  test('Get products by "inSale" feature', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.feature, 'inSale')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(products.filter((p) => p.inSale));
  });

  test('Get products by "unknown" feature', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.feature, 'unknown')
    );
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);
    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual([]);
  });

  test('Send wrong request to /products/feature', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.feature)
    );
    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.BAD_REQUEST);
  });

  test('Send wrong request to /products/category', async () => {
    const response = await mockFetch(
      getUrl(Path.products, Path.category)
    );
    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.BAD_REQUEST);
  });

  test('Send wrong request to /products', async () => {
    const response = await mockFetch(getUrl(Path.products));
    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.BAD_REQUEST);
  });
});

describe('Work with user:', () => {
  test('Create new user', async () => {
    localStorage.clear();
    const response = await mockFetch(getUrl(Path.user), {
      method: Method.PUT,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: JSON.stringify(unregisteredUser),
    });
    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.CREATED);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(registeredUser);

    const user = localStorage.getItem('user__Roman') || '{}';
    expect(JSON.parse(user)).toEqual({
      ...registeredUser,
      login: login,
      password: password,
    });

    resetStorage();
  });

  test('Updates user data', async () => {
    const updatedUser = {
      ...unregisteredUser,
      address: 'Ordynsk',
      phone: '+7 903 777 7777',
    };

    const response = await mockFetch(getUrl(Path.user), {
      method: Method.PATCH,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: JSON.stringify(updatedUser),
    });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual({
      ...registeredUser,
      address: updatedUser.address,
      phone: updatedUser.phone,
    });

    resetStorage();
  });

  test('Change user password', async () => {
    const newPassword = 'newPassword';

    const response = await mockFetch(
      getUrl(Path.user, Path.password),
      {
        method: Method.PATCH,
        headers: {
          Authorization: `Basic ${btoa(`${login}:${password}`)}`,
        },
        body: JSON.stringify({ password: newPassword }),
      }
    );

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.NO_CONTENT);

    const userJSON = localStorage.getItem(`user__${login}`) || '{}';
    expect(JSON.parse(userJSON)?.password).toBe(newPassword);

    resetStorage();
  });

  test('User authorization', async () => {
    const response = await mockFetch(getUrl(Path.user, Path.sign), {
      method: Method.GET,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: '',
    });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(registeredUser);

    resetStorage();
  });

  test('Create new order', async () => {
    const newOrder: UnregisteredOrder = {
      payment: 'CARD',
      status: 'PROCESSING',
      shipping: 'PICKUP',
      products: [
        {
          id: '10',
          color: 'gray',
          price: 64,
          size: 'XS',
          quantity: 1,
          RU: 'Куртка утепленная',
          EN: 'Insulated jacket',
        },
      ],
    };

    const response = await mockFetch(getUrl(Path.user, Path.orders), {
      method: Method.PUT,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: JSON.stringify(newOrder),
    });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.CREATED);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    let registeredOrder;
    if (Array.isArray(data)) {
      registeredOrder = data[data.length - 1];
    }
    expect(typeof registeredOrder?.date).toBe('string');
    expect(typeof registeredOrder?.id).toBe('string');

    delete registeredOrder?.date;
    delete registeredOrder?.id;
    expect(registeredOrder).toEqual(newOrder);

    resetStorage();
  });

  test('Get user orders', async () => {
    const response = await mockFetch(getUrl(Path.user, Path.orders), {
      method: Method.GET,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: '',
    });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(registeredUser.orders);

    resetStorage();
  });

  test('Add product to favorites', async () => {
    const response = await mockFetch(
      getUrl(Path.user, Path.favorites, '4'),
      {
        method: Method.GET,
        headers: {
          Authorization: `Basic ${btoa(`${login}:${password}`)}`,
        },
        body: '',
      }
    );

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(['4']);

    resetStorage();
  });

  test('Get user favorite products', async () => {
    const favorites = ['4', '6', '7'];
    registeredUser.favorites = favorites;
    resetStorage();

    const response = await mockFetch(
      getUrl(Path.user, Path.favorites),
      {
        method: Method.GET,
        headers: {
          Authorization: `Basic ${btoa(`${login}:${password}`)}`,
        },
        body: '',
      }
    );

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(favorites);

    registeredUser.favorites = [];
    resetStorage();
  });

  test('Delete productID from user favorite products', async () => {
    const favorites = ['4', '6', '7'];
    registeredUser.favorites = favorites;
    resetStorage();

    const response = await mockFetch(
      getUrl(Path.user, Path.favorites, favorites[1]),
      {
        method: Method.DELETE,
        headers: {
          Authorization: `Basic ${btoa(`${login}:${password}`)}`,
        },
        body: '',
      }
    );

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(['4', '7']);

    registeredUser.favorites = [];
    resetStorage();
  });

  test('Server respons if password is not correct', async () => {
    const response = await mockFetch(
      getUrl(Path.user, Path.favorites),
      {
        method: Method.GET,
        headers: {
          Authorization: `Basic ${btoa(`${login}:wrong_password`)}`,
        },
        body: '',
      }
    );

    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.FORBIDDEN);
  });

  test('Server respons if login is not correct', async () => {
    const response = await mockFetch(
      getUrl(Path.user, Path.favorites),
      {
        method: Method.GET,
        headers: {
          Authorization: `Basic ${btoa(`wrong_login:${password}`)}`,
        },
        body: '',
      }
    );

    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.FORBIDDEN);
  });

  test('Server respons if url is not correct', async () => {
    const response = await mockFetch(getUrl('unknown_url'), {
      method: Method.GET,
      headers: {
        Authorization: `Basic ${btoa(`${login}:${password}`)}`,
      },
      body: '',
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(StatusCode.BAD_REQUEST);
  });
});

describe('Subscribe user', () => {
  test('Subscribe user to newsletters', async () => {
    const response = await mockFetch(getUrl(Path.subscribe), {
      method: Method.POST,
      headers: {},
      body: JSON.stringify({ email: 'smtexx@mail.com' }),
    });

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.NO_CONTENT);
  });
});

describe('Get exchange rates', () => {
  test('Get exchange rates from server', async () => {
    const response = await mockFetch(getUrl(Path.exchange));

    expect(response.ok).toBe(true);
    expect(response.status).toBe(StatusCode.OK);

    let data;
    if (response.ok) {
      data = await response.json();
    }
    expect(data).toEqual(rates);
  });
});
