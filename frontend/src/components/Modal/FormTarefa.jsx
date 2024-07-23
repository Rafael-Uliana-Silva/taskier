import React from 'react'
import { ModalForm, BtnCriar, BtnSubTask, SubTask, InputColunas} from './FormStyle'

const FormTarefa = () => {
  const [subtasks, setSubtasks] = React.useState([]);

  const handleSubtaskAdd = (event) => {
    event.preventDefault(); // Prevenir comportamento padrão do botão
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

  return (
    <ModalForm>
      <label htmlFor="task">Título da tarefa</label>
      <input type="text" placeholder='Ex: Codificar Interface'/>
      <label htmlFor="desc">Descrição</label>
      <textarea name="desc" id="desc" placeholder='Ex: Terminar o código da interface da aplicação'></textarea>
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
      <InputColunas name="colunas" id="colunas">
        <option value="coluna 1">Coluna 1</option>
        <option value="coluna 1">Coluna 2</option>
        <option value="coluna 1">Coluna 3</option>
      </InputColunas>
      <BtnCriar className='btn'>
        <p>Criar Tarefa</p>
      </BtnCriar>
    </ModalForm>
  )
}

export default FormTarefa
