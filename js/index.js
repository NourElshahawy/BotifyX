// ! AOS.init();  
window.addEventListener("scroll", () => {
  const navContent = document.querySelector(".nav-content");

  if (window.scrollY > 50) {
    navContent.classList.add("scrolled");
  } else {
    navContent.classList.remove("scrolled");
  }
});
const images = document.querySelectorAll(".loading-Page img");

let loadedImages = 0;

images.forEach((img) => {
  if (img.complete) {
    loadedImages++;
  } else {
    img.onload = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        startAnimation();
      }
    };
  }
});

if (loadedImages === images.length) {
  startAnimation();
}

window.addEventListener("load", function () {
  const loader = document.querySelector(".loading-Page");
  const header = document.querySelector(".header-section");

  if (!loader) return;

  startAnimation(loader);

  let minTimePassed = false;
  let pageLoaded = false;

  setTimeout(() => {
    minTimePassed = true;
    if (pageLoaded) hideLoader();
  }, 6000);

  pageLoaded = true;
  if (minTimePassed) hideLoader();

  function hideLoader() {
    loader.classList.add("hide");
  }
});

function startAnimation(loader) {
  if (!loader) return;
  loader.classList.add("start");
}

const sections = document.querySelectorAll("section");

let extraOffset = 0;

sections.forEach((sec) => {
  const height = sec.offsetHeight;
  const screenHeight = window.innerHeight;

  const extra = height - screenHeight;
  const extraVH = (extra / window.innerHeight) * 100;
  // نحط قيمة الـ top
  sec.style.top = "-" + extraVH + "vh";
  // console.log(extraVH);

  // لو في زيادة نحسبها
  // if (extra > 0) {
  //   extraOffset += extra;
  // }
});

//! ================== Navbar ================== //
// ********* Navbar Active Link ********* //
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  const linksNav = document.querySelectorAll(".links li a");

  linksNav.forEach((link) => {
    link.parentElement.classList.remove("active");

    if (link.href === window.location.href) {
      link.parentElement.classList.add("active");
    }

    link.addEventListener("click", () => {
      linksNav.forEach((l) => l.parentElement.classList.remove("active"));
      link.parentElement.classList.add("active");
    });
  });
});

// ********* Start Custom Dropdown ********* //
document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector("nav .dropdown-btn");
  const dropdownMenu = document.querySelector("nav .custom-dropdown-menu");

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle("show");
      dropdownBtn.classList.toggle("active", isOpen);
    });

    window.addEventListener("click", function (e) {
      if (!e.target.closest("nav .custom-dropdown")) {
        dropdownMenu.classList.remove("show");
        dropdownBtn.classList.remove("active");
      }
    });
  }
});

// ********* Mini-Navbar ********* //
document.addEventListener("DOMContentLoaded", () => {
  const miniNav = document.querySelector("nav.mini-navbar");
  if (!miniNav) return;

  const hasBigNav = document.querySelector(".header-section > nav:not(.mini-navbar)");

  if (!hasBigNav) {
    miniNav.classList.add("visible");
    return;
  }

  const header = document.querySelector(".header-section");
  const trigger = header ? header.offsetHeight * 0.55 : 450;

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    window.requestAnimationFrame(() => {
      if (window.scrollY > trigger) {
        miniNav.classList.add("visible");
      } else {
        miniNav.classList.remove("visible");
      }
      ticking = false;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

// ********* Responsive Navbar ********* //
const navs = document.querySelectorAll("nav");

navs.forEach((nav) => {
  const showMenu = nav.querySelector("nav .show-menu");
  const links = nav.querySelector("nav ul.links");
  const menuIcon = showMenu?.querySelector(".show-menu i");

  if (!showMenu || !links || !menuIcon) return;

  showMenu.addEventListener("click", (e) => {
    e.stopPropagation();

    links.classList.toggle("open");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");
  });

  // إغلاق المنيو لو ضغط برا
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      links.classList.remove("open");
      menuIcon.classList.add("fa-bars");
      menuIcon.classList.remove("fa-xmark");
    }
  });
});

//! ================== Nav-Page ================== //
// Start Icon Nav Page
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.getElementById("navPage");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}
// End Icon Nav Page

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-page a");
  if (!links.length) return;

  const currentPath = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (!linkPath) return;

    if (linkPath.includes(currentPath)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

//! ================== Typewriter Effect Script ================== //
(function () {
  const SPEED = 35;

  function startTypewriter(el) {
    const text = el.textContent.trim();
    if (!text) return;

    el.innerHTML = '<span class="tw-cursor"></span>';

    let idx = 0;
    let rendered = "";

    function typeNext() {
      if (idx >= text.length) {
        el.innerHTML = rendered;
        return;
      }

      const ch = text[idx++];
      rendered += ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch === "&" ? "&amp;" : ch;

      el.innerHTML = rendered + '<span class="tw-cursor"></span>';

      const delay = ch === "." || ch === "،" || ch === "," ? SPEED * 7 : ch === " " ? SPEED * 0.6 : SPEED + (Math.random() * 10 - 5);
      setTimeout(typeNext, delay);
    }

    const delay = parseInt(el.dataset.twDelay) || 0;
    setTimeout(typeNext, delay);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-typewriter]");

    if (!elements || elements.length === 0) {
      // console.warn('لا يوجد عناصر لعرض تأثير الكتابة الآلية.');
      return;
    }

    elements.forEach(startTypewriter);
  });
})();

//! ================== Scroll Animation (Section About) ================== //
document.addEventListener("DOMContentLoaded", () => {
  const headAbout = document.querySelector(".head-about");
  const aboutSection = document.querySelector(".about");

  if (!aboutSection || !headAbout) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headAbout.classList.add("show");
        } else {
          headAbout.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(aboutSection);
});

//! ================== Scroll Animation (Section Our-Solutions) ================== //
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".our-solutions");
  const head = document.querySelector(".head");

  if (!section || !head) return;

  const isMobile = window.innerWidth <= 768;
  const thresholdValue = isMobile ? 0.1 : 0.4;

  let timeoutId;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            head.classList.add("animate");
          }, 300);
        } else {
          clearTimeout(timeoutId);
          head.classList.remove("animate");
        }
      });
    },
    {
      threshold: thresholdValue,
    },
  );

  observer.observe(section);
});

// Generate Particles
function generateParticles() {
  const container = document.getElementById("particles");

  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.animationDuration = 3 + Math.random() * 4 + "s";
    container.appendChild(particle);
  }
}

//! ================== Scroll Reveal Animation ================== //
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Trigger when 15% of element is visible
  };

  // Main sections observer
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class with a small delay for smoothness
        setTimeout(() => {
          entry.target.classList.add("active");
        }, 100);

        // Stop observing once animated (remove this if you want repeat)
        // sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll(`
      .section-reveal, 
      .section-reveal-left, 
      .section-reveal-right,
      .section-reveal-scale,
      .stats-reveal,
      .service-card-reveal,
      .ai-card-reveal,
      .solution-card-reveal,
      .center-image-reveal
  `);

  revealElements.forEach((el) => sectionObserver.observe(el));

  // ========== Specific Section Animations ========== //

  // About Section - Stats counter animation
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statCards = entry.target.querySelectorAll(".stats-reveal");
          statCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("active");
            }, index * 150); // Stagger effect
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  // const statsSection = document.querySelector(".row-stats");
  // if (statsSection) statsObserver.observe(statsSection);

  // Services Section - Cards stagger
  const servicesObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".service-card-reveal");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("active");
            }, index * 100);
          });
          servicesObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  const servicesGrid = document.querySelector(".cards-grid");
  if (servicesGrid) servicesObserver.observe(servicesGrid);
});

//! ================== Typewriter Effect Script ================== //
(function () {
  const SPEED = 35;

  function startTypewriter(el) {
    const text = el.textContent.trim();
    if (!text) return;

    el.innerHTML = '<span class="tw-cursor"></span>';

    let idx = 0;
    let rendered = "";

    function typeNext() {
      if (idx >= text.length) {
        el.innerHTML = rendered;
        return;
      }

      const ch = text[idx++];
      rendered += ch === "<" ? "&lt;" : ch === ">" ? "&gt;" : ch === "&" ? "&amp;" : ch;

      el.innerHTML = rendered + '<span class="tw-cursor"></span>';

      const delay = ch === "." || ch === "،" || ch === "," ? SPEED * 7 : ch === " " ? SPEED * 0.6 : SPEED + (Math.random() * 10 - 5);
      setTimeout(typeNext, delay);
    }

    const delay = parseInt(el.dataset.twDelay) || 0;
    setTimeout(typeNext, delay);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-typewriter]");

    if (!elements || elements.length === 0) {
      // console.warn('لا يوجد عناصر لعرض تأثير الكتابة الآلية.');
      return;
    }

    elements.forEach(startTypewriter);
  });
})();

//! ================== Icon Bot ================== //
const botBox = document.querySelector(".icon-bot-box");
const icon = document.querySelector(".icon-bot-box .image");
const textEl = document.querySelector(".icon-bot-box .text");

let audio = null;

function initAudio() {
  if (!botBox || !icon || !textEl) return;
  if (audio) return;
  audio = new Audio("../assets/sound/sound-2.mp3");
  audio.volume = 1;
}

function playNotificationSound() {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch((err) => console.log("الصوت مش شغال:", err));
  // console.log('الصوت يشتغل');
}

if (icon && textEl) {
  icon.addEventListener("mouseenter", () => {
    textEl.classList.add("show");
  });

  icon.addEventListener("mouseleave", () => {
    textEl.classList.remove("show");
  });

  let played = false;
  setTimeout(() => {
    textEl.classList.add("show");
    initAudio();
    document.addEventListener("mousemove", () => {
      if (!played) {
        playNotificationSound();
        played = true;
      }
    });
  }, 5000);

  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    textEl.classList.remove("show");
  });
}
const counters = document.querySelectorAll(".counter");

function startCounter(counter) {
  if (counter.classList.contains("running")) return;

  counter.classList.add("running");

  const duration = 800;
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate));

  let frame = 0;
  const target = +counter.getAttribute("data-target");

  const updateCount = () => {
    frame++;
    const progress = frame / totalFrames;
    const current = Math.round(target * progress);

    counter.innerText = current;

    if (frame < totalFrames) {
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;

      if (entry.isIntersecting) {
        // لما يظهر
        counter.innerText = 0; // reset
        startCounter(counter);
      } else {
        // لما يختفي
        counter.classList.remove("running");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});

//! ================== Hover Button ================== //
const buttons = document.querySelectorAll(".main-btn-inner");

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", function (e) {
    const circle = this.previousElementSibling;
    const rect = this.getBoundingClientRect();

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    circle.style.left = `${relX}px`;
    circle.style.top = `${relY}px`;

    circle.classList.remove("desplode-circle");
    circle.classList.add("explode-circle");
  });

  btn.addEventListener("mouseleave", function (e) {
    const circle = this.previousElementSibling;
    const rect = this.getBoundingClientRect();

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    circle.style.left = `${relX}px`;
    circle.style.top = `${relY}px`;

    circle.classList.remove("explode-circle");
    circle.classList.add("desplode-circle");
  });
});

const btns = document.querySelectorAll(".tab-btn");
const indicator = document.getElementById("indicator");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const panel = document.getElementById("panel-" + btn.dataset.target);
    if (panel) {
      panel.classList.add("active");
      indicator.style.opacity = "1";
    }
  });
});

const btn = document.querySelector(".toggle-btn");
const tabs = document.querySelector(".icon-tabs");
if (btn && tabs) {
  btn.addEventListener("click", () => {
    tabs.classList.toggle("active");
  });
}


// انيميشن ال براجراف
const elements = document.querySelectorAll(".fade-up");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});