import React, { useState, useEffect, useRef, useCallback } from "react";
import images from "./images.json";

/* ─── Scroll-trigger hook ─────────────────────────────────── */
function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers without IntersectionObserver
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ─── Single card ────────────────────────────────────────── */
function GalleryCard({ image, index, onOpen }) {
  const [ref, visible] = useVisible();
  // Stagger delay: 9 tiers × 80ms = 0–640ms
  const delay = `${(index % 9) * 0.08}s`;

  return (
    <article
      ref={ref}
      className={`gallery-card${visible ? " is-visible" : ""}`}
      style={{ animationDelay: delay }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${image.alt}`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(index)}
    >
      <div className="card-img-wrapper">
        <img
          className="gallery-img"
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="card-overlay" aria-hidden="true">
          <div className="overlay-expand">⤢</div>
          <p className="overlay-label">LA Function</p>
          <p className="overlay-text">{image.alt}</p>
        </div>
      </div>
    </article>
  );
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({ currentIndex, onClose, onPrev, onNext }) {
  const image = images[currentIndex];
  const total = images.length;

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        className="lb-btn lb-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        className="lb-btn lb-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Image content */}
      <div
        className="lightbox-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="lightbox-counter">
          {currentIndex + 1} / {total}
        </p>
        <img
          key={currentIndex}        /* force remount → re-triggers animation */
          className="lightbox-image"
          src={image.src}
          alt={image.alt}
        />
        <p className="lightbox-caption">{image.alt}</p>
      </div>

      {/* Next */}
      <button
        className="lb-btn lb-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function Images() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox  = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    []
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i + 1) % images.length),
    []
  );

  return (
    <>
      {/* Hero intro */}
      <header className="gallery-hero">
        <div className="hero-badge" aria-hidden="true">
          ☀ Summer Vibes ☀
        </div>
        <h2 className="hero-title">LA Function</h2>
        <p className="hero-subtitle">Unforgettable Moments</p>
        <div className="hero-divider" aria-hidden="true" />
      </header>

      {/* Masonry gallery */}
      <main className="gallery-wrapper">
        <div className="masonry-grid">
          {images.map((image, index) => (
            <GalleryCard
              key={index}
              image={image}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
