import React, { useState } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from './db/firebase.js'; // Asegúrate de importar Firebase Firestore
import './App.css';

function indexApp() {
    const [searchInput, setSearchInput] = useState("");
    const [guest, setGuest] = useState(null);
    const [guestId, setGuestId] = useState(""); // Guardar el ID del invitado
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const handleSearch = async () => {
      try {
        const q = query(collection(db, "guests"), where("name", "==", searchInput));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const guestDoc = querySnapshot.docs[0];
          setGuest(guestDoc.data());
          setGuestId(guestDoc.id); // Guardar el ID del documento
          setShowModal(true);
        } else {
          setError("Invitado no encontrado.");
        }
      } catch (err) {
        setError("Error buscando invitado: " + err.message);
      }
    };
  
    const handleResponse = async (status) => {
      try {
        // Actualizar el campo `status` en el documento de Firestore
        const guestRef = doc(db, "guests", guestId);
        await updateDoc(guestRef, { status });
        console.log(`Estado actualizado: ${status}`);
        setShowModal(false);
      } catch (err) {
        console.error("Error al actualizar el estado: ", err);
        setError("Error al actualizar el estado.");
      }
    };
  

  return (
    <div>
      <div className="container">
        <div className="title">
          <h1>MIS +18</h1>
          <h2>AGUSTIN CAMISAY</h2>
        </div>
        <div className="description">
          <p>Te invito a festejar mi cumpleaños en</p>
          <p>Av.1 N° 1622 e/ 65 y Pza Matheu</p>
          <p>SALON AZUL</p>
          <p>- ELEGANTE SPORT -</p>
          <p>No olvides confirmar con un mínimo de 72 horas</p>
        </div>
        <div className="date">
          <p>Viernes 22 de Noviembre</p>
          <p>21:00 hs</p>
        </div>
        <div className="guestlist">
          <p>BUSCA TU NOMBRE EN LA SIGUIENTE LISTA</p>
          <div className="search-container">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div id="result"></div>

        {/* Modal para seleccionar estado */}
        {showModal && (
          <div className="modal">
            <h3>{guest.name}, ¿Asistirás al evento?</h3>
            <button onClick={() => handleResponse('aceptado')}>Aceptar invitación</button>
            <button onClick={() => handleResponse('rechazado')}>Rechazar invitación</button>
            <button onClick={() => handleResponse('pendiente')}>Pendiente</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default indexApp;