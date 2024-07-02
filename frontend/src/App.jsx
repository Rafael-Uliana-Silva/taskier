import React from 'react'
import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'

const App = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <Home />
    </div>
  )
}

export default App;
