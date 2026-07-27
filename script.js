document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const revealEls = document.querySelectorAll(".video-card.reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // Video track: seamless loop via JS (avoids CSS animation glitch)
  const videoTrack = document.getElementById("video-track");
  const videoWrapper = videoTrack && videoTrack.closest(".video-slider-wrapper");
  if (videoTrack && videoWrapper) {
    const speedPxPerSec = 80;
    let position = 0;
    let setWidth = 0;
    let rafId = null;
    let paused = false;

    function measure() {
      setWidth = videoTrack.scrollWidth / 2;
      return setWidth > 0;
    }

    function tick() {
      if (!paused && setWidth > 0) {
        position += speedPxPerSec / 60;
        if (position >= setWidth) position -= setWidth;
        videoTrack.style.transform = `translate3d(${-position}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    videoWrapper.addEventListener("mouseenter", () => { paused = true; });
    videoWrapper.addEventListener("mouseleave", () => { paused = false; });

    if (measure()) {
      videoTrack.classList.add("js-marquee");
      rafId = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", () => { measure(); });
  }
});

