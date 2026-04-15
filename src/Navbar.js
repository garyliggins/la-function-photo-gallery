import React from "react";

const ARTISTS = [
  "Blue Bucks Clan", "The Game", "DJ Battle Cat", "Blxst", "YG",
  "Ty Dolla Sign", "Dom Kennedy", "Wale", "Tinashe", "Eric Bellinger",
  "P-Lo", "RJ", "India Love", "Kurupt", "Joe Moses", "OT Genasis",
  "DJ Nitrane", "DJ Bad", "Jessica Killings", "Draya Michele",
  "Paloma Ford", "Yung Berg", "Jay 305", "Big Boy", "J Cruz",
];

export default function Navbar() {
  // Duplicate for seamless infinite scroll
  const marqueeItems = [...ARTISTS, ...ARTISTS];

  return (
    <nav className="la-navbar" aria-label="LA Function Gallery Navigation">
      {/* Main bar */}
      <div className="navbar-main">
        {/* Animated ambient orbs */}
        <div className="navbar-orb navbar-orb-1" aria-hidden="true" />
        <div className="navbar-orb navbar-orb-2" aria-hidden="true" />

        {/* Logo */}
        <a
          href="https://lafunction.com/"
          className="navbar-logo-link"
          aria-label="Go to LA Function website"
        >
          <img
            className="navbar-logo"
            src="LA_Function_Final corrected.png"
            alt="LA Function Logo"
          />
        </a>

        {/* Title */}
        <div className="navbar-title-group">
          <h1 className="navbar-title">Photo Gallery</h1>
          <p className="navbar-subtitle">LA's Summer Music Festival</p>
        </div>
      </div>

      {/* Scrolling artist marquee */}
      <div className="navbar-marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((artist, i) => (
            <span key={i} className="marquee-item">
              ★ {artist}
              <span className="marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
