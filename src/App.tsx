import './App.scss'
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./pages/Main.tsx";

function App() {
  return (
      <Router>
          <Routes>
                <Route path="/" element={<Main />} />
          </Routes>
      </Router>
  )
}

export default App
