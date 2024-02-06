/* eslint-disable @typescript-eslint/unbound-method */
import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
  product: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.productName,
    price: () => faker.number.int({ min: 1, max: 100 })
  }
});