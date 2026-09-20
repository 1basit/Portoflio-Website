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

  // Hero showreel: plays muted as the hero visual, sound is opt-in. Autoplay
  // is skipped for visitors who prefer reduced motion, and playback pauses
  // while the hero is scrolled out of view so it costs nothing to leave open.
  const reel = document.getElementById("hero-reel-video");
  const reelSound = document.getElementById("reel-sound");
  if (reel && reelSound) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tryPlay = () => {
      const started = reel.play();
      // Autoplay can be refused; the poster stays up and the toggle still works.
      if (started && typeof started.catch === "function") started.catch(() => {});
    };

    if (!reduceMotion) tryPlay();

    function setSound(on) {
      reel.muted = !on;
      reelSound.classList.toggle("is-on", on);
      reelSound.setAttribute("aria-label", on ? "Turn sound off" : "Turn sound on");
      if (on && reel.paused) tryPlay();
    }

    reelSound.addEventListener("click", () => setSound(reel.muted));
    reel.addEventListener("click", () => setSound(reel.muted));

    // Browsers pause muted video in a backgrounded tab and do not resume it on
    // return, so pick it back up when the page becomes visible again.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && reel.paused && !reduceMotion) {
        tryPlay();
      }
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      const reelObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay();
            } else if (!reel.paused) {
              reel.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      reelObserver.observe(reel);
    }
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

