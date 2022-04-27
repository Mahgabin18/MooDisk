import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from "./components/MainPage";
import WordSearch from "./components/WordSearch";
import User from "./pages/User"

const App = () => {
  return (
       <div>
            <Router>
                  <Routes>
                  <Route exact path="/register" element={<Register />} />
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/wordsearch" element={<WordSearch />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route path="/userpage" element={<User />} />
                  </Routes>
            </Router>
      </div>
  );
}

export default App