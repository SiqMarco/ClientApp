import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Página Inicial</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/client-form">Cadastrar Cliente</Link>
                    </li>
                    <li>
                        <Link to="/client-list">Listar Clientes</Link>
                    </li>
                    <li>
                        <Link to="/client-detail">Detalhes do Cliente</Link>
                    </li>
                    {/* Adicione mais links conforme necessário */}
                </ul>
            </nav>
        </div>
    );
}

export default HomePage;
