import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the Figma-based SBC Marketplace home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', {
      name: /pakistan’s # 1 marketplace of building construction, equipment & material/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /what industry leaders are saying/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the successful submission page', () => {
  render(
    <MemoryRouter initialEntries={['/success']}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: /successfully submitted/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the marketplace page route', () => {
  render(
    <MemoryRouter initialEntries={['/marketplace']}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: /marketplace products/i })
  ).toBeInTheDocument();
});

test('renders the blogs and contact routes', () => {
  const { unmount } = render(
    <MemoryRouter initialEntries={['/blogs']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /^blogs$/i })).toBeInTheDocument();

  unmount();

  render(
    <MemoryRouter initialEntries={['/contact']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
});
