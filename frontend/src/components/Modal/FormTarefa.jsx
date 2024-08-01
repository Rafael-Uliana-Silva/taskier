import React, { useEffect, useState } from 'react';
import { ModalForm, BtnCriar, BtnSubTask, SubTask, InputColunas } from './FormStyle';
import PropTypes from 'prop-types';
import axios from 'axios';

const FormTarefa = ({ quadroId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [colunas, setColunas] = useState([]);
  const [selectedColunaId, setSelectedColunaId] = useState('');

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

    const newTask = {
      title,
      description,
      subtasks
    };

    try {
      const response = await axios.post(`http://localhost:5005/quadros/${quadroId}/colunas/${selectedColunaId}/tarefas`, newTask);
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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
            value={subtask}
            onChange={(e) => handleSubTaskChange(index, e.target.value)}
          />
          <span onClick={() => handleRemoveSubTask(index)}>X</span>
        </SubTask>
      ))}
      <BtnSubTask className='btn alt' onClick={handleSubtaskAdd}>
        <p>Adicionar Subtarefa </p>
      </BtnSubTask>
      <label htmlFor="colunas">Colunas</label>
      <InputColunas 
        name="colunas" 
        id="colunas" 
        value={selectedColunaId} 
        onChange={(e) => setSelectedColunaId(e.target.value)}
      >
        <option value="">Selecione uma coluna</option>
        {colunas.map(coluna => (
          <option key={coluna._id} value={coluna._id}>{coluna.title}</option>
        ))}
      </InputColunas>
      <BtnCriar className='btn'>
        <p>Criar Tarefa</p>
      </BtnCriar>
    </ModalForm>
  );
};

FormTarefa.propTypes = {
  quadroId: PropTypes.string.isRequired,
};

export default FormTarefa;
