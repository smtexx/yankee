import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency, Lang, AppState, SoldProduct } from 'types';
import { initialState } from './initialState';
import {
  addToFavorites,
  changePassword,
  createOrder,
  deleteFromFavorites,
  getExchangeRates,
  registerUser,
  signIn,
  subscribe,
  updateUserData,
} from './thunks';

const appStateSlice = createSlice({
  name: '@state',
  initialState: initialState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload;
    },
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    addToCart(state, action: PayloadAction<SoldProduct>) {
      state.cart.push(action.payload);
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = null;
    },
  },
  extraReducers(builder) {
    // Registration
    builder.addCase(registerUser.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Регистрация нового пользователя...';
          break;
        default:
          message = 'Registration of new user...';
          break;
      }
      state.message = message;
    });
    builder.addCase(registerUser.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Ошибка регистрации, указанный логин уже занят.';
          break;
        default:
          message =
            'Registration error, the specified login is already taken.';
          break;
      }
      state.message = message;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Вы успешно зарегистрированы!';
          break;
        default:
          message = 'You have successfully registered!';
          break;
      }
      state.message = message;
      state.user = action.payload.user;
      state.authData = action.payload.authData;
    });

    // Update user data
    builder.addCase(updateUserData.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Обновление данных пользователя...';
          break;
        default:
          message = 'Updating user data...';
          break;
      }
      state.message = message;
    });
    builder.addCase(updateUserData.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Ошибка обновления данных, попробуйте позже.';
          break;
        default:
          message = 'Data update error, try again later.';
          break;
      }
      state.message = message;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Данные пользователя сохранены.';
          break;
        default:
          message = 'User data is saved.';
          break;
      }
      state.message = message;
      state.user = action.payload;
    });

    // Change password
    builder.addCase(changePassword.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Изменение пароля...';
          break;
        default:
          message = 'Changing the password...';
          break;
      }
      state.message = message;
    });
    builder.addCase(changePassword.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Ошибка изменения пароля, попробуйте позже.';
          break;
        default:
          message = 'Password change error, try again later.';
          break;
      }
      state.message = message;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Пароль был успешно изменен.';
          break;
        default:
          message = 'The password has been successfully changed.';
          break;
      }
      state.message = message;
      if (state.authData) {
        state.authData.password = action.payload;
      }
    });

    // Sign in
    builder.addCase(signIn.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Проверка логина и пароля...';
          break;
        default:
          message = 'Login and password verification...';
          break;
      }
      state.message = message;
    });
    builder.addCase(signIn.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Неверный логин или пароль.';
          break;
        default:
          message = 'Invalid username or password.';
          break;
      }
      state.message = message;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.message = null;
      state.user = action.payload.user;
      state.authData = action.payload.authData;
    });

    // Create order
    builder.addCase(createOrder.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Создание заказа...';
          break;
        default:
          message = 'Creating an order...';
          break;
      }
      state.message = message;
    });
    builder.addCase(createOrder.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Не удалось оформить заказ, попробуйте позднее.';
          break;
        default:
          message =
            'Unable to place an order, please try again later.';
          break;
      }
      state.message = message;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = `Ваш заказ зарегистрирован, номер заказа: ${action.payload.id}.`;
          break;
        default:
          message = `Your order is registered, order number: ${action.payload.id}.`;
          break;
      }
      state.message = message;
      state.cart = [];
      if (state.user) {
        state.user.orders.push(action.payload);
      }
    });

    // Add to favorite
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      if (
        state.user &&
        !state.user.favorites.find(
          (product) => product.id === action.payload.id
        )
      ) {
        state.user.favorites.push(action.payload);
      }
    });

    // Delete from favorite
    builder.addCase(
      deleteFromFavorites.fulfilled,
      (state, action) => {
        if (state.user) {
          state.user.favorites = state.user.favorites.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    );

    // Get exchange rates
    builder.addCase(getExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
    });

    // Subscribe
    builder.addCase(subscribe.pending, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Оформление подписки...';
          break;
        default:
          message = 'Making a subscription......';
          break;
      }
      state.message = message;
    });
    builder.addCase(subscribe.rejected, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message =
            'Не удалось оформить подписку, попробуйте позднее.';
          break;
        default:
          message = 'Unable to subscribe, please try again later.';
          break;
      }
      state.message = message;
    });
    builder.addCase(subscribe.fulfilled, (state) => {
      let message;
      switch (state.lang) {
        case 'RU':
          message = 'Спасибо, подписка успешно оформлена.';
          break;
        default:
          message =
            'Thank you, the subscription has been successfully issued.';
          break;
      }
      state.message = message;
    });
  },
});

export default appStateSlice.reducer;
export const {
  addToCart,
  setCurrency,
  setLang,
  clearMessage,
  setMessage,
} = appStateSlice.actions;
