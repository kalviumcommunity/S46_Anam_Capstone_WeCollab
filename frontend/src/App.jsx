import Hero from "./components/Hero"
import Form from "./components/Form"
import Home from "./components/Home"
import Profile from "./components/Profile"
import AuthError from "./components/AuthError"
import ProjectDetail from "./components/ProjectDetail"
import PostProject from "./components/PostForm"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import IdeaDetail from "./components/IdeaDetail"
import ShowcaseDetail from "./components/ShowcaseDetail"
import Chat from "./components/Chat"
import Project from "./components/Project"
import Showcase from "./components/Showcase"
import Idea from "./components/Idea"
import Setting from "./components/Setting"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/user/:form" element={<Form/>} />
          <Route path="/home" element={<Home/>} >
            <Route path="" element={<Project/>} />
            <Route path="showcase" element={<Showcase/>} />
            <Route path="ideas" element={<Idea/>} />
            <Route path="settings" element={<Setting/>} />
            <Route path="chat/:id?" element={<Chat/>} />
          </Route>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/ideas/:id" element={<IdeaDetail/>} />
          <Route path="/google/oauth" element={<AuthError/>} />
          <Route path="/project/:id" element={<ProjectDetail/>} />
          <Route path="/post/:section" element={<PostProject/> } />
          <Route path="/showcase/:id" element={<ShowcaseDetail/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
