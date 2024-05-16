import Hero from "./components/Hero"
import Form from "./components/Form"
import Home from "./components/Home"
import Profile from "./components/Profile"
import AuthError from "./components/AuthError"
import ProjectDetail from "./components/ProjectDetail"
import PostProject from "./components/PostForm"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import IdeaDetail from "./components/IdeaDetail"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/user/:form" element={<Form/>} />
          <Route path="/:section" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/ideas/:id" element={<IdeaDetail/>} />
          <Route path="/google/oauth" element={<AuthError/>} />
          <Route path="/project" element={<ProjectDetail/>} />
          <Route path="/post/:section" element={<PostProject/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
