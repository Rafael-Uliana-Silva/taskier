import React from 'react'
import styled from 'styled-components';
import Logo from "../assets/Logo.svg?react"
import icnQuadro from "../assets/icnQuadro.svg?react"
import icnQuadroRoxo from "../assets/icnQuadroRoxo.svg"
import icnHide from "../assets/icnHide.svg"
import icnLight from "../assets/icnLight.svg"
import icnDark from "../assets/icnDark.svg"

const StyledSidebar = styled.div`
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: #323033;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #707070;
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
` 
  const StyledList = styled.ul`
    padding: 15px 0;
    margin-left: -15px;
    max-height: 300px;
    overflow-y: auto;
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
  .current {
    overflow-x: visible;
    width: 90%;
    background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
    background-clip: padding-box;
    color: #fff;
    padding: 10px 0px;
    padding-left: 15px;
    border-radius: 0px 20px 20px 0px;
  }
  .current:hover {
    box-shadow: 0 0 8px rgba(166,67,136,0.4), 0 0 16px rgba(166,67,136,0.3), 0 0 24px rgba(166,67,136,0.2);
  }
`

const StyledLogo = styled(Logo)`
  margin-bottom: 40px;
`

const IcnQuadro = styled(icnQuadro)`
  margin-right: 10px;
  path {
    fill: currentColor;
  }

`

const QuadrosContainer = styled.div`
`

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
`

const ThemeSlider = styled.input`
  appearance: none;
  width: 45px;
  border-radius: 20px;
  padding: 2px;
  margin: 0px 20px;
  background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
  cursor: pointer;
  transition:  0.3s ease, box-shadow 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    background: #fff;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    transition:  0.3s ease, transform 0.3s ease;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
  }
`

const Sidebar = () => {
  return (
    <StyledSidebar >
      <QuadrosContainer>
        <StyledLogo />
          <h3>Todos os quadros (3)</h3>
          <StyledList >
            <li className='current'><IcnQuadro />Quadro 1</li>
            <li><IcnQuadro />Quadro 2</li>
            <li><IcnQuadro />Quadro 3</li>
          </StyledList>
        <p><img src={icnQuadroRoxo} alt="Quadro" /><span>+ Criar Novo Quadro</span></p>
      </QuadrosContainer>
      <SwitchTheme>
        <div>
          <img src={icnLight} alt="Claro" />
          <ThemeSlider
              type="range"
              min="0"
              max="1"
          />
          <img src={icnDark} alt="Escuro" />
        </div>
        <p><img src={icnHide} alt="Esconder" />Esconder Barra</p>
      </SwitchTheme>
    </StyledSidebar>
  )
}

export default Sidebar;
