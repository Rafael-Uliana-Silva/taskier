import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import FormQuadro from './FormQuadro';
import FormTarefa from './FormTarefa';
import FormColuna from './FormColuna';

const slideDown = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: #323033;
  padding: 20px;
  color: #fff;
  border-radius: 20px;
  font-family: Inter;
  animation: ${slideDown} 0.3s ease-out;
`;

const CloseButton = styled.button`
  font-family: Inter;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: 0.5s;
  &&:hover {
    text-shadow: 0px 0px 6px #fff;
  }
`;

const Modal = ({ fecharModal, type, quadroId }) => {
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
        {type === 'tarefa' && (<FormTarefa />)}
        {type === 'coluna' && (<FormColuna quadroId={quadroId} />)}
      </ModalContent>
    </ModalContainer>
  );
};

Modal.propTypes = {
  fecharModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  quadroId: PropTypes.string, // Permite que seja opcional
};

export default Modal;
