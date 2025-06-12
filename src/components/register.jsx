import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // <-- Import axios

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State buat nampilin loading
  const [error, setError] = useState(''); // State buat nampilin pesan error
  const navigate = useNavigate();

  // URL API backend lo. Pastikan ini sesuai dengan port Hapi.js lo.
  // Jika backend lo jalan di http://localhost:3000, maka biarkan ini.
  // Jika di http://localhost:5000, ubah ke 5000.
  const API_URL = 'http://localhost:3000'; 

  const handleSubmit = async (e) => { // Tambahkan 'async' karena akan ada await
    e.preventDefault();
    setLoading(true); // Set loading jadi true pas mulai request
    setError(''); // Clear pesan error sebelumnya

    try {
      // Kirim username dan password ke endpoint /register di backend lo
      const response = await axios.post(`${API_URL}/register`, { 
        username: username,
        password: password,
      });

      console.log('Register successful:', response.data);
      alert('Registrasi berhasil! Silakan login.'); // Beri feedback ke user
      navigate('/login'); // Redirect ke halaman login setelah registrasi sukses

    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        // Backend merespons dengan status error (misal: 400 Bad Request, 409 Conflict)
        setError(err.response.data.message || 'Terjadi kesalahan saat registrasi. Silakan coba lagi.');
      } else if (err.request) {
        // Request dibuat tapi tidak ada respons (e.g., jaringan mati, backend belum jalan)
        setError('Tidak ada respons dari server. Pastikan backend berjalan dan koneksi internet Anda stabil.');
      } else {
        // Kesalahan tak terduga lainnya
        setError('Terjadi kesalahan tak terduga. Silakan coba lagi.');
      }
    } finally {
      setLoading(false); // Set loading jadi false setelah request selesai (sukses/gagal)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 font-sans relative overflow-hidden">
      <div className="relative bg-white shadow-xl rounded-3xl p-10 w-full max-w-md z-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
          Daftar ke <span className="text-orange-500">Awakey</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Pilih username" // Mengganti placeholder agar lebih sesuai
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
              placeholder="Buat password" // Mengganti placeholder agar lebih sesuai
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-orange-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && ( // Tampilkan pesan error kalo ada
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            disabled={loading} // Disable tombol saat loading
          >
            {loading ? 'Mendaftar...' : 'Daftar'} {/* Tampilkan teks loading */}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;