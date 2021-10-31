import React, { useState, useEffect } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import './App.css'

function App () {
  const [user, setUser] = useState('')

  // REDUX

  return (
    <div>
      <Switch>
      <Route path="/" exact>
          <Home user={user}/>
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>

      <Route path="/about">
          <About />
        </Route>

      </Switch>
    </div>
  )
}

export default App
