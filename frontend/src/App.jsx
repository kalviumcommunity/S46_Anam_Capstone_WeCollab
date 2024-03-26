import Hero from "./components/Hero"
import Form from "./components/Form"
import Home from "./components/Home"
import Profile from "./components/Profile"
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
