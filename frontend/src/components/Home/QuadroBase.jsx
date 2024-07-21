import React from 'react'
import PropTypes from "prop-types"
import axios from 'axios'
import { HomeContainer, NovaColuna } from './HomeStyle.jsx'
import { useParams } from 'react-router-dom'

const QuadroBase = ({ recolherSide, abrirModal }) => {
  const { id } = useParams();
  const [dadosQuadro, setDadosQuadro] = React.useState([]);
  
  React.useEffect(() => {

    const fetchDadosQuadro = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/quadros/${id}`)
        setDadosQuadro(response.data)
      } catch (err) {
        console.log(err)
      }
    };

    fetchDadosQuadro()
  }, [id])

  return (
    <HomeContainer $recolherSide={recolherSide}>
    <NovaColuna onClick={abrirModal}>
      <h2>Teste: {dadosQuadro.name}</h2>  
    </NovaColuna>  
  </HomeContainer>
  )
}

QuadroBase.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
  abrirModal: PropTypes.func.isRequired,
}

export default QuadroBase
