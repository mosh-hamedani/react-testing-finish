import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { HttpResponse, delay, http } from 'msw';
import ProductList from '../../src/components/ProductList';
import AllProviders from '../AllProviders';
import { db } from '../mocks/db';
import { server } from '../mocks/server';

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
    render(<ProductList />, { wrapper: AllProviders });

    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should render no products available if no product is found', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])));
    
    render(<ProductList />, { wrapper: AllProviders });

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });

  it('should render an error message when there is an error', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    
    render(<ProductList />, { wrapper: AllProviders });

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('should render a loading indicator when fetching data', async () => {
    server.use(http.get('/products', async () => {
      await delay();
      return HttpResponse.json([]);
    }));
    
    render(<ProductList />, { wrapper: AllProviders });

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it('should remove the loading indicator after data is fetched', async () => {
    render(<ProductList />, { wrapper: AllProviders });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  })

  it('should remove the loading indicator if data fetching fails', async () => {
    server.use(http.get('/products', () => HttpResponse.error()));
    
    render(<ProductList />, { wrapper: AllProviders });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  })
})