import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { HomeContainer, NovaColuna } from './HomeStyle.jsx';
import { ColunaContainer, ColunaContent, TarefaContent } from './Coluna.jsx';

const QuadroBase = ({ recolherSide, abrirModal, setQuadroId }) => {
  const { id } = useParams();
  const [dadosQuadro, setDadosQuadro] = React.useState({});
  const [colunas, setColunas] = React.useState([]);

  React.useEffect(() => {
    setQuadroId(id); 
    const fetchDadosQuadro = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/quadros/${id}`);
        setDadosQuadro(response.data);
        setColunas(response.data.columns || []);
      } catch (err) {
        console.log('Erro ao buscar dados do quadro:', err);
      }
    };

    fetchDadosQuadro();
  }, [id, setQuadroId]);

  return (
    <HomeContainer $recolherSide={recolherSide}>
      <ColunaContainer>
        {colunas.map(coluna => (
          <ColunaContent key={coluna._id}>
            <h2>
              <span className='circle' style={{ backgroundColor: coluna.color }}></span>
              {coluna.title}
            </h2>
            {Array.isArray(coluna.tasks) && coluna.tasks.length > 0 && (
              coluna.tasks.map((task, taskIndex) => (
                <TarefaContent key={taskIndex}>
                  <p>{task.title}</p>
                  <p><span>{task.subtasks ? task.subtasks.length : 0} subtasks</span></p>
                </TarefaContent>
              ))
            )}
          </ColunaContent>
        ))}
      </ColunaContainer>
      <NovaColuna onClick={() => abrirModal('coluna')}>
        <h2>Teste: {dadosQuadro.title}</h2>  
      </NovaColuna>  
    </HomeContainer>
  );
};

QuadroBase.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
  abrirModal: PropTypes.func.isRequired,
  setQuadroId: PropTypes.func.isRequired,
};

export default QuadroBase;
