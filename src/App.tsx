import './App.scss'
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./pages/Main.tsx";
import Impressum from "./pages/Impressum.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="*" element={<ErrorPage
                  title="Page Not Found"
                    message="The page you are looking for does not exist."
              />} />
          </Routes>
      </Router>
  )
}

export default App
