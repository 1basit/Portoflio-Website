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

  // Video tracks: seamless loop via JS (avoids CSS animation glitch)
  document.querySelectorAll(".video-track").forEach((videoTrack) => {
    const videoWrapper = videoTrack.closest(".video-slider-wrapper");
    if (!videoWrapper) return;

    const speedPxPerSec = 80;
    let position = 0;
    let setWidth = 0;
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
      requestAnimationFrame(tick);
    }

    videoWrapper.addEventListener("mouseenter", () => { paused = true; });
    videoWrapper.addEventListener("mouseleave", () => { paused = false; });

    if (measure()) {
      videoTrack.classList.add("js-marquee");
      requestAnimationFrame(tick);
    }
    window.addEventListener("resize", () => { measure(); });
  });

  // Click-to-load video embeds (thumbnail swapped for a live iframe on demand)
  function playVideo(el) {
    const provider = el.dataset.provider;
    const id = el.dataset.id;
    const src =
      provider === "youtube"
        ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
        : `https://player.vimeo.com/video/${id}?autoplay=1`;
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    el.replaceWith(iframe);
  }

  document.querySelectorAll(".video-lite").forEach((el) => {
    el.addEventListener("click", () => playVideo(el), { once: true });
    el.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playVideo(el);
        }
      },
      { once: true }
    );
  });
});

