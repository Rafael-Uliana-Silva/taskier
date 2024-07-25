import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalForm, InputColunas } from './FormStyle';
import { CheckBox } from './FormStyle';

const ViewTarefa = ({ tarefa, onUpdateTarefa }) => {
  const [subtasks, setSubtasks] = useState(tarefa.subtasks);

  const handleCheckboxChange = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);

    if (onUpdateTarefa) {
      onUpdateTarefa({ ...tarefa, subtasks: updatedSubtasks });
    }
  };

  if (!tarefa || !Array.isArray(subtasks)) {
    return <p>Dados da tarefa inválidos</p>;
  }

  return (
    <ModalForm>
      <h1>{tarefa.title}</h1>
      <p className='desc'><span>Descrição:</span> {tarefa.description}</p>
      <label htmlFor="subtasks">Subtasks ({subtasks.filter(subtask => subtask.completed).length} de {subtasks.length})</label>
      {subtasks.map((subtask, index) => (
        <CheckBox key={index}>
          <input 
            type="checkbox"
            id={`subtask${index}`}
            name={`subtask${index}`}
            checked={subtask.completed}
            onChange={() => handleCheckboxChange(index)}
          />
          <label htmlFor={`subtask${index}`}>{subtask.title}</label>
        </CheckBox>
      ))}
      <InputColunas />
    </ModalForm>
  );
};

ViewTarefa.propTypes = {
  tarefa: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    subtasks: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
  onUpdateTarefa: PropTypes.func, // Função opcional para lidar com atualizações
};

export default ViewTarefa;
