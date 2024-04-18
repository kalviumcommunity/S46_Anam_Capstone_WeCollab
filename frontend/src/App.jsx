import Hero from "./components/Hero"
import Form from "./components/Form"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Setting from "./components/Setting"
import AuthError from "./components/AuthError"
import ProjectDetail from "./components/ProjectDetail"
import PostProject from "./components/PostProject"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/:form" element={<Form/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/setting" element={<Setting/>} />
          <Route path="/google/oauth" element={<AuthError/>} />
          <Route path="/project" element={<ProjectDetail/>} />
          <Route path="/project/create" element={<PostProject/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
