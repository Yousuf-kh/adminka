import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
  )
}

export default App