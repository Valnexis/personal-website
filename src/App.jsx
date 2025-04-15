import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nuruma from '../src/pages/Nuruma';
import Home from '../src/pages/Home';


function App() {

  return (
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuruma" element={<Nuruma />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
