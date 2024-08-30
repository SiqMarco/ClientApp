import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientList from './ClientList';
import { getClients } from '../../services/clientService';
import userEvent from '@testing-library/user-event';

// Mock do serviço getClients
jest.mock('../../services/clientService');

const mockClients = [
    { id: 1, name: 'Empresa A', size: 'Pequena' },
    { id: 2, name: 'Empresa B', size: 'Média' },
];

describe('ClientList Component', () => {
    test('renders loading state initially', () => {
        render(
            <Router>
                <ClientList />
            </Router>
        );
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    test('renders list of clients after loading', async () => {
        getClients.mockResolvedValueOnce({ data: mockClients });

        render(
            <Router>
                <ClientList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Lista de Clientes')).toBeInTheDocument());

        // Verifica se os clientes foram renderizados
        expect(screen.getByText('Empresa A')).toBeInTheDocument();
        expect(screen.getByText('Empresa B')).toBeInTheDocument();
    });

    test('renders error message on fetch failure', async () => {
        getClients.mockRejectedValueOnce(new Error('Erro ao buscar clientes'));

        render(
            <Router>
                <ClientList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Erro ao buscar clientes')).toBeInTheDocument());
    });

    test('navigates back when "Voltar" button is clicked', async () => {
        getClients.mockResolvedValueOnce({ data: mockClients });
        const mockNavigate = jest.fn();

        // Mock useNavigate hook
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Router>
                <ClientList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Lista de Clientes')).toBeInTheDocument());

        userEvent.click(screen.getByText('Voltar'));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
