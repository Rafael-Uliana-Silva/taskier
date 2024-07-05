import React from 'react';
import PropTypes from "prop-types";
import { StyledSidebar, QuadrosContainer, StyledLogo, StyledList, IcnQuadro, SwitchTheme, ThemeSlider } from './SidebarStyle.jsx';
import { icnQuadroRoxo, icnHide, icnLight, icnDark } from "./SidebarIcons.jsx";

const Sidebar = ({ recolherSide, toggleSidebar }) => {
  return (
    <StyledSidebar recolherSide={recolherSide}>
      {!recolherSide && (
        <QuadrosContainer>
          <StyledLogo />
          <h3>Todos os quadros (3)</h3>
          <StyledList>
            <li className='current'><IcnQuadro />Quadro 1</li>
            <li><IcnQuadro />Quadro 2</li>
            <li><IcnQuadro />Quadro 3</li>
          </StyledList>
          <p>
            <img src={icnQuadroRoxo} alt="Quadro" />
            <span>+ Criar Novo Quadro</span>
          </p>
        </QuadrosContainer>
      )}
      <SwitchTheme>
        {!recolherSide && (
          <div>
            <img src={icnLight} alt="Claro" />
            <ThemeSlider type="range" min="0" max="1" />
            <img src={icnDark} alt="Escuro" />
          </div>
        )}
        <p onClick={toggleSidebar}>
          <img src={icnHide} alt="Esconder" />{recolherSide ? "Expandir" : "Colapsar Barra"}
        </p>
      </SwitchTheme>
    </StyledSidebar>
  );
};

Sidebar.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
