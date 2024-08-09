import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MainHeader, ButtonContainer, IconOption, IconShow } from './HeaderStyle.jsx';

const Header = ({ recolherSide, abrirModal, quadroId }) => {
  const [quadroTitle, setQuadroTitle] = React.useState('');
  const [hasColumns, setHasColumns] = React.useState(false); 

  React.useEffect(() => {
    const fetchQuadros = async () => {
      if (!quadroId) return; 

      try {
        const response = await axios.get(`https://taskier-mern-app.onrender.com/quadros/${quadroId}`);
        setQuadroTitle(response.data.title);
        setHasColumns(response.data.columns.length > 0); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuadros();
  }, [quadroId]);

  return (
    <MainHeader $recolherSide={recolherSide}>
      <h1>{quadroTitle} <span><IconShow onClick={() => abrirModal('sidebarMobile')}/></span></h1>
      <ButtonContainer>
        <button className={`btn ${!hasColumns ? 'btn-disabled' : ''}`} onClick={() => abrirModal('tarefa')} disabled={!hasColumns}>
          + Adicionar Tarefa
        </button>
        <IconOption onClick={() => abrirModal('quadroPatch')} />
      </ButtonContainer>
    </MainHeader>
  );
};

Header.propTypes = {
  quadroId: PropTypes.string,
  recolherSide: PropTypes.bool.isRequired,
  abrirModal: PropTypes.func.isRequired,
};

export default Header;
