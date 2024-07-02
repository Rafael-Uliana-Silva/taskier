import React from 'react'
import styled from 'styled-components'
import IcnOpt from "../assets/icnOpt.svg?react"

const MainHeader = styled.header`
  position: fixed;
  right: 0;
  width: calc(100% - 341px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #323033;
  padding: 15px 30px;
  border-bottom: 1px solid #707070;
`
const IconOption = styled(IcnOpt)`
  transition: 0.3s ;
  cursor: pointer;
  margin-left: 15px;
  padding: 3px;
  &:hover {
    filter: drop-shadow(0 0 10px #707070)
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`


const Header = () => {
  return (
    <MainHeader >
      <h1>Quadro 1</h1>
      <ButtonContainer >
        <button className='btn'>+ Adicionar Tarefa</button>
        <IconOption />
      </ButtonContainer>
    </MainHeader>
  )
}

export default Header
