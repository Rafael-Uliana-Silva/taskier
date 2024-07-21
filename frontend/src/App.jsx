import React from 'react'
import Home from './components/Home/Home.jsx'
import QuadroBase from './components/Home/QuadroBase.jsx'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Modal from './components/Modal/Modal.jsx'
import { BrowserRouter, Routes, Route} from "react-router-dom"

const App = () => {
  const [headerTitle, setHeaderTitle] = React.useState("Taskier")
  const updateHeaderTitle = (novoTitle) => {
    setHeaderTitle(novoTitle)
  }

  const [recolherSide, setRecolherSide] = React.useState(false);
  const toggleSidebar = () => {
    setRecolherSide(!recolherSide)
  }
  const [modalAberto, setModalAberto] = React.useState(false);
  const [modalType, setModalType] = React.useState(null)
  const abrirModal = (type) => {
    setModalType(type);
    setModalAberto(true);
  }
  const fecharModal = () => setModalAberto(false)

  return (
    <BrowserRouter>
      <div>
        <Header recolherSide={recolherSide} abrirModal={() => abrirModal("tarefa")} titulo={headerTitle}/>
        <Sidebar 
        recolherSide={recolherSide} 
        toggleSidebar={toggleSidebar} 
        abrirModal={() => abrirModal("quadro")}
        updateHeaderTitle={updateHeaderTitle}
        />
          <Routes>
            <Route 
              path='/'
              element={<Home recolherSide={recolherSide} 
              abrirModal={() => abrirModal("coluna")}/>}
            >
            </Route>
            <Route 
              path='/quadros/:id'
              element={<QuadroBase recolherSide={recolherSide} 
              abrirModal={() => abrirModal("coluna")}/>}
            >
            </Route>
          </Routes>
        {modalAberto && <Modal fecharModal={fecharModal} type={modalType}/>}
      </div>
    </BrowserRouter>
  )
}

export default App;
