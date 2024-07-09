import React from 'react'
import { ModalForm, BtnCriar, InputColor } from './FormStyle'

const FormColuna = () => {
  return (
    <ModalForm action='#'>
      <label htmlFor="title">Título da coluna</label>
      <input type="text" placeholder='Ex: A fazer'/>
      <label htmlFor="cor">Cor da coluna</label>
      <InputColor type="color" name="cor" id="cor" />
      <BtnCriar className='btn'>
        <p>Criar Coluna</p>
      </BtnCriar>
    </ModalForm>
  )
}

export default FormColuna
