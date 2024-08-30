import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage Component', () => {
    test('renders the main heading', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Verifica se o título da página inicial é renderizado
        expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Verifica se os links de navegação estão presentes
        expect(screen.getByText('Cadastrar Cliente')).toBeInTheDocument();
        expect(screen.getByText('Listar Clientes')).toBeInTheDocument();
        expect(screen.getByText('Detalhes do Cliente')).toBeInTheDocument();
    });

    test('navigation links have correct href attributes', () => {
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Verifica se os links de navegação têm os atributos href corretos
        expect(screen.getByText('Cadastrar Cliente').closest('a')).toHaveAttribute('href', '/client-form');
        expect(screen.getByText('Listar Clientes').closest('a')).toHaveAttribute('href', '/client-list');
        expect(screen.getByText('Detalhes do Cliente').closest('a')).toHaveAttribute('href', '/client-detail');
    });
});
