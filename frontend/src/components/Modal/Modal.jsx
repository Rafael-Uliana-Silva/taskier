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


const Modal = ({ fecharModal, type, quadroId, colunaId, tarefa}) => {
  const clickOutside = (event) => {
    if (event.target === event.currentTarget) {
      fecharModal();
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <ModalContainer onClick={clickOutside}>
      <ModalContent>
        <CloseButton onClick={fecharModal}>X</CloseButton>
        {type === 'quadro' && (<FormQuadro refreshPage={refreshPage} />)}
        {type === 'tarefa' && (<FormTarefa quadroId={quadroId} refreshPage={refreshPage} />)}
        {type === 'coluna' && (<FormColuna quadroId={quadroId} refreshPage={refreshPage} />)}
        {type === 'task' && tarefa && (<ViewTarefa tarefa={tarefa} quadroId={quadroId} colunaId={colunaId} refreshPage={refreshPage} />)}
        {type === 'quadroPatch' && (<FormQuadroPatch quadroId={quadroId} refreshPage={refreshPage} />)}
        {type === 'tarefaPatch' && (<FormTarefaPatch quadroId={quadroId} refreshPage={refreshPage} />)}
        {type === 'colunaPatch' && (<FormColunaPatch quadroId={quadroId} colunaId={colunaId} refreshPage={refreshPage} />)}
      </ModalContent>
    </ModalContainer>
  );
};

Modal.propTypes = {
  refreshPage: PropTypes.func,
  fecharModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  quadroId: PropTypes.string, 
  colunaId: PropTypes.string, 
  tarefa: PropTypes.object,
};

export default Modal;
