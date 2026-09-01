document.addEventListener("DOMContentLoaded", () => {
  fetch("/global/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
      const yearEl = document.getElementById("footer-year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    })
    .catch(err => console.error("Footer load error:", err));
});
