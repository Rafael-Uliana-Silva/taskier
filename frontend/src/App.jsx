import React from 'react'
import Home from './components/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Modal from './components/Modal/Modal.jsx'

const App = () => {
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
    <div>
      <Header recolherSide={recolherSide} abrirModal={() => abrirModal("tarefa")}/>
      <Sidebar recolherSide={recolherSide} toggleSidebar={toggleSidebar} abrirModal={() => abrirModal("quadro")}/>
      <Home recolherSide={recolherSide} abrirModal={() => abrirModal("coluna")}/>
      {modalAberto && <Modal fecharModal={fecharModal} type={modalType}/>}
    </div>
  )
}

export default App;
