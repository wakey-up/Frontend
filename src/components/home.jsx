import React from 'react';
import sleepingImg from '../assets/logo_awakey.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Section */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              Awakey
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto lg:mx-0 rounded-full"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
              <span className="font-bold text-yellow-700">Awakey</span> adalah aplikasi berbasis web yang membantu memantau tingkat kewaspadaan pengemudi secara real-time melalui kamera.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Dengan mendeteksi kondisi mata dan wajah, sistem akan memberikan peringatan otomatis saat tanda-tanda kantuk terdeteksi, guna mencegah kecelakaan di jalan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/fitur">
              <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <span>Coba Sekarang</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            {/* <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-600 font-bold rounded-full hover:bg-yellow-50 transition-all duration-300">
              Pelajari Lebih Lanjut
            </button> */}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-yellow-200">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600">99%</div>
              <div className="text-sm text-gray-600">Akurasi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-600">Real-time</div>
              <div className="text-sm text-gray-600">Detection</div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-30 scale-110"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
              <img 
                src={sleepingImg} 
                alt="Awakey Logo" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-orange-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;