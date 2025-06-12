import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar'; // Pastikan path ini benar
import Footer from '../components/footer'; // Pastikan path ini benar

const MainLayout = () => {
  const navigate = useNavigate();

  // useEffect untuk mengecek status otentikasi saat MainLayout dimuat
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    // Jika tidak ada token, user belum login, redirect ke halaman login
    if (!token) {
      navigate('/login', { replace: true }); // Redirect ke /login dan ganti history
    }
  }, [navigate]); // navigate sebagai dependency agar useEffect rerun jika navigate berubah (walaupun jarang)

  // Jika token ada, render Navbar, Outlet (child routes), dan Footer
  // Kalo belum ada token, navigate('/login') sudah akan mem-redirect
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar yang akan selalu terlihat di layout utama */}
      <main className="flex-grow">
        <Outlet /> {/* Ini akan merender Home, Fitur, About, dll. */}
      </main>
      <Footer /> {/* Footer yang akan selalu terlihat di layout utama */}
    </div>
  );
};

export default MainLayout;