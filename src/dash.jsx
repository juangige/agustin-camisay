import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './db/firebase.js'; // Asegúrate de importar la configuración de Firestore
import './Dashboard.css'; // Puedes agregar estilos opcionales aquí

function Dashboard() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = () => {
      const guestsCollection = collection(db, 'guests');
      const unsubscribe = onSnapshot(guestsCollection, (snapshot) => {
        const guestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuests(guestsData);
        setLoading(false);
      });
      return unsubscribe;
    };

    fetchGuests();
  }, []);

  if (loading) {
    return <p>Cargando invitados...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Lista de Invitados</h2>
      <table className="guests-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.status}</td> {/* Aquí mostrará el estado del invitado */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
