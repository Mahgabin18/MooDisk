import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'


const App = () => {
	return (
		<div>
		<Router>
            <Routes>
            <Route exact path="/" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            </Routes>
      </Router>
		</div>
	)
}

export default App