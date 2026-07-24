import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the SBC Marketplace city partnership page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', {
      name: /building pakistan's construction network/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /submit application/i })
  ).toBeInTheDocument();
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
});
