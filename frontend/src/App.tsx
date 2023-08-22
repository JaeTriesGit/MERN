import React, { useEffect, useState } from 'react';
import * as NotesApi from './network/notes_api'
import './App.css';
import SignUp from './components/signup'
import Navbar from './components/navbar'
import Login from './components/login'
import {User} from './models/user'
import NotesLogged from './components/NotesLogged'
import NotesOut from './components/NotesOut'

function App() {

  const [loggedUser, setLoggedUser] = useState<User|null>(null)

  const [showSign, setShowSign] = useState(false)

  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    async function fetchUser(){
      try{
        const CurrentUser = await NotesApi.getCurrentUser()
        setLoggedUser(CurrentUser)
      } catch(error){
        console.error(error)
      }
    }
    fetchUser()
  })

  return (
    <div className="Main">
      <Navbar 
        LoggedUser={loggedUser} 
        onSignUpClicked={() => {setShowSign(true); setShowLogin(false)}} 
        onLogInClicked={() => {setShowLogin(true); setShowSign(false)}} 
        onSignOut={() => setLoggedUser(null)} 
      />
      {showLogin && !loggedUser && <Login onDismiss={() => setShowSign(false)} onSuccess={(user) => {setLoggedUser(user); setShowSign(false)}}/> }
      {showSign && !loggedUser && <SignUp onDismiss={() => setShowLogin(false)} onSuccess={(user) => {setLoggedUser(user); setShowLogin(false)}}/> }
      {loggedUser ? <NotesLogged onSuccess={()=>{}}/> : <NotesOut/>}
    </div>
  );
}

//<Post/>

export default App;