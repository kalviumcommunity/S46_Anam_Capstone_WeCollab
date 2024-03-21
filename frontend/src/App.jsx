import Hero from "./components/Hero"
import Form from "./components/Form"
import Home from "./components/Home"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>} />
          <Route path="/:form" element={<Form/>} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
