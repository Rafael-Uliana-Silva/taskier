import React from 'react';
import axios from 'axios';
import { ModalForm, BtnCriar, BtnDeletar, InputColor } from './FormStyle';
import PropTypes from 'prop-types';

const FormColunaPatch = ({ quadroId, colunaId }) => {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#ffffff');

  React.useEffect(() => {
    const fetchColunaData = async () => {
      try {
        const response = await axios.get(`https://taskier-mern-app.onrender.com/quadros/${quadroId}/colunas/${colunaId}`);
        setTitle(response.data.title);
        setColor(response.data.color);
      } catch (err) {
        console.log('Erro ao buscar dados da coluna:', err);
      }
    };

    fetchColunaData();
  }, [quadroId, colunaId]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://taskier-mern-app.onrender.com/quadros/${quadroId}/colunas/${colunaId}`, {
        title,
        color
      });
      window.location.reload();  
    } catch (error) {
      console.error('Erro ao atualizar a coluna:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://taskier-mern-app.onrender.com/quadros/${quadroId}/colunas/${colunaId}`);
      window.location.reload(); 
    } catch (error) {
      console.error('Erro ao excluir a coluna:', error);
    }
  };

  return (
    <ModalForm onSubmit={handleSubmit}>
      <label htmlFor="title">Título da coluna</label>
      <input
        type="text"
        placeholder='Ex: A fazer'
        value={title}
        onChange={handleTitleChange}
      />
      <InputColor
        type="color"
        name="cor"
        id="cor"
        value={color}
        onChange={handleColorChange}
      />
      <BtnCriar className="btn" type="submit">
        <p>Salvar Alterações</p>
      </BtnCriar>
      <BtnDeletar onClick={handleDelete} type="button" className="btn btn-delete">
        <p>Excluir Coluna</p>
      </BtnDeletar>
    </ModalForm>
  );
};

FormColunaPatch.propTypes = {
  quadroId: PropTypes.string.isRequired,
  colunaId: PropTypes.string.isRequired,
};

export default FormColunaPatch;
