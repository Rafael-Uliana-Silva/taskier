import React from 'react'
import styled from 'styled-components';
import Logo from "../assets/Logo.svg?react"
import icnQuadro from "../assets/icnQuadro.svg?react"
import icnQuadroRoxo from "../assets/icnQuadroRoxo.svg"
import icnHide from "../assets/icnHide.svg"

const StyledSidebar = styled.div`
  position: fixed;
  overflow-y: auto;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: #323033;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #707070;
  img {
    margin-right: 10px;
  }
  span {
    color: #7435A8;
    cursor: pointer;
  }
` 
  const StyledList = styled.ul`
  max-height: 500px;
  li, p {
    color: #707070;
    margin: 20px 0;
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
    background: linear-gradient(-135deg, rgba(116,53,168,1) 0%, rgba(166,67,136,1) 100%);
    background-clip: unset;
    margin-left: -15px;
    color: #fff;
    padding: 10px 15px;
    border-radius: 0px 20px 20px 0px;
    position: abs;
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

const Sidebar = () => {
  return (
    <StyledSidebar >
      <div>
      <StyledLogo />
        <h3>Todos os quadros (3)</h3>
        <StyledList >
          <li className='current'><IcnQuadro />Quadro 1</li>
          <li><IcnQuadro />Quadro 2</li>
          <li><IcnQuadro />Quadro 3</li>

        </StyledList>
        <p><img src={icnQuadroRoxo} alt="Quadro" /><span>+ Criar Novo Quadro</span></p>
      </div>
      <div>
        <p><img src={icnHide} alt="Esconder" />Esconder Barra</p>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar;
