import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { DndContext, closestCenter, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { HomeContainer, NovaColuna } from './HomeStyle.jsx';
import { ColunaContainer, ColunaContent, TarefaContent, IcnGear } from './ColunaStyle.jsx';
import SortableItem from './SortableItem';

const Codigo = ({ recolherSide, abrirModal, setQuadroId }) => {
  const { id } = useParams();
  const [colunas, setColunas] = React.useState([]);

  React.useEffect(() => {
    setQuadroId(id);
    const fetchDadosQuadro = async () => {
      try {
        const response = await axios.get(`https://taskier-mern-app.onrender.com/quadros/${id}`);
        setColunas(response.data.columns || []);
      } catch (err) {
        console.log('Erro ao buscar dados do quadro:', err);
      }
    };

    fetchDadosQuadro();
  }, [id, setQuadroId]);

  const handleTarefaClick = (colunaId, tarefa) => {
    abrirModal('task', tarefa, colunaId); 
  };

  const handleEditColunaClick = (colunaId) => {
    abrirModal('colunaPatch', null, colunaId); 
  };

  const updateColumnOrder = async (newColunas) => {
    try {
      const columnOrder = newColunas.map(coluna => coluna._id);
      await axios.patch(`https://taskier-mern-app.onrender.com/quadros/${id}/updateordem`, { columnOrder });
    } catch (err) {
      console.error('Erro ao atualizar a ordem das colunas:', err);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = colunas.findIndex(coluna => coluna._id === active.id);
      const newIndex = colunas.findIndex(coluna => coluna._id === over.id);
      const newColunas = arrayMove(colunas, oldIndex, newIndex);

      setColunas(newColunas);
      updateColumnOrder(newColunas);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 82, 
        tolerance: 2000, 
      },
    })
  );
  
  return (
    <HomeContainer $recolherSide={recolherSide}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={colunas.map(coluna => coluna._id)} strategy={verticalListSortingStrategy}>
          <ColunaContainer>
            {colunas.map(coluna => {
              const isDraggable = coluna.tasks.every(task => !task.noDnd);
              return (
                <SortableItem key={coluna._id} id={coluna._id} isDraggable={isDraggable}>
                  <ColunaContent>
                    <div className='titleFlex'>
                      <h2>
                        <span className='circle' style={{ backgroundColor: coluna.color }}></span>
                        {coluna.title}
                      </h2>
                      <IcnGear
                        data-no-dnd="true"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditColunaClick(coluna._id);
                        }}
                      />
                    </div>
                    {Array.isArray(coluna.tasks) && coluna.tasks.length > 0 && (
                      coluna.tasks.map((task, taskIndex) => (
                        <TarefaContent
                          data-no-dnd="true"
                          key={taskIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTarefaClick(coluna._id, task);
                          }}
                        >
                          <p>{task.title}</p>
                          <p><span>{task.subtasks.filter(subtask => subtask.completed).length} de {task.subtasks.length} subtarefas</span></p>
                        </TarefaContent>
                      ))
                    )}
                  </ColunaContent>
                </SortableItem>
              );
            })}
          </ColunaContainer>
        </SortableContext>
      </DndContext>
      <NovaColuna onClick={() => abrirModal('coluna')}>
        <h2>+ Criar Coluna</h2>
      </NovaColuna>
    </HomeContainer>
  );
};

Codigo.propTypes = {
  recolherSide: PropTypes.bool.isRequired,
  abrirModal: PropTypes.func.isRequired,
  setQuadroId: PropTypes.func.isRequired,
};

export default Codigo;
