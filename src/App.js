import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from '../src/pages/ClientList/ClientList';
import ClientForm from '../src/pages/ClientForm/ClientForm';
import ClientDetail from '../src/pages/ClienDetail/ClientDetail';
import HomePage from '../src/pages/HomePage/HomePage';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client-form" element={<ClientForm />} />
            <Route path="/client-list" element={<ClientList />} />
            <Route path="/client-detail" element={<ClientDetail />} />
        </Routes>
      </Router>
  );
}
export default App;
