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
  const preview = gallery.querySelector(".lventures-gallery-preview");
  preview.style.setProperty("--gallery-bg", `url("${preview.querySelector("img").src}")`);
  const mainImage = gallery.querySelector(".lventures-gallery-main-image");
  const caption = gallery.querySelector(".lventures-gallery-caption");
  const thumbs = Array.from(gallery.querySelectorAll(".lventures-thumb"));

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (event) => {
      event.preventDefault();
      preview.href = thumb.href;
      preview.style.setProperty("--gallery-bg", `url("${thumb.dataset.galleryImage}")`);
      mainImage.src = thumb.dataset.galleryImage;
      mainImage.alt = thumb.dataset.galleryName;
      caption.innerHTML = `<strong>${thumb.dataset.galleryName}</strong><small>${thumb.dataset.galleryDescription}</small><em>WEB SITE ↗</em>`;
      thumbs.forEach((item) => item.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}
