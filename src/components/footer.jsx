import React from 'react';

const Footer = () => {
  return (
    <footer
      className="flex flex-col md:flex-row items-start justify-start gap-16 p-4 text-[#1a1a1a] font-serif"
      style={{
        background: 'linear-gradient(to right, #f1d6a1, #fbb03b)',
      }}
    >
      <div>
        <h2 className="text-xl font-bold m-0">Awakey</h2>
        <p className="mt-2 leading-relaxed">
          2025
          <br />
          All rights reserved.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <a href="/" className="font-medium hover:underline">
          Home
        </a>
        <a href="/fitur" className="font-medium hover:underline">
          Fitur
        </a>
        <a href="/about" className="font-medium hover:underline">
          About
        </a>
      </div>
    </footer>
  );
};

export default Footer;
