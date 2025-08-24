document.addEventListener("DOMContentLoaded", () => {
    /* ---------------- MENÚ HAMBURGUESA ---------------- */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !expanded);
        });
    }

    /* ---------------- SLIDER 1 (Fade: sección valores) ---------------- */
    function initFadeSlider(containerSelector, slideSelector, dotSelector, interval = 4000) {
        let index = 0;
        const slides = document.querySelectorAll(slideSelector);
        const dots = document.querySelectorAll(dotSelector);

        if (!slides.length) return;

        function showSlide(n) {
            index = (n + slides.length) % slides.length;
            slides.forEach(s => s.style.display = "none");

            if (dots.length) {
                dots.forEach(d => d.classList.remove("active"));
            }

            slides[index].style.display = "block";

            if (dots.length > index) {
                dots[index].classList.add("active");
            }

            const container = document.querySelector(containerSelector);
            const img = slides[index].querySelector("img");
            if (container && img) {
                if (img.complete) {
                    container.style.height = img.offsetHeight + "px";
                } else {
                    img.onload = () => {
                        container.style.height = img.offsetHeight + "px";
                    };
                }
            }
        }

        document.querySelectorAll("[data-prev]").forEach(btn =>
            btn.addEventListener("click", () => showSlide(index - 1))
        );
        document.querySelectorAll("[data-next]").forEach(btn =>
            btn.addEventListener("click", () => showSlide(index + 1))
        );

        dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

        showSlide(index);
        setInterval(() => showSlide(index + 1), interval);
    }

    initFadeSlider(".slider-container", ".slide", ".dot");

    /* ---------------- SLIDER 2 (Carrusel: agro) ---------------- */
    function initCarousel(sliderSelector, cardSelector, prevSelector, nextSelector, interval = 6000) {
        const slider = document.querySelector(sliderSelector);
        const cards = document.querySelectorAll(cardSelector);
        const prevBtn = document.querySelector(prevSelector);
        const nextBtn = document.querySelector(nextSelector);

        if (!slider || !cards.length) return;

        let index = 0;

        function getVisibleCards() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        let visibleCards = getVisibleCards();

        function updateSliderPosition() {
            if (!cards.length) return;
            const cardWidth = cards[0].offsetWidth + 20;
            slider.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (index < cards.length - visibleCards) {
                    index++;
                } else {
                    index = 0;
                }
                updateSliderPosition();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (index > 0) {
                    index--;
                } else {
                    index = cards.length - visibleCards;
                }
                updateSliderPosition();
            });
        }

        //setInterval(() => {
            //if (nextBtn) nextBtn.click();
        //}, interval);

        window.addEventListener("resize", () => {
            visibleCards = getVisibleCards();
            updateSliderPosition();
        });

        updateSliderPosition();
    }

    initCarousel(".slideragro", ".card", ".prevagro", ".nextagro");
});

// ...existing code...

// ANIMACIÓN FADE-IN AL HACER SCROLL
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .card, .cardbeneficios, .producto-card, .beneficios, .banner-top, .cta-section, .proceso img');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 60) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// EFECTO RIPPLE EN BOTONES
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn2, .btn-cta, .btn-primary, .btn-contacto, .btn-submit');
    if (btn) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
});

// NAVBAR SHADOW AL HACER SCROLL
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ...existing code...
// Manejo de dots sin inline onclick
document.addEventListener("DOMContentLoaded", () => {
  const dotsContainer = document.querySelector(".dots-container");
  if (dotsContainer) {
    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        const idx = [...dotsContainer.children].indexOf(e.target);
        goToSlide(idx);
      }
    });
  }
});
