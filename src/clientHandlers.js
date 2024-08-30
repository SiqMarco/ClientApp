import { createClient, deleteClient, updateClient } from './services/clientService';

export const handleEdit = (
    setDeleteSuccess, setSuccessMessage, setEditMessage, setIsSubmitDisabled
) => {
    setDeleteSuccess(null);
    setSuccessMessage(null);
    setIsSubmitDisabled(false);
    setEditMessage('Editando cliente...');
};

export const handleSubmit = async (
    event, client, setSuccessMessage, setClientResponse, setIsSubmitDisabled, setDeleteSuccess, setEditMessage, setError
) => {
    event.preventDefault();
    try {
        const response = await createClient(client);
        setClientResponse(response.data);
        setIsSubmitDisabled(true);
        setDeleteSuccess(null);
        setEditMessage(null);
        setSuccessMessage('Cliente cadastrado com sucesso!');
    } catch (err) {
        setError('Erro ao cadastrar cliente.');
    }
};

export const handleDelete = async (
    clientId,
    setIsSubmitDisabled,
    setDeleteSuccess,
    setSuccessMessage,
    setError
) => {
    if(!validateClientId(clientId, setError)) return;
    try {
        await deleteClient(clientId);
        setDeleteSuccess('Cliente excluído com sucesso!');
        setIsSubmitDisabled(true);
        setSuccessMessage(null);
    } catch (err) {
        setError('Erro ao excluir cliente.');
        setSuccessMessage(null);
    }
};

export const handleUpdate = async (
    clientId, client, setUpdateSuccess, setEditMessage, setIsSubmitDisabled, setDeleteSuccess, setError
) => {
    if(!validateClientId(clientId, setError)) return;
    try {
        await updateClient(clientId, client);
        setUpdateSuccess('Cliente atualizado com sucesso!');
        setEditMessage(null);
        setIsSubmitDisabled(true);
        setDeleteSuccess(null);
    } catch (err) {
        setError('ERRO ao atualizar cliente.');
    }
};

export const validateClientId = (clientId, setError) => {
    if (!clientId) {
        setError('ID do cliente deve ser informado');
        return false;
    }
    return true;
}