import { Product, ProductsData } from 'types';

const products: Product[] = [
  {
    id: '1',
    category: 'jacket',
    price: 95,
    colors: ['beige', 'black', 'violet'],
    size: ['XS', 'S', 'M', 'L'],
    bestseller: true,
    novelty: true,
    inSale: false,
    raiting: 5,
    RU: {
      title: 'Куртка утепленная',
      description: `Женская зимняя куртка, которая непременно станет 
      любимой верхней одеждой в холодное время года. Укороченная модель 
      и прямой крой считаются молодежным трендом в этом сезоне. Теплая куртка 
      пуховик представлена в разных цветах. Куртка изготовлена из 
      высококачественных материалов: плотная ткань с пропиткой не промокает, 
      не продувается, но при этом остается легкой и теплой.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Биопух - 100%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `Women's winter jacket, which will certainly become your 
      favorite outerwear in the cold season. A shortened model and a 
      straight cut are considered a youth trend this season. The warm down 
      jacket is presented in different colors. The jacket is made of 
      high-quality materials: dense fabric with impregnation does not get wet, 
      does not blow through, but at the same time remains light and warm.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Biofluff - 100%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '2',
    category: 'jacket',
    price: 115,
    colors: ['blue', 'pink', 'black'],
    size: ['S', 'M', 'L'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 3,
    RU: {
      title: 'Пуховик ультралегкий',
      description: `Ультралегкая пуховая куртка изготовлена из натурального пуха 
      премиального качества, который удерживает воздух, создавая превосходный 
      теплоизоляционный эффект. Материал внешней стороны куртки обладает 
      водоотталкивающими свойствами, а подкладка – антистатическим эффектом. 
      Куртка складывается в чехол, который идет в комплекте. Удобно брать с собой.`,
      features: {
        fabric: 'Полиамид - 100%',
        insulation: 'Натуральный пух - 90%, Натуральное перо - 10%',
        lining: 'Полиамид - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Ultralight jacket',
      description: `The ultralight down jacket is made of premium quality 
      natural down, which retains air, creating an excellent thermal insulation 
      effect. The material of the outer side of the jacket has water–repellent 
      properties, and the lining has an antistatic effect. The jacket folds into 
      a case that comes with the kit. It is convenient to take with you.`,
      features: {
        fabric: 'Polyamide - 100%',
        insulation: 'Natural fluff - 90%, Natural feather - 10%',
        lining: 'Polyamide - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '3',
    category: 'jacket',
    price: 64,
    colors: ['beige', 'gray', 'silver'],
    size: ['S', 'M', 'XS', 'XXS'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 7,
    RU: {
      title: 'Куртка утепленная',
      description: `Куртка двухсторонняя выполнена из ветро и водонепроницаемого 
      текстиля, синтепоновый утеплитель. Детали: прямой крой, застежка на молнию, 
      боковые карманы, съемная оторочка из искусственного меха.`,
      features: {
        fabric: 'Нейлон - 100%',
        insulation: 'Полиэстер - 100%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `The double-sided jacket is made of wind and waterproof textiles, 
      sintepon insulation. Details: straight cut, zip closure, side pockets, removable 
      faux fur trim.`,
      features: {
        fabric: 'Nylon - 100%',
        insulation: 'Polyester - 100%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '4',
    category: 'jacket',
    price: 98,
    colors: ['beige', 'gray', 'white'],
    size: ['S', 'M', 'XS', 'XXS'],
    bestseller: true,
    novelty: true,
    inSale: false,
    raiting: 9,
    RU: {
      title: 'Куртка утепленная',
      description: `Куртка выполнена из стеганого текстиля с искусственным утеплителем. 
      Модель приталенного укороченного кроя. Детали: двойная застежка на кнопках, 
      воротник-стойка, несъемный капюшон, 2 кармана, пояс.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Полиэстер - 100%',
        lining: 'Вискоза - 50%, Полиэстер - 50%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `The jacket is made of quilted textile with artificial insulation. 
      A model of a fitted cropped cut. Details: double button closure, stand-up 
      collar, non-removable hood, 2 pockets, belt.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Polyester - 100%',
        lining: 'Viscose - 50%, Polyester - 50%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '5',
    category: 'jacket',
    price: 76,
    colors: ['brown', 'black', 'beige'],
    size: ['S', 'M', 'L'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 2,
    RU: {
      title: 'Пуховик',
      description: `Пуховик выполнен из стеганого текстиля. Модель прямого кроя. 
      Детали: фиксированный капюшон, застежка на молнию, прорезные карманы на 
      кнопках, удлиненная спинка, кулиска по нижнему краю.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Натуральный пух - 80%, Натуральное перо - 20%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Down Jacket',
      description: `The down jacket is made of quilted textile. Straight cut model. 
      Details: fixed hood, zip closure, welt pockets with buttons, elongated back, 
      drawstring at the bottom edge.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Natural fluff - 80%, Natural feather - 20%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '6',
    category: 'jacket',
    price: 95,
    colors: ['beige', 'black', 'violet'],
    size: ['XS', 'S', 'M', 'L'],
    bestseller: true,
    novelty: true,
    inSale: false,
    raiting: 10,
    RU: {
      title: 'Куртка утепленная',
      description: `Женская зимняя куртка, которая непременно станет 
      любимой верхней одеждой в холодное время года. Укороченная модель 
      и прямой крой считаются молодежным трендом в этом сезоне. Теплая куртка 
      пуховик представлена в разных цветах. Куртка изготовлена из 
      высококачественных материалов: плотная ткань с пропиткой не промокает, 
      не продувается, но при этом остается легкой и теплой.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Биопух - 100%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `Women's winter jacket, which will certainly become your 
      favorite outerwear in the cold season. A shortened model and a 
      straight cut are considered a youth trend this season. The warm down 
      jacket is presented in different colors. The jacket is made of 
      high-quality materials: dense fabric with impregnation does not get wet, 
      does not blow through, but at the same time remains light and warm.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Biofluff - 100%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '7',
    category: 'jacket',
    price: 115,
    colors: ['blue', 'pink', 'black'],
    size: ['S', 'M', 'L'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 8,
    RU: {
      title: 'Пуховик ультралегкий',
      description: `Ультралегкая пуховая куртка изготовлена из натурального пуха 
      премиального качества, который удерживает воздух, создавая превосходный 
      теплоизоляционный эффект. Материал внешней стороны куртки обладает 
      водоотталкивающими свойствами, а подкладка – антистатическим эффектом. 
      Куртка складывается в чехол, который идет в комплекте. Удобно брать с собой.`,
      features: {
        fabric: 'Полиамид - 100%',
        insulation: 'Натуральный пух - 90%, Натуральное перо - 10%',
        lining: 'Полиамид - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Ultralight jacket',
      description: `The ultralight down jacket is made of premium quality 
      natural down, which retains air, creating an excellent thermal insulation 
      effect. The material of the outer side of the jacket has water–repellent 
      properties, and the lining has an antistatic effect. The jacket folds into 
      a case that comes with the kit. It is convenient to take with you.`,
      features: {
        fabric: 'Polyamide - 100%',
        insulation: 'Natural fluff - 90%, Natural feather - 10%',
        lining: 'Polyamide - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '8',
    category: 'jacket',
    price: 64,
    colors: ['beige', 'gray', 'silver'],
    size: ['S', 'M', 'XS', 'XXS'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 5,
    RU: {
      title: 'Куртка утепленная',
      description: `Куртка двухсторонняя выполнена из ветро и водонепроницаемого 
      текстиля, синтепоновый утеплитель. Детали: прямой крой, застежка на молнию, 
      боковые карманы, съемная оторочка из искусственного меха.`,
      features: {
        fabric: 'Нейлон - 100%',
        insulation: 'Полиэстер - 100%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `The double-sided jacket is made of wind and waterproof textiles, 
      sintepon insulation. Details: straight cut, zip closure, side pockets, removable 
      faux fur trim.`,
      features: {
        fabric: 'Nylon - 100%',
        insulation: 'Polyester - 100%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '9',
    category: 'jacket',
    price: 98,
    colors: ['beige', 'gray', 'white'],
    size: ['S', 'M', 'XS', 'XXS'],
    bestseller: true,
    novelty: true,
    inSale: false,
    raiting: 3,
    RU: {
      title: 'Куртка утепленная',
      description: `Куртка выполнена из стеганого текстиля с искусственным утеплителем. 
      Модель приталенного укороченного кроя. Детали: двойная застежка на кнопках, 
      воротник-стойка, несъемный капюшон, 2 кармана, пояс.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Полиэстер - 100%',
        lining: 'Вискоза - 50%, Полиэстер - 50%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Insulated jacket',
      description: `The jacket is made of quilted textile with artificial insulation. 
      A model of a fitted cropped cut. Details: double button closure, stand-up 
      collar, non-removable hood, 2 pockets, belt.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Polyester - 100%',
        lining: 'Viscose - 50%, Polyester - 50%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
  {
    id: '10',
    category: 'jacket',
    price: 76,
    colors: ['brown', 'black', 'beige'],
    size: ['S', 'M', 'L'],
    bestseller: false,
    novelty: false,
    inSale: true,
    raiting: 8,
    RU: {
      title: 'Пуховик',
      description: `Пуховик выполнен из стеганого текстиля. Модель прямого кроя. 
      Детали: фиксированный капюшон, застежка на молнию, прорезные карманы на 
      кнопках, удлиненная спинка, кулиска по нижнему краю.`,
      features: {
        fabric: 'Полиэстер - 100%',
        insulation: 'Натуральный пух - 80%, Натуральное перо - 20%',
        lining: 'Полиэстер - 100%',
        references: [
          'Не стирать',
          'Гладить при температуре утюга до 110°C',
          'Не отбеливать',
          'Сухая чистка (химчистка)',
          'Барабанная сушка запрещена',
        ],
      },
    },
    EN: {
      title: 'Down Jacket',
      description: `The down jacket is made of quilted textile. Straight cut model. 
      Details: fixed hood, zip closure, welt pockets with buttons, elongated back, 
      drawstring at the bottom edge.`,
      features: {
        fabric: 'Polyester - 100%',
        insulation: 'Natural fluff - 80%, Natural feather - 20%',
        lining: 'Polyester - 100%',
        references: [
          'Do not wash',
          'Iron at an temperature of up to 110°C',
          'Do not bleach',
          'Dry cleaning',
          'Drum drying is prohibited',
        ],
      },
    },
  },
];

function createProductData(products: Product[]): ProductsData {
  const productsData: ProductsData = { array: products, ids: {} };

  products.forEach(
    (product) => (productsData.ids[product.id] = product)
  );

  return productsData;
}

export const productsData = createProductData(products);
