import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import './App.css';
import Welcome from './components/Welcome';
import ProjectList from './components/ProjectList';
import ProjectModel from './components/ProjectModel';
import { useState } from 'react';
import Project from './components/Project';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './components/Layout';

function App() {
  const [login, setLogin] = useState(true)
  const [user, setUser] = useState(null)
  
  return (
    <>
        <Router>
          <Navbar user= {user} setUser={setUser}/>
        <Layout>
          <Routes>
            <Route path='/' element={
              <>
                <Welcome/>
                <ProjectList/>
              </>
            }></Route>
            <Route path='/project/edit/:projectId' element={<ProjectModel/>}></Route>
            <Route path='/project/' element={<ProjectModel/>}></Route>
            <Route path='/project/:projectId' element={<Project/>}></Route>
            {!user &&<Route path='/auth' element={
              login ? (<Login setLogin={setLogin} setUser={setUser}/>) : (<SignUp setLogin={setLogin}/>)
              }></Route>}
            {/* <Route path='/project/:projectId' element={<TaskPage/>}></Route>
            <Route path='/project/addProject' element={<ProtectedRoute><AddProject/></ProtectedRoute>}></Route> */}
          </Routes>
        </Layout>
          <Footer/>
        </Router>
    </>
  );
}

export default App;
