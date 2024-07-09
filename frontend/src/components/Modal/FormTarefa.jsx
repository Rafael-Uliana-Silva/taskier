import React from 'react'
import { ModalForm, BtnCriar, BtnSubTask } from './FormStyle'

const FormTarefa = () => {
  return (
    <ModalForm >
      <label htmlFor="task">Título da tarefa</label>
      <input type="text" placeholder='Ex: Codificar Interface'/>
      <label htmlFor="desc">Descrição</label>
      <textarea name="desc" id="desc"  placeholder='Ex: Terminar o código da interface da aplicação'></textarea>
      <label htmlFor="Title">Subtarefas</label>
      <input type="text" placeholder='Ex: Codificar Interface'/>
      <BtnSubTask className='btn alt'>
        <p>Adicionar Subtarefa </p>
      </BtnSubTask>
      <BtnCriar className='btn'>
        <p>Criar Tarefa</p>
      </BtnCriar>
    </ModalForm>
  )
}

export default FormTarefa
