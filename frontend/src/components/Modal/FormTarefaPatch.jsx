import React from 'react';
import { ModalForm, BtnCriar, BtnSubTask, SubTask, BtnDeletar } from './FormStyle';
import PropTypes from 'prop-types';
import axios from 'axios';

const FormTarefaPatch = ({ quadroId, colunaId, tarefa }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [subtasks, setSubtasks] = React.useState([]);

  const urlTarefa = `http://localhost:5005/quadros/${quadroId}/colunas/${colunaId}/tarefas/${tarefa._id}`

  React.useEffect(() => {
    const fetchTarefaData = async () => {
      try {
        const response = await axios.get(urlTarefa);
        const { title, description, subtasks } = response.data;
        setTitle(title);
        setDescription(description);
        setSubtasks(subtasks);
      } catch (error) {
        console.error('Erro ao buscar dados da tarefa:', error);
      }
    };

    fetchTarefaData();
  }, [urlTarefa, quadroId]);

  const handleSubtaskAdd = (event) => {
    event.preventDefault(); 
    setSubtasks([...subtasks, '']);
  }

  const handleSubTaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubTask = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedTask = {
      title,
      description,
      subtasks
    };

    try {
      await axios.patch(urlTarefa, updatedTask);
      window.location.reload();
    } catch (err) {
      console.error('Erro ao atualizar a tarefa:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(urlTarefa);
      window.location.reload();
    } catch (err) {
      console.error('Erro ao excluir a tarefa:', err);
    }
  };

  return (
    <ModalForm onSubmit={handleSubmit}>
      <label htmlFor="task">Título da tarefa</label>
      <input 
        type="text" 
        placeholder='Ex: Codificar Interface' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="desc">Descrição</label>
      <textarea 
        name="desc" 
        id="desc" 
        placeholder='Ex: Terminar o código da interface da aplicação'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="Title">Subtarefas</label>
      {subtasks.map((subtask, index) => (
        <SubTask key={index} className='subtask'>
        <input 
          type="text"
          value={subtask.title}
          onChange={(e) => handleSubTaskChange(index, e.target.value)}
        />
        <span onClick={() => handleRemoveSubTask(index)}>X</span>
      </SubTask>
      ))}
      <BtnSubTask className='btn alt' onClick={handleSubtaskAdd}>
        <p>Adicionar Subtarefa </p>
      </BtnSubTask>
      <BtnCriar className='btn' type="submit">
        <p>Salvar Alterações</p>
      </BtnCriar>
      <BtnDeletar className='btn btn-delete' type="button" onClick={handleDelete}>
        <p>Excluir Tarefa</p>
      </BtnDeletar>
    </ModalForm>
  );
};

FormTarefaPatch.propTypes = {
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
};

export default FormTarefaPatch;
