import React from 'react'
import Home from './components/Home.jsx'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'

const App = () => {
  const [recolherSide, setRecolherSide] = React.useState(false);

  const toggleSidebar = () => {
    setRecolherSide(!recolherSide)
  }

  return (
    <div>
      <Sidebar recolherSide={recolherSide} toggleSidebar={toggleSidebar}/>
      <Header recolherSide={recolherSide}/>
      <Home />
    </div>
  )
}

export default App;
