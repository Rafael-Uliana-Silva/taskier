import styled from 'styled-components';
import Logo from '../../assets/Logo.svg?react';
import icnQuadro from '../../assets/icnQuadro.svg?react';

const StyledSidebar = styled.div`
  transition: 0.5s;
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $recolherSide }) =>  $recolherSide ? '100px' : '250px'};
  background: #323033;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #707070;
  z-index: 10;

  p {
    display: flex;
    align-items: center;
  }

  span {
    color: #7435A8;
    cursor: pointer;
    transition: 0.3s;
    padding-left: 10px;
  }

  span:hover {
    text-shadow: 0px 0px 10px #7435A8;
  }
`;

const StyledList = styled.ul`
  display: ${props => (props.isRecolher ? 'none' : 'block')};
  margin-left: -15px;
  margin-bottom: 30px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  li, p {
    color: #707070;
    margin: 30px 0;
    padding-left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
  }

  li:hover {
    text-shadow: 0px 0px 10px #707070;
  }

  p {
    font-weight: 700;
  }

  li.active {
    width: 80%;
    background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
    color: #fff;
    padding: 10px 0px 10px 5px;
    border-radius: 0px 20px 20px 0px;
  }

  .active:hover {
    box-shadow: 0 0 8px rgba(166,67,136,0.4), 0 0 16px rgba(166,67,136,0.3), 0 0 24px rgba(166,67,136,0.2);
  }
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 40px;
`;

const IcnQuadro = styled(icnQuadro)`
  width: 40px;
  margin-right: 5px;
  path {
    fill: currentColor;
  }
`;

const QuadrosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SwitchTheme = styled.div`
  padding-bottom: 30px;

  p {
    color: #707070;
    cursor: pointer;
    display: flex;
    transition: 0.3s;
  }

  p:hover {
    text-shadow: 0px 0px 10px #707070;
  }

  div {
    display: flex;
    justify-content: center;
    background: #292829;
    padding: 5px;
    border-radius: 20px;
    max-width: 80%;
    margin-bottom: 20px;
  }
`;

const ThemeSlider = styled.input`
  appearance: none;
  width: 45px;
  border-radius: 20px;
  padding: 2px;
  margin: 0px 20px;
  background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
  cursor: pointer;
  transition: 0.3s ease, box-shadow 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    background: #fff;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    transition: 0.3s ease, transform 0.3s ease;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
  }
`;

export { StyledSidebar, QuadrosContainer, StyledLogo, StyledList, IcnQuadro, SwitchTheme, ThemeSlider };
