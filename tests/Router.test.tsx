import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import routes from '../src/routes'

describe('Router', () => {
  it('should render the home page for /', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/']
    })

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  })

  it('should render the products page for /products', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/products']
    })

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
  })
})