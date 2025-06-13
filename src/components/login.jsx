import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // <-- Pastikan ini sudah terinstal: npm install axios

const Login = () => {
  // Ganti dari 'email' jadi 'username'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = 'https://backend-ek84.onrender.com'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Kirim username dan password ke API login backend lo
      const response = await axios.post(`${API_URL}/login`, { 
        username: username, // Ganti dari 'email' jadi 'username'
        password: password,
      });

      console.log('Login successful:', response.data);

      // Asumsi backend lo tetap ngirim token di field 'token'
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Simpan token di localStorage

      alert('Login berhasil!'); 
      navigate('/'); // Redirect ke halaman utama atau dashboard

    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        // Backend merespons dengan status error (e.g., 401, 409)
        // Pastikan pesan error dari backend relevan, misalnya err.response.data.message
        setError(err.response.data.message || 'Terjadi kesalahan saat login. Silakan coba lagi.');
      } else if (err.request) {
        // Request dibuat tapi tidak ada respons (e.g., jaringan mati, backend belum jalan)
        setError('Tidak ada respons dari server. Pastikan backend berjalan dan koneksi internet Anda stabil.');
      } else {
        // Kesalahan lain
        setError('Terjadi kesalahan tak terduga. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 font-sans relative overflow-hidden">
      <div className="relative bg-white shadow-xl rounded-3xl p-10 w-full max-w-md z-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
          Masuk ke <span className="text-orange-500">Awakey</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
              Username {/* Label di UI juga ganti */}
            </label>
            <input
              id="username"
              type="text" // Type tetap text
              placeholder="Masukkan username kamu"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-orange-400 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-orange-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Belum punya akun?{' '}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;