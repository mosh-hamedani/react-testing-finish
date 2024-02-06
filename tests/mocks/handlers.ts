import { db } from './db';

export const handlers = [
  ...db.product.toHandlers('rest')
]