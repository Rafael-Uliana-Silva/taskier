import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ModalForm, BtnCriar, BtnDeletar } from './FormStyle';
import PropTypes from 'prop-types';

const FormQuadroPatch = ({ quadroId }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchQuadroData = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/quadros/${quadroId}`);
        setTitle(response.data.title || '');
      } catch (error) {
        console.error('Erro ao buscar dados do quadro:', error);
      }
    };

    fetchQuadroData();
  }, [quadroId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5005/quadros/${quadroId}`, {
        title
      });
    } catch (error) {
      console.error('Erro ao atualizar o quadro:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/quadros/${quadroId}`);
    } catch (error) {
      console.error('Erro ao excluir o quadro:', error);
    }
  };

  return (
    <ModalForm onSubmit={handleSubmit}>
      <label htmlFor="title">Título do quadro</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Ex: Quadro 1"
      />
      <BtnCriar className="btn" type="submit">
        <p>Salvar Alterações</p>
      </BtnCriar>
      <BtnDeletar type="button" onClick={handleDelete} className="btn btn-delete">
        <p>Excluir Quadro</p>
      </BtnDeletar>
    </ModalForm>
  );
};

FormQuadroPatch.propTypes = {
  quadroId: PropTypes.string.isRequired,
};

export default FormQuadroPatch;
