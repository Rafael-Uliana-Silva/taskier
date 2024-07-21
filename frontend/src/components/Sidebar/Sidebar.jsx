import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { StyledSidebar, QuadrosContainer, StyledLogo, StyledList, IcnQuadro, SwitchTheme, ThemeSlider } from './SidebarStyle.jsx';
import { icnQuadroRoxo, icnHide, icnLight, icnDark } from "./SidebarIcons.jsx";

const Sidebar = ({ recolherSide, toggleSidebar, abrirModal, updateHeaderTitle }) => {
  const [quadros, setQuadros] = React.useState([]);

  const handleTitle = (title) => {
    updateHeaderTitle(title)
  }

  React.useEffect(() => {
    const fetchQuadros = async () => {
      try{
        const response = await axios.get("http://localhost:5005/quadros")
        setQuadros(response.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchQuadros()
  }, [])

  return (
    <StyledSidebar $recolherSide={recolherSide}>
      {!recolherSide && (
        <QuadrosContainer>
          <StyledLogo />
          <h3>Todos os quadros ({quadros.length})</h3>
          <StyledList>
            {quadros.map((quadro) => 
              <NavLink to={`/quadros/${quadro.name}`} key={quadro.id} onClick={() => handleTitle(quadro.name)}>
                <li className='current'><IcnQuadro /> {quadro.name}</li>
              </NavLink> 
            )}
          </StyledList>
          <p>
            <img src={icnQuadroRoxo} alt="Quadro" />
            <span onClick={abrirModal}>+ Criar Novo Quadro</span>
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
  abrirModal: PropTypes.func.isRequired,
  updateHeaderTitle: PropTypes.func.isRequired
};

export default Sidebar;
