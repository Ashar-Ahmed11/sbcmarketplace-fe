import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import AppState from './components/context/appState';

const renderApp = (route) => render(
  <MemoryRouter initialEntries={[route]}>
    <AppState>
      <App />
    </AppState>
  </MemoryRouter>
);

test('renders the Figma-based SBC Marketplace home page', () => {
  renderApp('/');

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
  renderApp('/success');

  expect(
    screen.getByRole('heading', { name: /successfully submitted/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('renders the marketplace page route', () => {
  renderApp('/marketplace');

  expect(
    screen.getByRole('heading', { name: /marketplace products/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /trucks/i })).toBeInTheDocument();
});

test('renders the blogs and contact routes', () => {
  const { unmount } = renderApp('/blogs');

  expect(screen.getByRole('heading', { name: /^blogs$/i })).toBeInTheDocument();

  unmount();

  renderApp('/contact');

  expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
});

test('renders the auth routes', () => {
  const { unmount } = renderApp('/login');

  expect(screen.getByRole('heading', { name: /login to sbc marketplace/i })).toBeInTheDocument();
  const authMain = screen.getByRole('main');
  expect(within(authMain).getByLabelText(/^email$/i)).toBeInTheDocument();
  expect(within(authMain).getByLabelText(/^password$/i)).toBeInTheDocument();

  unmount();

  renderApp('/signup');

  expect(screen.getByRole('heading', { name: /signup for sbc marketplace/i })).toBeInTheDocument();
});

test('renders the 404 route', () => {
  renderApp('/404');

  expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
});
