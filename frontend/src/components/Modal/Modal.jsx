import React from 'react';
import {ModalContainer, ModalContent, CloseButton} from './ModalStyle.jsx'
import PropTypes from 'prop-types';
import FormQuadro from './FormQuadro';
import FormTarefa from './FormTarefa';
import FormColuna from './FormColuna';
import ViewTarefa from './ViewTarefa';
import FormQuadroPatch from './FormQuadroPatch';
import FormColunaPatch from './FormColunaPatch';
import FormTarefaPatch from './FormTarefaPatch';


const Modal = ({ abrirModal, fecharModal, type, quadroId, colunaId, tarefa}) => {
  const clickOutside = (event) => {
    if (event.target === event.currentTarget) {
      fecharModal();
    }
  };

  return (
    <ModalContainer onClick={clickOutside}>
      <ModalContent>
        <CloseButton onClick={fecharModal}>X</CloseButton>
        {type === 'quadro' && (<FormQuadro />)}
        {type === 'coluna' && (<FormColuna quadroId={quadroId} />)}
        {type === 'tarefa' && (<FormTarefa quadroId={quadroId} />)}
        {type === 'task' && tarefa && (<ViewTarefa tarefa={tarefa} quadroId={quadroId} colunaId={colunaId} abrirModal={abrirModal}/>)}
        {type === 'quadroPatch' && (<FormQuadroPatch quadroId={quadroId} />)}
        {type === 'colunaPatch' && (<FormColunaPatch quadroId={quadroId} colunaId={colunaId} />)}
        {type === 'tarefaPatch' && (<FormTarefaPatch quadroId={quadroId} colunaId={colunaId} tarefa={tarefa}/>)}
      </ModalContent>
    </ModalContainer>
  );
};

Modal.propTypes = {
  refreshPage: PropTypes.func,
  abrirModal: PropTypes.func.isRequired,
  fecharModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  quadroId: PropTypes.string, 
  colunaId: PropTypes.string, 
  tarefa: PropTypes.object,
};

export default Modal;
