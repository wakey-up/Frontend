import React from 'react';
import suciImg from '../assets/suci.jpg'; 
import kifatulImg from '../assets/kifatul.jpg'; 
import febyImg from '../assets/feby.jpg'; 
import hadiImg from '../assets/hadi.jpg'; 
import tedyImg from '../assets/tedi.jpg'; 

const teamMembers = [
  { name: 'Suci Ramadhani Lubis', id: 'FC774D5X1094', image: suciImg, role: 'Front End and Back End' },
  { name: 'Teddy Edwar', id: 'FC774D5Y0959', image: tedyImg, role: 'Front End and Back End' },
  { name: 'Kifatul Najmi', id: 'MC774D5Y2133', image: kifatulImg, role: 'Machine Learning' },
  { name: 'Abdul Hadi', id: 'MC774D5Y0606', image: hadiImg, role: 'Machine Learning' },
  { name: 'Anggun Febrianti', id: 'MC295D5X2452', image: febyImg, role: 'Machine Learning' },
];

const About = () => {
  return (
    <section className="min-h-screen py-12 px-6 text-center font-sans bg-gradient-to-br from-yellow-50 to-orange-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-12">
        Meet Our Team
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative w-52 md:w-56 p-6 bg-white rounded-xl shadow-lg 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                       overflow-hidden group" // Added group for hover effects on children
          >
            {/* Gradient Overlay for the card background */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 opacity-60 rounded-xl"
            ></div>
            
            {/* Awakey Badge */}
            <div
              className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full 
                         bg-yellow-400 text-white shadow-md transform -rotate-6 
                         group-hover:rotate-0 transition-transform duration-300"
            >
              Awakey
            </div>

            {/* Member Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mx-auto mt-6 mb-4 
                         border-4 border-white shadow-md transform 
                         group-hover:scale-110 transition-transform duration-300 z-10 relative"
            />
            
            {/* Member Details */}
            <div className="relative z-10"> {/* Ensure text is above the gradient */}
              <div className="text-sm text-gray-600 font-semibold mb-1">ID: {member.id}</div>
              <div className="text-lg font-bold text-gray-800 mb-2">{member.name}</div>
              <div
                className="text-sm px-4 py-1 inline-block 
                           bg-yellow-200 text-yellow-800 font-medium rounded-full 
                           shadow-sm group-hover:bg-yellow-300 transition-colors duration-300"
              >
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;