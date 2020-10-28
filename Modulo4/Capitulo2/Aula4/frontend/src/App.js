import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
  }, []);

  return (
    <div>
      <h1 className="center"> Controle de notas</h1>
      {allGrades.length > 0 && <p>Notas Disponíveis</p>}
      {allGrades.length == 0 && <p>Carregando notas... </p>}
    </div>
  );
}