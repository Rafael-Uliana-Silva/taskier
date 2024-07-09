import React from 'react'
import { ModalForm, BtnCriar } from './FormStyle'

const FormQuadro = () => {
  return (
    <ModalForm action='#'>
      <label htmlFor="title">Título do quadro</label>
      <input type="text" placeholder='Ex: Codificar Interface'/>
      <BtnCriar className='btn'>
        <p>Criar Quadro</p>
      </BtnCriar>
    </ModalForm>
  )
}

export default FormQuadro
