import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ModalForm, BtnCriar, InputColor } from './FormStyle';

const FormColuna = ({ onColunaCreated, quadroId }) => {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#ffffff');
  const [loading, setLoading] = React.useState(false);

  const handleTitle = (event) => setTitle(event.target.value);
  const handleColor = (event) => setColor(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!quadroId) {
      console.error('ID não disponível');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`http://localhost:5005/quadros/${quadroId}/colunas`, { title, color });
      setTitle('');
      setColor('#ffffff');
      if (onColunaCreated) onColunaCreated();
      window.location.reload(); 
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm onSubmit={handleSubmit}>
      <label htmlFor="title">Título da coluna</label>
      <input
        type="text"
        placeholder='Ex: A fazer'
        value={title}
        onChange={handleTitle}
        disabled={loading}
      />
      <label htmlFor="cor">Cor da coluna</label>
      <InputColor
        type="color"
        name="cor"
        id="cor"
        value={color}
        onChange={handleColor}
        disabled={loading}
      />
      <BtnCriar className='btn' type='submit' disabled={loading}>
        <p>{loading ? 'Criando...' : 'Criar Coluna'}</p>
      </BtnCriar>
    </ModalForm>
  );
};

FormColuna.propTypes = {
  onColunaCreated: PropTypes.func,
  quadroId: PropTypes.string.isRequired, // Adicione isso
};

export default FormColuna;
