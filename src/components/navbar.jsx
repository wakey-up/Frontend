import React, { useState, useEffect } from 'react'; // Import useState dan useEffect
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk status otentikasi

  // useEffect untuk mengecek status otentikasi saat komponen dimuat atau berubah
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set true jika token ada, false jika tidak
  }, []); // [] agar hanya berjalan sekali saat mount

  // Fungsi untuk Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Hapus token dari localStorage
    setIsAuthenticated(false); // Update state otentikasi
    alert('Anda telah berhasil logout!'); 
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-[#f3e2c7] to-[#f39c12] font-serif shadow-md">
      <div className="text-xl font-bold text-black">Awakey</div>
      <ul className="flex gap-8 list-none m-0 p-0">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-[#e67e22] font-bold'
                : 'text-black font-normal hover:text-[#2c3e50] transition-colors duration-300'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/fitur"
            className={({ isActive }) =>
              isActive
                ? 'text-[#e67e22] font-bold'
                : 'text-black font-normal hover:text-[#2c3e50] transition-colors duration-300'
            }
          >
            Fitur
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-[#e67e22] font-bold'
                : 'text-black font-normal hover:text-[#2c3e50] transition-colors duration-300'
            }
          >
            About
          </NavLink>
        </li>
        {isAuthenticated ? ( // Kondisi: Jika user sudah login
          <li>
            <button
              onClick={handleLogout} // Panggil fungsi handleLogout saat diklik
              className="text-black font-normal hover:text-[#2c3e50] transition-colors duration-300
                         bg-transparent border-none cursor-pointer text-base p-0" // Styling untuk membuatnya terlihat seperti link
            >
              Logout
            </button>
          </li>
        ) : ( // Kondisi: Jika user belum login
          <> {/* Fragment untuk mengelompokkan multiple elements */}
            {/* <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#e67e22] font-bold'
                    : 'text-black font-normal hover:text-[#2c3e50] transition-colors duration-300'
                }
              >
                Login
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'text-[#e67e22] font-bold'
                    : 'text-black font-normal hover:text-[#2c3e50] transition-colors duration-300'
                }
              >
                Daftar
              </NavLink>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;