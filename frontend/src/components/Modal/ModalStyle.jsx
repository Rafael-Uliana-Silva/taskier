import styled, { keyframes } from "styled-components";

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
  max-height: 500px ;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #323033;
  padding: 20px;
  color: #fff;
  border-radius: 20px 10px 10px 20px;
  font-family: Inter;
  animation: ${slideDown} 0.3s ease-out;
  &&::-webkit-scrollbar {
    background-color: #707070;
    border-radius: 0px 20px 20px 0px;
    width: 10px;
  }
  &&::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
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

export {ModalContainer, ModalContent, CloseButton}
