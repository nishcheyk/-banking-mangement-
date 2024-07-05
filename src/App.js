import './App.css';
import StartupPage from './pages/StartupPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (

      <Routes>
        <Route path="/" element={<StartupPage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>

  );
}

export default App;
