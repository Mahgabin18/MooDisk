import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from "./components/MainPage";


const App = () => {
	return (
		<div>
		<Router>
            <Routes>
            <Route exact path="/" element={<Register/>} />
            <Route path="/main" element={<MainPage />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            </Routes>
      </Router>
		</div>
	)
}

export default App