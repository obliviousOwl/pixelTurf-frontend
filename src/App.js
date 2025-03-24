import './App.css';
// import SocketComponent from './SocketComponent';
import GamePage from './pages/GamePage';
import BattleLog from './pages/BattleLog';
import { app } from "./firebase";
import AppNavBar from './components/AppNavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

console.log("🔎 Checking Firebase:", app);

function App() {
  return (
    <Router>
        <div className="App">
            <AppNavBar />
            <Routes>
                <Route path="/" element={<GamePage />}></Route>
                <Route path="/battleLog" element={<BattleLog />}></Route>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
