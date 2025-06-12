import React, { useState } from 'react';
import LiveVideoFull from './LiveVideoFull.jsx';

export default function Fitur() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);

  const handleRecord = () => {
    if (!isPlaying) {
      alert("Aktifkan kamera dulu dengan Play sebelum merekam.");
      return;
    }
    setIsRecording(prev => !prev);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsRecording(false); // Stop recording when stopping video
    setVideoURL(null); // Clear previous video URL
  };

  return (
    <div className="p-8 text-gray-800 bg-gradient-to-br from-yellow-50 to-orange-50 min-h-screen flex items-center justify-center"> {/* Centered layout */}
      <div className="border border-gray-300 rounded-lg p-4 max-w-md w-full bg-white shadow-xl"> {/* Responsive width, shadow */}
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Live Video Deteksi Kantuk</h2> {/* Larger, bolder title */}

        <LiveVideoFull
          isPlaying={isPlaying}
          isRecording={isRecording}
          setVideoURL={setVideoURL}
        />

        <div className="flex justify-around mt-6 space-x-4"> {/* Increased spacing */}
          <button
            // Wider buttons
            className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 py-2 px-6 rounded-md text-white font-semibold flex-1"
            onClick={() => setIsPlaying(true)}
            disabled={isPlaying}
          >
            Play
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 transition duration-300 py-2 px-6 rounded-md text-white font-semibold flex-1"
            onClick={handleStop}
            disabled={!isPlaying}
          >
            Stop
          </button>

          <button
            className={`py-2 px-6 rounded-md text-white font-semibold flex-1 ${isRecording ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} transition duration-300`}
            onClick={handleRecord}
            disabled={!isPlaying}
          >
            {isRecording ? 'Recording...' : 'Record'}
          </button>
        </div>

        {/* Video Preview */}
        {videoURL && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner"> {/* Styled video preview */}
            <h3 className="font-semibold text-lg mb-3 text-gray-700">Hasil Rekaman:</h3>
            <video src={videoURL} controls className="w-full rounded shadow-md border border-gray-200" />
            <p className="text-sm text-gray-500 mt-2 text-center">Video ini juga diunduh secara otomatis.</p>
          </div>
        )}
      </div>
    </div>
  );
}