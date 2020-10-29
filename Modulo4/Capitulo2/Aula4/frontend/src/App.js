import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import GradeControl from './components/GradeControl';
import Spinner from './components/Spinner';

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

  const handleDelete = () => {
    console.log('handleDelete');
  };

  const handlePersist = () => {
    console.log('handle Persist');
  };

  return (
    <div>
      <h1 className="center"> Controle de notas</h1>

      {allGrades.length == 0 && <Spinner />}

      {allGrades.length > 0 && (
        <GradeControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}
