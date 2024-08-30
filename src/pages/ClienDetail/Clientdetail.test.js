import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientDetail from './ClientDetail';
import { getClientById } from '../../services/clientService';
import { handleUpdate, handleDelete } from '../../clientHandlers';

jest.mock('../../services/clientService');
jest.mock('../../clientHandlers', () => ({
    handleUpdate: jest.fn(),
    handleDelete: jest.fn(),
    validateClientId: jest.fn(() => true),
}));

describe('ClientDetail Component', () => {
    const mockClient = { id: 1, name: 'Empresa Teste', size: 'media' };

    beforeEach(() => {
        getClientById.mockResolvedValue({ data: mockClient });
    });

    test('renders the initial form elements', () => {
        render(
            <Router>
                <ClientDetail />
            </Router>
        );

        // Verifica se os elementos principais do formulário estão presentes
        expect(screen.getByPlaceholderText('Digite o ID do cliente')).toBeInTheDocument();
        expect(screen.getByText('Buscar')).toBeInTheDocument();
    });

    test('fetches and displays client data on search', async () => {
        render(
            <Router>
                <ClientDetail />
            </Router>
        );

        // Simula a entrada do ID e o clique no botão de busca
        fireEvent.change(screen.getByPlaceholderText('Digite o ID do cliente'), { target: { value: '1' } });
        fireEvent.click(screen.getByText('Buscar'));

        // Aguarda a exibição dos dados do cliente
        await waitFor(() => {
            expect(screen.getByText('Detalhes do Cliente')).toBeInTheDocument();
            expect(screen.getByText('Empresa Teste')).toBeInTheDocument();
            expect(screen.getByText('Média')).toBeInTheDocument();
        });
    });

    test('displays error message when client is not found', async () => {
        getClientById.mockRejectedValueOnce(new Error('Cliente não encontrado'));

        render(
            <Router>
                <ClientDetail />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Digite o ID do cliente'), { target: { value: '2' } });
        fireEvent.click(screen.getByText('Buscar'));

        // Aguarda e verifica a mensagem de erro
        await waitFor(() => {
            expect(screen.getByText('Cliente não encontrado')).toBeInTheDocument();
        });
    });

    test('calls handleUpdate when the update button is clicked', async () => {
        render(
            <Router>
                <ClientDetail />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Digite o ID do cliente'), { target: { value: '1' } });
        fireEvent.click(screen.getByText('Buscar'));

        await waitFor(() => {
            fireEvent.click(screen.getByText('Atualizar Cliente'));
            expect(handleUpdate).toHaveBeenCalledWith(
                mockClient.id,
                mockClient,
                expect.any(Function),
                expect.any(Function),
                expect.any(Function),
                expect.any(Function),
                expect.any(Function)
            );
        });
    });

    test('calls handleDelete when the delete button is clicked', async () => {
        render(
            <Router>
                <ClientDetail />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Digite o ID do cliente'), { target: { value: '1' } });
        fireEvent.click(screen.getByText('Buscar'));

        await waitFor(() => {
            fireEvent.click(screen.getByText('Excluir Cliente'));
            expect(handleDelete).toHaveBeenCalledWith(
                mockClient.id,
                expect.any(Function),
                expect.any(Function),
                expect.any(Function),
                expect.any(Function)
            );
        });
    });
});
