import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dash.jsx';
import Home from './indexApp.jsx'; // Tu página principal, si tienes una

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para la página principal */}
        <Route path="/invitados" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;