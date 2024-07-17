import styled from 'styled-components';
import IcnOpt from '../../assets/icnOpt.svg?react';

const MainHeader = styled.header`
  transition: 0.5s;
  position: fixed;
  right: 0;
  top: 0;
  width: ${({ $recolherSide }) => $recolherSide ? 'calc(100% - 180px)' : 'calc(100% - 340px)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #323033;
  padding: 15px 30px;
  border-bottom: 1px solid #707070;
  z-index: 1000;
`;

const IconOption = styled(IcnOpt)`
  transition: 0.3s;
  cursor: pointer;
  margin-left: 15px;
  padding: 3px;
  &:hover {
    filter: drop-shadow(0 0 10px #707070);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export { MainHeader, ButtonContainer, IconOption };
