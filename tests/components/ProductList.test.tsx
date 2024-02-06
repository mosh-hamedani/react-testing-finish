import { render, screen } from '@testing-library/react'
import ProductList from '../../src/components/ProductList'
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { db } from '../mocks/db';

describe('ProductList', () => {
  const productIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      const product = db.product.create();
      productIds.push(product.id);
    });
  });

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds }}})
  })

  it('should render the list of products', async () => {
    render(<ProductList />);

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should render no products available if no product is found', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])));
    
    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  it('should render an error message when there is an error', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    
    render(<ProductList />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  })
})