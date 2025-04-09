import React from 'react';
import './ReelBackground.css';

export default function ReelBackground({ children }) {
  return (
    <div className="film-frame">
      <div className="film-strip">
        <div className="film-hole"></div>
        <div className="film-hole"></div>
        <div className="film-hole"></div>
      </div>
      <div className="countdown">
        <div className="content-wrapper">
          <div className="text-container">
            <h1>DEVELOPED BY CODE CLUB</h1>
            <h2>VIRTUO REELS</h2>
          </div>
          {children}
        </div>
      </div>
      <div className="film-strip">
        <div className="film-hole"></div>
        <div className="film-hole"></div>
        <div className="film-hole"></div>
      </div>
    </div>
  );
}
