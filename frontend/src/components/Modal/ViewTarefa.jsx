import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ModalForm, InputColunas, CheckBox, BtnCriar } from './FormStyle';

const ViewTarefa = ({ tarefa, onUpdateTarefa, quadroId, colunaId, abrirModal }) => {
  const [subtasks, setSubtasks] = React.useState(tarefa.subtasks);
  const [colunas, setColunas] = React.useState([]);
  const [selectedColunaId, setSelectedColunaId] = React.useState('');

  React.useEffect(() => {
    const fetchColunas = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/quadros/${quadroId}`);
        setColunas(response.data.columns);
      } catch (err) {
        console.error(err);
      }
    };
    fetchColunas();
  }, [quadroId]);

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

  const handleColunaChange = async (event) => {
    const newColunaId = event.target.value;
    setSelectedColunaId(newColunaId);

    try {
      await axios.patch(`http://localhost:5005/quadros/${quadroId}/colunas/${colunaId}/tarefas/${tarefa._id}/move`, {
        newColunaId: newColunaId
      });
      window.location.assign(`/quadros/${quadroId}`);
    } catch (error) {
      console.error('Erro ao mover a tarefa', error);
    }
  };

  if (!tarefa || !Array.isArray(subtasks)) {
    return <p>Dados da tarefa inválidos</p>;
  }

  return (
    <ModalForm>
      <h1>{tarefa.title}</h1>
      <p className='desc'><span>Descrição:</span> {tarefa.description}</p>
      <label htmlFor="subtasks">Subtarefas ({subtasks.filter(subtask => subtask.completed).length} de {subtasks.length})</label>
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
      <label htmlFor="colunas">Mover para a coluna:</label>
      <InputColunas 
        name="colunas" 
        id="colunas" 
        value={selectedColunaId} 
        onChange={handleColunaChange}
      >
        <option value="">Selecione uma coluna</option>
        {colunas.map(coluna => (
          <option key={coluna._id} value={coluna._id}>{coluna.title}</option>
        ))}
      </InputColunas>
      <BtnCriar className='btn' onClick={() => abrirModal('tarefaPatch', tarefa, colunaId)}>
        <p>Atualizar Tarefa</p>
      </BtnCriar>
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
  abrirModal: PropTypes.func.isRequired,
};

export default ViewTarefa;
