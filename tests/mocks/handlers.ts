import { http, HttpResponse } from 'msw';
import { products } from './data';

export const handlers = [
  http.get('/categories', () => {
    return HttpResponse.json([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Beauty' },
      { id: 3, name: 'Gardening' },
    ])
  }),

  http.get('/products', () => {
    return HttpResponse.json(products)
  }),

  http.get('/products/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const product = products.find(p => p.id === id);
    if (!product) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(product);
  })
]