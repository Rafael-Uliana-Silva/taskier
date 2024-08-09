import styled from 'styled-components';
import IcnOpt from '../../assets/icnOpt.svg?react';
import IcnShow from '../../assets/icnShow.svg?react';

const MainHeader = styled.header`
  transition: 0.5s;
  position: fixed;
  right: 0;
  top: 0;
  width: ${({ $recolherSide }) => $recolherSide ? 'calc(100% - 180px)' : 'calc(100% - 340px)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.background1};
  padding: 15px 30px;
  border-bottom: 1px solid #707070;
  z-index: 10;
  h1 {
    max-width: 500px;
    color: ${({ theme}) => theme.colorAlt};
  }
  @media (max-width: 480px) {
    width: 90%;
    right: 0;
  }
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

const IconShow = styled(IcnShow)`
  display: none;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 0 10px #707070);
  }
  @media (max-width: 480px) {
    display: inline-block;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  .btn-disabled {
  opacity: 0.5; 
  cursor: not-allowed; 
}
`;

export { MainHeader, ButtonContainer, IconOption, IconShow };
