import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/ui/loginForm';
import HomePage from './components/HomePage';
import RegisterForm from './components/ui/registerForm';

const App = () => {
  const handleLogin= (email: string, password: string)=>{
    console.log('Logging in with', email, password);
  }
  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Registering with', name, email, password);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} /> 
      </Routes>
    </Router>
  );
};

export default App;