/* global cv */
// src/components/DrowsinessDetector.jsx
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const MODEL_INPUT_SIZE = 64;

export default function DrowsinessDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('Loading OpenCV.js...');

  useEffect(() => {
    const init = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      let model, faceCascade, eyeCascade;

      const loadCascade = async (url, fileName) => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const data = new Uint8Array(buffer);
        cv.FS_createDataFile('/', fileName, data, true, false, false);
        const cascade = new cv.CascadeClassifier();
        if (!cascade.load(fileName)) throw new Error(`Failed to load ${fileName}`);
        return cascade;
      };

      const detect = () => {
        if (!model || !faceCascade || !eyeCascade || video.paused || video.ended) {
          requestAnimationFrame(detect);
          return;
        }

        const startTime = performance.now();
        ctx.drawImage(video, 0, 0, video.width, video.height);
        const frame = cv.imread(canvas);
        const gray = new cv.Mat();
        cv.cvtColor(frame, gray, cv.COLOR_RGBA2GRAY, 0);

        const faces = new cv.RectVector();
        faceCascade.detectMultiScale(gray, faces, 1.1, 5, 0);

        let drowsy = false;

        for (let i = 0; i < faces.size(); ++i) {
          const face = faces.get(i);
          ctx.strokeStyle = 'cyan';
          ctx.strokeRect(face.x, face.y, face.width, face.height);
          ctx.fillStyle = 'cyan';
          ctx.fillText('Face', face.x, face.y - 10);

          const roiGray = gray.roi(face);
          const eyes = new cv.RectVector();
          eyeCascade.detectMultiScale(roiGray, eyes, 1.1, 5, 0);

          for (let j = 0; j < eyes.size(); ++j) {
            const eyeRect = eyes.get(j);
            const eyeGray = roiGray.roi(eyeRect);
            const resized = new cv.Mat();
            cv.resize(eyeGray, resized, new cv.Size(MODEL_INPUT_SIZE, MODEL_INPUT_SIZE));

            const tensor = tf.tidy(() => tf.tensor(resized.data, [MODEL_INPUT_SIZE, MODEL_INPUT_SIZE, 1]).div(255).expandDims(0));
            const prediction = model.predict(tensor).dataSync()[0];
            const status = prediction > 0.5 ? 'Open' : 'Closed';

            if (status === 'Closed') drowsy = true;

            ctx.strokeStyle = status === 'Open' ? 'lime' : 'red';
            ctx.strokeRect(face.x + eyeRect.x, face.y + eyeRect.y, eyeRect.width, eyeRect.height);
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText(`${status}`, face.x + eyeRect.x, face.y + eyeRect.y - 5);
          }
        }

        const fps = 1000 / (performance.now() - startTime);
        ctx.fillStyle = 'white';
        ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 20);
        if (drowsy) {
          ctx.fillStyle = 'red';
          ctx.font = '24px sans-serif';
          ctx.fillText('Mengantuk terdeteksi', 10, 50);
        }

        requestAnimationFrame(detect);
      };

      const main = async () => {
        try {
          setStatus('Loading models...');
          [model, faceCascade, eyeCascade] = await Promise.all([
            tf.loadGraphModel('/model/model.json'),
            loadCascade('/haarcascade_frontalface_default.xml', 'face.xml'),
            loadCascade('/haarcascade_eye.xml', 'eye.xml'),
          ]);

          setStatus('Starting camera...');
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
            audio: false,
          });
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            setStatus('Detecting...');
            requestAnimationFrame(detect);
          };
        } catch (err) {
          console.error(err);
          setStatus(`Error: ${err.message}`);
        }
      };

      if (cv && cv.onRuntimeInitialized) {
        cv.onRuntimeInitialized = main;
      } else {
        main(); // fallback
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Drowsiness Detection</h1>
      <p>{status}</p>
      <video ref={videoRef} width="640" height="480" autoPlay muted className="border" />
      <canvas ref={canvasRef} width="640" height="480" className="border" />
    </div>
  );
}
