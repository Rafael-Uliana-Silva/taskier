import React from 'react'
import PropTypes from 'prop-types'
import { HomeContainer, NovaColuna } from './HomeStyle.jsx'

const Home = ({ recolherSide, abrirModal }) => {

  return (
    <HomeContainer $recolherSide={recolherSide}>
      <NovaColuna onClick={() => abrirModal('quadro')}>
        <h2>Comece criando um quadro</h2>  
      </NovaColuna>  
    </HomeContainer>
  )
}

Home.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
  abrirModal: PropTypes.func.isRequired,
};

export default Home;
