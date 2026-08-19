document.body.classList.add("js-ready");

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}


const gallery = document.querySelector(".lventures-gallery");

if (gallery) {
  const track = gallery.querySelector(".lventures-gallery-track");
  const slides = Array.from(gallery.querySelectorAll(".lventures-slide"));
  const dots = gallery.querySelector(".lventures-gallery-dots");
  const prev = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");
  let page = 0;
  let timer;

  const visibleCount = () => window.innerWidth <= 580 ? 1 : window.innerWidth <= 850 ? 2 : 3;
  const pageCount = () => Math.max(1, Math.ceil(slides.length / visibleCount()));

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}枚目の画像を見る`);
    dot.addEventListener("click", () => { page = Math.min(index, pageCount() - 1); updateGallery(); restartGallery(); });
    dots.appendChild(dot);
  });

  const updateGallery = () => {
    const count = visibleCount();
    const maxStart = Math.max(0, slides.length - count);
    const start = Math.min(page * count, maxStart);
    const offset = start * (100 / count);
    track.style.transform = `translateX(-${offset}%)`;
    Array.from(dots.children).forEach((dot, index) => dot.setAttribute("aria-current", index === page ? "true" : "false"));
  };

  const restartGallery = () => {
    window.clearInterval(timer);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(() => { page = (page + 1) % pageCount(); updateGallery(); }, 4500);
    }
  };

  prev.addEventListener("click", () => { page = (page - 1 + pageCount()) % pageCount(); updateGallery(); restartGallery(); });
  next.addEventListener("click", () => { page = (page + 1) % pageCount(); updateGallery(); restartGallery(); });
  window.addEventListener("resize", () => { page = Math.min(page, pageCount() - 1); updateGallery(); });
  updateGallery();
  restartGallery();
}
