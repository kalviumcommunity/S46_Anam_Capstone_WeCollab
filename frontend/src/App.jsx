import Home from "./components/Home"
import Form from "./components/Form"
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:form" element={<Form/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
