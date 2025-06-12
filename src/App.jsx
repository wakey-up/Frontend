import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Home from './components/home';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import About from './components/about';
import Fitur from './components/fitur';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  return (
    <Routes>
      {/* Layout utama dengan navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fitur" element={<Fitur />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Layout login tanpa navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
