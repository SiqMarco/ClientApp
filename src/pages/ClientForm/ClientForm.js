import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {handleSubmit, handleDelete, handleEdit, handleUpdate} from '../../clientHandlers'; // Importando as funções handleSubmit, handleDelete, handleEdit e handleUpdate

function ClientForm() {
    const [client, setClient] = useState({name: '', size: 'pequena'});
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [clientResponse, setClientResponse] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [editMessage, setEditMessage] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleContinue = () => {
        window.location.reload(); // Recarrega a página
    };

    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <div>
            <h1>Adicionar Cliente</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {successMessage && (
                <>
                    <p style={{color: 'green'}}>{successMessage}</p>
                    <p><strong>ID:</strong> {clientResponse.id}</p>
                </>
            )}

            {deleteSuccess && (
                <>
                    <p style={{color: 'green'}}>{deleteSuccess}</p>
                    <p><strong>ID:</strong> {clientResponse.id}</p>
                </>
            )}
            {editMessage && (
                <>
                    <p style={{color: 'green'}}>{editMessage}</p>
                    <p><strong>ID:</strong> {clientResponse.id}</p>
                </>
            )}

            {updateSuccess && (
                <>
                    <p style={{color: 'green'}}>{updateSuccess}</p>
                    <p><strong>ID:</strong> {clientResponse.id}</p>
                </>
            )}

            <form onSubmit={(event) => handleSubmit(
                event, 
                client, 
                setSuccessMessage, 
                setClientResponse, 
                setIsSubmitDisabled, 
                setDeleteSuccess, 
                setEditMessage, 
                setError)}>
                <div>
                    <label>Nome da Empresa:</label>
                    <input
                        type="text"
                        name="name"
                        value={client.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitDisabled} // Desabilita após o cadastro
                    />
                </div>
                <div>
                    <label>Porte da Empresa:</label>
                    <select
                        name="size"
                        value={client.size}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitDisabled} // Desabilita após o cadastro
                    >
                        <option value="pequena">Pequena</option>
                        <option value="media">Média</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>
                <button type="submit" disabled={isSubmitDisabled}>
                    Cadastrar Cliente
                </button>
            </form>
            <button type="button" onClick={handleBack}>Voltar</button>
            {successMessage && (
                <div>
                    <button type="button" onClick={handleContinue}>Continuar</button>
                    <button type="button" onClick={() => handleEdit(
                        setDeleteSuccess,
                        setSuccessMessage,
                        setEditMessage,
                        setIsSubmitDisabled
                    )}>Editar</button>
                    <button type="button" onClick={() => handleDelete(
                        clientResponse.id,
                        setIsSubmitDisabled,
                        setDeleteSuccess,
                        setSuccessMessage,
                        setError
                    )}>Excluir</button>
                </div>
            )}
            
            {deleteSuccess && (
                <div>
                    <button type="button" onClick={handleContinue}>Continuar</button>
                </div>
            )}
            {updateSuccess && (
                <div>
                    <button type="button" onClick={handleContinue}>Continuar</button>
                </div>
            )}
            {editMessage && (
                <div>
                    <button type="button" onClick={() => handleUpdate(
                        clientResponse.id,
                        client, 
                        setUpdateSuccess,
                        setEditMessage,
                        setIsSubmitDisabled,
                        setDeleteSuccess,
                        setError
                    )}>Atualizar
                    </button>
                </div>
            )}
        </div>
    );
}

export default ClientForm;
