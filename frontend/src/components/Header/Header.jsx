import React from 'react'
import PropTypes from "prop-types"
import { MainHeader, ButtonContainer, IconOption } from "./HeaderStyle.jsx"

const Header = ({ recolherSide }) => {
  return (
    <MainHeader recolherSide={recolherSide}>
      <h1>Quadro 1</h1>
      <ButtonContainer >
        <button className='btn'>+ Adicionar Tarefa</button>
        <IconOption />
      </ButtonContainer>
    </MainHeader>
  );
};

Header.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
};

export default Header;
