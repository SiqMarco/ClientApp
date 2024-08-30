// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders HomePage at the root path', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument(); // Supondo que o componente HomePage contém "Home"
  });

  test('renders ClientForm at the /client-form path', () => {
    render(
        <MemoryRouter initialEntries={['/client-form']}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Client Form/i)).toBeInTheDocument(); // Supondo que o componente ClientForm contém "Client Form"
  });

  test('renders ClientList at the /client-list path', () => {
    render(
        <MemoryRouter initialEntries={['/client-list']}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Client List/i)).toBeInTheDocument(); // Supondo que o componente ClientList contém "Client List"
  });

  test('renders ClientDetail at the /client-detail path', () => {
    render(
        <MemoryRouter initialEntries={['/client-detail']}>
          <App />
        </MemoryRouter>
    );

    expect(screen.getByText(/Client Detail/i)).toBeInTheDocument(); // Supondo que o componente ClientDetail contém "Client Detail"
  });
});
