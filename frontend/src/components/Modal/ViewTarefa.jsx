import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalForm, InputColunas } from './FormStyle';
import { CheckBox } from './FormStyle';
import axios from 'axios';

const ViewTarefa = ({ tarefa, onUpdateTarefa, quadroId, colunaId }) => {
  const [subtasks, setSubtasks] = useState(tarefa.subtasks);

  const handleCheckboxChange = async (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
    setSubtasks(updatedSubtasks);

    if (onUpdateTarefa) {
      onUpdateTarefa({ ...tarefa, subtasks: updatedSubtasks });
    }

    try {
      await axios.patch(`http://localhost:5005/quadros/${quadroId}/colunas/${colunaId}/tarefas/${tarefa._id}/subtasks/${updatedSubtasks[index]._id}`, {
        completed: updatedSubtasks[index].completed
      });
    } catch (error) {
      console.error('Erro ao atualizar a subtarefa', error);
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
  quadroId: PropTypes.string.isRequired,
  colunaId: PropTypes.string.isRequired,
  tarefa: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    subtasks: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
  onUpdateTarefa: PropTypes.func,
};

export default ViewTarefa;
