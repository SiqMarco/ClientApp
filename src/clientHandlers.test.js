import { createClient, deleteClient, updateClient } from './services/clientService';
import {
    handleEdit,
    handleSubmit,
    handleDelete,
    handleUpdate,
    validateClientId
} from './clientHandlers';

// Mocking the service functions
jest.mock('./services/clientService');

describe('clientHandlers', () => {
    let setDeleteSuccess, setSuccessMessage, setEditMessage, setIsSubmitDisabled;
    let setClientResponse, setError, setUpdateSuccess;

    beforeEach(() => {
        // Mocking the state setter functions
        setDeleteSuccess = jest.fn();
        setSuccessMessage = jest.fn();
        setEditMessage = jest.fn();
        setIsSubmitDisabled = jest.fn();
        setClientResponse = jest.fn();
        setError = jest.fn();
        setUpdateSuccess = jest.fn();
    });

    describe('handleEdit', () => {
        test('should set the correct states for editing a client', () => {
            handleEdit(setDeleteSuccess, setSuccessMessage, setEditMessage, setIsSubmitDisabled);
            expect(setDeleteSuccess).toHaveBeenCalledWith(null);
            expect(setSuccessMessage).toHaveBeenCalledWith(null);
            expect(setIsSubmitDisabled).toHaveBeenCalledWith(false);
            expect(setEditMessage).toHaveBeenCalledWith('Editando cliente...');
        });
    });

    describe('handleSubmit', () => {
        test('should submit the client and update states on success', async () => {
            const client = { id: 1, name: 'Empresa Teste', size: 'media' };
            createClient.mockResolvedValue({ data: client });

            const event = { preventDefault: jest.fn() };

            await handleSubmit(
                event,
                client,
                setSuccessMessage,
                setClientResponse,
                setIsSubmitDisabled,
                setDeleteSuccess,
                setEditMessage,
                setError
            );

            expect(event.preventDefault).toHaveBeenCalled();
            expect(createClient).toHaveBeenCalledWith(client);
            expect(setClientResponse).toHaveBeenCalledWith(client);
            expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
            expect(setDeleteSuccess).toHaveBeenCalledWith(null);
            expect(setEditMessage).toHaveBeenCalledWith(null);
            expect(setSuccessMessage).toHaveBeenCalledWith('Cliente cadastrado com sucesso!');
            expect(setError).not.toHaveBeenCalled();
        });

        test('should handle errors during client submission', async () => {
            const client = { id: 1, name: 'Empresa Teste', size: 'media' };
            createClient.mockRejectedValue(new Error('Erro ao cadastrar cliente.'));

            const event = { preventDefault: jest.fn() };

            await handleSubmit(
                event,
                client,
                setSuccessMessage,
                setClientResponse,
                setIsSubmitDisabled,
                setDeleteSuccess,
                setEditMessage,
                setError
            );

            expect(setError).toHaveBeenCalledWith('Erro ao cadastrar cliente.');
            expect(setSuccessMessage).not.toHaveBeenCalled();
        });
    });

    describe('handleDelete', () => {
        test('should delete the client and update states on success', async () => {
            deleteClient.mockResolvedValue();

            await handleDelete(1, setIsSubmitDisabled, setDeleteSuccess, setSuccessMessage, setError);

            expect(deleteClient).toHaveBeenCalledWith(1);
            expect(setDeleteSuccess).toHaveBeenCalledWith('Cliente excluído com sucesso!');
            expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
            expect(setSuccessMessage).toHaveBeenCalledWith(null);
            expect(setError).not.toHaveBeenCalled();
        });

        test('should handle errors during client deletion', async () => {
            deleteClient.mockRejectedValue(new Error('Erro ao excluir cliente.'));

            await handleDelete(1, setIsSubmitDisabled, setDeleteSuccess, setSuccessMessage, setError);

            expect(setError).toHaveBeenCalledWith('Erro ao excluir cliente.');
            expect(setSuccessMessage).toHaveBeenCalledWith(null);
        });

        test('should validate client ID before deleting', async () => {
            await handleDelete('', setIsSubmitDisabled, setDeleteSuccess, setSuccessMessage, setError);

            expect(setError).toHaveBeenCalledWith('ID do cliente deve ser informado');
            expect(deleteClient).not.toHaveBeenCalled();
        });
    });

    describe('handleUpdate', () => {
        test('should update the client and update states on success', async () => {
            const client = { id: 1, name: 'Empresa Teste', size: 'media' };
            updateClient.mockResolvedValue();

            await handleUpdate(1, client, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError);

            expect(updateClient).toHaveBeenCalledWith(1, client);
            expect(setUpdateSuccess).toHaveBeenCalledWith('Cliente atualizado com sucesso!');
            expect(setEditMessage).toHaveBeenCalledWith(null);
            expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
            expect(setDeleteSuccess).toHaveBeenCalledWith(null);
            expect(setError).not.toHaveBeenCalled();
        });

        test('should handle errors during client update', async () => {
            const client = { id: 1, name: 'Empresa Teste', size: 'media' };
            updateClient.mockRejectedValue(new Error('Erro ao atualizar cliente.'));

            await handleUpdate(1, client, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError);

            expect(setError).toHaveBeenCalledWith('ERRO ao atualizar cliente.');
            expect(setUpdateSuccess).not.toHaveBeenCalled();
        });

        test('should validate client ID before updating', async () => {
            await handleUpdate('', {}, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError);

            expect(setError).toHaveBeenCalledWith('ID do cliente deve ser informado');
            expect(updateClient).not.toHaveBeenCalled();
        });
    });

    describe('validateClientId', () => {
        test('should return false and set error message if client ID is not provided', () => {
            const result = validateClientId('', setError);
            expect(result).toBe(false);
            expect(setError).toHaveBeenCalledWith('ID do cliente deve ser informado');
        });

        test('should return true if client ID is provided', () => {
            const result = validateClientId('1', setError);
            expect(result).toBe(true);
            expect(setError).not.toHaveBeenCalled();
        });
    });
});
