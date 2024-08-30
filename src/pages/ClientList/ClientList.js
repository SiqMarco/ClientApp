import React, { useEffect, useState } from 'react';
import { getClients } from '../../services/clientService';
import {useNavigate} from "react-router-dom";

function ClientList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (err) {
                setError('Erro ao buscar clientes');
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <button onClick={handleBack}>Voltar</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome da Empresa</th>
                    <th>Porte da Empresa</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.size}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientList;
