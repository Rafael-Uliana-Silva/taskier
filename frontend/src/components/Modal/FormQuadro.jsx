import React from 'react';
import { ModalForm, BtnCriar } from './FormStyle';
import axios from 'axios';

const FormQuadro = () => {
  const [title, setTitle] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();  
    setLoading(true);  
    try {
      const response = await axios.post("http://localhost:5005/quadros", { title });
      console.log("Resposta do servidor:", response.data);
      setTitle('');
    } catch (err) {
      console.error("Erro ao criar quadro:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalForm onSubmit={handleSubmit}>
      <label htmlFor="title">Título do quadro</label>
      <input
        type="text"
        id='title'
        value={title}
        onChange={handleTitle}
        placeholder='Ex: Quadro 1'
        disabled={loading} 
      />
      <BtnCriar className='btn' type='submit' disabled={loading}>
        <p>{loading ? 'Criando...' : 'Criar Quadro'}</p>
      </BtnCriar>
    </ModalForm>
  );
}

export default FormQuadro;
