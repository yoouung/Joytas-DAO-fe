import './App.css'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { URL } from './static'
import Login from './pages/login/Login'
import Lounge from './pages/lounge/Lounge'
import Terms from './pages/policy/Terms'
import Privacy from './pages/policy/Privacy'
import FirstProfile from './pages/user/FirstProfile'
import ModifyProfile from './pages/user/ModifyProfile'
import UserDelete from './pages/user/UserDelete'
import NewLounge from './pages/lounge/NewLounge'

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route path={URL.home} element={<Login />}></Route>
          <Route path={URL.lounge} element={<Lounge />}></Route>
          <Route path={URL.newLounge} element={<NewLounge />}></Route>
          <Route path={URL.terms} element={<Terms />}></Route>
          <Route path={URL.delete} element={<UserDelete />}></Route>
          <Route path={URL.privacy} element={<Privacy />}></Route>
          <Route path={URL.firstProfile} element={<FirstProfile />}></Route>
          <Route path={URL.modifyProfile} element={<ModifyProfile />}></Route>
        </Routes>
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  border: 1px solid gray;
  overflow: hidden;
  background-color: black;
`

export default App
