import {
  Method,
  Path,
  RegisteredUser,
  StatusCode,
  UnregisteredUser,
} from 'types';
import { history } from './initialData/history';
import { products } from './initialData/products';
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

// describe('Get products:', () => {
//   test('Get products by "all" category', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.category, 'all')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual(products);
//   });

//   test('Get products by "jacket" category', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.category, 'jacket')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual(products);
//   });

//   test('Get products by "coat" category', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.category, 'coat')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual([]);
//   });

//   test('Get products by "unknown" category', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.category, 'unknown')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual([]);
//   });

//   test('Get products by "bestseller" feature', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.feature, 'bestseller')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual(products.filter((p) => p.bestseller));
//   });

//   test('Get products by "new" feature', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.feature, 'new')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual(products.filter((p) => p.new));
//   });

//   test('Get products by "inSale" feature', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.feature, 'inSale')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual(products.filter((p) => p.inSale));
//   });

//   test('Get products by "unknown" feature', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.feature, 'unknown')
//     );
//     expect(response.ok).toBe(true);
//     expect(response.status).toBe(StatusCode.OK);
//     let data;
//     if (response.ok) {
//       data = await response.json();
//     }
//     expect(data).toEqual([]);
//   });

//   test('Send wrong request to /products/feature', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.feature)
//     );
//     expect(response.ok).toBe(false);
//     expect(response.status).toBe(StatusCode.BAD_REQUEST);
//   });

//   test('Send wrong request to /products/category', async () => {
//     const response = await mockFetch(
//       getUrl(Path.products, Path.category)
//     );
//     expect(response.ok).toBe(false);
//     expect(response.status).toBe(StatusCode.BAD_REQUEST);
//   });

//   test('Send wrong request to /products', async () => {
//     const response = await mockFetch(getUrl(Path.products));
//     expect(response.ok).toBe(false);
//     expect(response.status).toBe(StatusCode.BAD_REQUEST);
//   });
// });

describe('Work with user:', () => {
  test('Create new user', async () => {
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

    password = newPassword;
  });
});
