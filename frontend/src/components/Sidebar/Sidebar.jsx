import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { StyledSidebar, QuadrosContainer, StyledLogo, StyledList, IcnQuadro, SwitchTheme, ThemeSlider } from './SidebarStyle.jsx';
import { icnQuadroRoxo, icnHide, icnLight, icnDark } from "./SidebarIcons.jsx";

const Sidebar = ({ recolherSide, toggleSidebar, abrirModal, tema, setTema }) => {
  const [quadros, setQuadros] = React.useState([]);

  React.useEffect(() => {
    const fetchQuadros = async () => {
      try {
        const response = await axios.get("http://localhost:5005/quadros");
        setQuadros(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuadros();
  }, []);

  const handleTema = (event) => {
    const temaAtual = event.target.value === "1" ? "dark" : "light";
    setTema(temaAtual);
  };

  return (
    <StyledSidebar $recolherSide={recolherSide}>
      {!recolherSide && (
        <QuadrosContainer>
          <StyledLogo />
          <h3>Todos os quadros ({quadros.length})</h3>
          <StyledList>
            {quadros.map((quadro) => (
              <NavLink
                to={`/quadros/${quadro._id}`}
                key={quadro._id}
                className="nav-link"
              >
                {({ isActive }) => (
                  <li className={isActive ? 'active' : ''}>
                    <IcnQuadro /> {quadro.title}
                  </li>
                )}
              </NavLink>
            ))}
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
            <ThemeSlider
              type="range"
              min="0"
              max="1"
              value={tema === "dark" ? '1' : '0'}
              onChange={handleTema}
            />
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
  tema: PropTypes.string.isRequired,
  setTema: PropTypes.func.isRequired,
};

export default Sidebar;
