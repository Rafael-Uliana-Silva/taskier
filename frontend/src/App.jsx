import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme.jsx';
import GlobalStyle from "./globalStyled.jsx";
import Home from './components/Home/Home.jsx';
import QuadroBase from './components/Home/QuadroBase.jsx';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Modal from './components/Modal/Modal.jsx';
import NotFound from './components/Home/NotFound.jsx';

const App = () => {
  const [tema, setTema] = React.useState(() => {
    const temaSalvo = localStorage.getItem("tema");
    return temaSalvo ? temaSalvo : "dark";
  });

  const theme = tema === "dark" ? darkTheme : lightTheme;

  React.useEffect(() => {
    localStorage.setItem("tema", tema);
  }, [tema]);

  const [recolherSide, setRecolherSide] = React.useState(false);
  const [modalAberto, setModalAberto] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);
  const [quadroId, setQuadroId] = React.useState(null);
  const [colunaId, setColunaId] = React.useState(null);
  const [tarefaSelecionada, setTarefaSelecionada] = React.useState(null);
  const isMobile = window.innerWidth <= 768; 

  const toggleSidebar = () => {
    setRecolherSide(!recolherSide);
  };

  const abrirModal = (type = null, tarefa = null, colunaId = null) => {
    setModalType(type);
    setTarefaSelecionada(tarefa);
    setColunaId(colunaId);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTarefaSelecionada(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <div>
          <Header
            recolherSide={recolherSide}
            abrirModal={abrirModal}
            quadroId={quadroId}
          />
        {!isMobile && (  
          <Sidebar
            recolherSide={recolherSide}
            toggleSidebar={toggleSidebar}
            abrirModal={() => abrirModal('quadro')}
            tema={tema}
            setTema={setTema}
            isMobile={false}
          />
        )}
          <Routes>
            <Route
              path='*'
              element={<NotFound />}
            />
            <Route
              path='/'
              element={<Home recolherSide={recolherSide} abrirModal={abrirModal} />}
            />
            <Route
              path='/quadros/:id'
              element={<QuadroBase recolherSide={recolherSide} abrirModal={abrirModal} setQuadroId={setQuadroId} />}
            />
          </Routes>
          {modalAberto && (
            <Modal
              abrirModal={abrirModal}
              fecharModal={fecharModal}
              type={modalType}
              quadroId={quadroId}
              colunaId={colunaId}
              tarefa={tarefaSelecionada}
              isMobile={true}
              tema={tema}   
              setTema={setTema}
            />
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
