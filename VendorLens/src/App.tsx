import {BrowserRouter,Routes,Route} from "react-router-dom"
import Landingpage from "./Landingpage"
import Loginpage from "./Loginpage"
import Dashboard from "./Dashboard"
import './App.css'

function App() {
 
  return (
 <>
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Landingpage/>} />
 <Route path="/Login" element={<Loginpage/>} />
 <Route path="/Dashboard" element={<Dashboard/>} />
 </Routes>
 </BrowserRouter>
 </>
  )
}

export default App
