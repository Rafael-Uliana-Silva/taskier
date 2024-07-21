import React from 'react'
import { ModalForm, BtnCriar, InputColor } from './FormStyle'
import axios from "axios"

const FormColuna = () => {
  const [title, setTitle] = React.useState('');
  const [color, setColor] = React.useState('#ffffff');

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleColor = (event) => {
    setColor(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post("http://localhost:5005/quadros/colunas", { nome: title, cor: color }); 
      setTitle('');
      setColor('#ffffff');
    } catch (err) {
      console.error('Erro ao criar coluna:', err.response?.data || err.message);  
    } 
  }

  return (
    <ModalForm onSubmit={handleSubmit} action='#'>
      <label htmlFor="title">Título da coluna</label>
      <input
        type="text"
        placeholder='Ex: A fazer'
        value={title}
        onChange={handleTitle}
      />
      <label htmlFor="cor">Cor da coluna</label>
      <InputColor
        type="color"
        name="cor"
        id="cor"
        value={color}
        onChange={handleColor}
      />
      <BtnCriar className='btn' type='submit'>
        <p>Criar Coluna</p>
      </BtnCriar>
    </ModalForm>
  )
}

export default FormColuna
