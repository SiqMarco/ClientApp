import React, { useState } from 'react';
import { getClientById } from '../../services/clientService';
import { useNavigate } from 'react-router-dom';
import {handleUpdate, handleDelete, validateClientId} from '../../clientHandlers';

function ClientDetail() {
    const [id, setId] = useState('');
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [editMessage, setEditMessage] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setId(e.target.value);
    };

    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    const handleSearch = async () => {
        if(!validateClientId(id, setError)) return;
        try {
            setError(null);
            const response = await getClientById(id);
            setClient(response.data);
            setIsSubmitDisabled(false);
            setUpdateSuccess(null);
            setDeleteSuccess(null);
        } catch (err) {
            setClient(null);
            setError('Cliente não encontrado');
        }
    };

    return (
        <div>
            <h1>Consultar Cliente por ID</h1>
            <input
                type="text"
                value={id}
                onChange={handleInputChange}
                placeholder="Digite o ID do cliente"
            />
            <button onClick={handleSearch}>Buscar</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {updateSuccess && <p style={{ color: 'green' }}>{updateSuccess}</p>}
            {deleteSuccess && <p style={{ color: 'green' }}>{deleteSuccess}</p>}
            {editMessage && <p style={{ color: 'blue' }}>{editMessage}</p>}

            {client && (
                <div>
                    <h2>Detalhes do Cliente</h2>
                    <p><strong>ID:</strong> {client.id}</p>
                    <p><strong>Nome da Empresa:</strong> {client.name}</p>
                    <p><strong>Porte da Empresa:</strong> {client.size}</p>
                    <div>
                        <label>Editar Nome:</label>
                        <input
                            type="text"
                            value={client.name}
                            onChange={(e) => setClient({ ...client, name: e.target.value })}
                        />
                        <label>Editar Porte:</label>
                        <select
                            value={client.size}
                            onChange={(e) => setClient({ ...client, size: e.target.value })}
                        >
                            <option value="pequena">Pequena</option>
                            <option value="media">Média</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>
                </div>
            )}
            <div>
                <button onClick={handleBack}>Voltar</button>
                <button
                    disabled={isSubmitDisabled}
                    onClick={() => handleUpdate(
                        client.id,
                        client,
                        setUpdateSuccess,
                        setEditMessage,
                        setIsSubmitDisabled,
                        setDeleteSuccess,
                        setError
                    )}
                >Atualizar Cliente
                </button>
                <button
                    disabled={isSubmitDisabled}
                    onClick={() => handleDelete(
                        client.id,
                        setIsSubmitDisabled,
                        setDeleteSuccess,
                        setSuccessMessage,
                        setError,
                    )}
                >Excluir Cliente
                </button>
            </div>
        </div>
    );
}

export default ClientDetail;
