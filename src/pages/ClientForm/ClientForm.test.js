// clientForm.test.js
import {
    handleEdit,
    handleSubmit,
    handleDelete,
    handleUpdate,
    validateClientId
} from './clientForm';
import { createClient, deleteClient, updateClient } from './services/clientService';

// Mocking the services
jest.mock('../../services/clientService');

describe('Client Form Tests', () => {
    let setDeleteSuccess, setSuccessMessage, setEditMessage, setIsSubmitDisabled, setError, setClientResponse, setUpdateSuccess;

    beforeEach(() => {
        // Mock the setter functions
        setDeleteSuccess = jest.fn();
        setSuccessMessage = jest.fn();
        setEditMessage = jest.fn();
        setIsSubmitDisabled = jest.fn();
        setError = jest.fn();
        setClientResponse = jest.fn();
        setUpdateSuccess = jest.fn();
    });

    test('handleEdit should reset messages and enable submit', () => {
        handleEdit(setDeleteSuccess, setSuccessMessage, setEditMessage, setIsSubmitDisabled);

        expect(setDeleteSuccess).toHaveBeenCalledWith(null);
        expect(setSuccessMessage).toHaveBeenCalledWith(null);
        expect(setIsSubmitDisabled).toHaveBeenCalledWith(false);
        expect(setEditMessage).toHaveBeenCalledWith('Editando cliente...');
    });

    test('handleSubmit should create a client successfully', async () => {
        const event = { preventDefault: jest.fn() };
        const client = { name: 'Test Client' };
        createClient.mockResolvedValueOnce({ data: client });

        await handleSubmit(event, client, setSuccessMessage, setClientResponse, setIsSubmitDisabled, setDeleteSuccess, setEditMessage, setError);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(createClient).toHaveBeenCalledWith(client);
        expect(setClientResponse).toHaveBeenCalledWith(client);
        expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
        expect(setDeleteSuccess).toHaveBeenCalledWith(null);
        expect(setEditMessage).toHaveBeenCalledWith(null);
        expect(setSuccessMessage).toHaveBeenCalledWith('Cliente cadastrado com sucesso!');
    });

    test('handleSubmit should handle error when creating a client', async () => {
        const event = { preventDefault: jest.fn() };
        const client = { name: 'Test Client' };
        createClient.mockRejectedValueOnce(new Error('Error'));

        await handleSubmit(event, client, setSuccessMessage, setClientResponse, setIsSubmitDisabled, setDeleteSuccess, setEditMessage, setError);

        expect(setError).toHaveBeenCalledWith('Erro ao cadastrar cliente.');
    });

    test('handleDelete should delete a client successfully', async () => {
        const clientId = '123';
        deleteClient.mockResolvedValueOnce();

        await handleDelete(clientId, setIsSubmitDisabled, setDeleteSuccess, setSuccessMessage, setError);

        expect(deleteClient).toHaveBeenCalledWith(clientId);
        expect(setDeleteSuccess).toHaveBeenCalledWith('Cliente excluído com sucesso!');
        expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
        expect(setSuccessMessage).toHaveBeenCalledWith(null);
    });

    test('handleDelete should handle error when deleting a client', async () => {
        const clientId = '123';
        deleteClient.mockRejectedValueOnce(new Error('Error'));

        await handleDelete(clientId, setIsSubmitDisabled, setDeleteSuccess, setSuccessMessage, setError);

        expect(setError).toHaveBeenCalledWith('Erro ao excluir cliente.');
        expect(setSuccessMessage).toHaveBeenCalledWith(null);
    });

    test('handleUpdate should update a client successfully', async () => {
        const clientId = '123';
        const client = { name: 'Updated Client' };
        updateClient.mockResolvedValueOnce();

        await handleUpdate(clientId, client, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError);

        expect(updateClient).toHaveBeenCalledWith(clientId, client);
        expect(setUpdateSuccess).toHaveBeenCalledWith('Cliente atualizado com sucesso!');
        expect(setEditMessage).toHaveBeenCalledWith(null);
        expect(setIsSubmitDisabled).toHaveBeenCalledWith(true);
        expect(setDeleteSuccess).toHaveBeenCalledWith(null);
    });

    test('handleUpdate should handle error when updating a client', async () => {
        const clientId = '123';
        const client = { name: 'Updated Client' };
        updateClient.mockRejectedValueOnce(new Error('Error'));

        await handleUpdate(clientId, client, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError);

        expect(setError).toHaveBeenCalledWith('ERRO ao atualizar cliente.');
    });

    test('validateClientId should return false if clientId is null', () => {
        const result = validateClientId(null, setError);
        expect(result).toBe(false);
        expect(setError).toHaveBeenCalledWith('ID do cliente deve ser informado');
    });

    test('validateClientId should return true if clientId is provided', () => {
        const result = validateClientId('123', setError);
        expect(result).toBe(true);
        expect(setError).not.toHaveBeenCalled();
    });
});
