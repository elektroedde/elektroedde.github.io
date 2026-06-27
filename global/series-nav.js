document.addEventListener("DOMContentLoaded", () => {
  const slug = window.SERIES_SLUG;
  const series = window.SERIES && window.SERIES[slug];
  if (!series) return;

  const parts = series.parts;
  const path = window.location.pathname;
  const idx = parts.findIndex((p) => p.url === path);
  const total = parts.filter((p) => p.number >= 1).length;

  const badgeEl = document.getElementById("series-badge");
  if (badgeEl) {
    const part = idx !== -1 ? parts[idx] : null;
    const label =
      part && part.number === 0
        ? `${series.title} — Overview`
        : part
        ? `${series.title} — Part ${part.number} of ${total}`
        : series.title;
    badgeEl.innerHTML = `<a href="${series.indexUrl}" class="post-series-badge">${label}</a>`;
  }

  const navEl = document.getElementById("series-nav");
  if (navEl && idx !== -1) {
    const prev = parts[idx - 1];
    const next = parts[idx + 1];

    const prevHtml = prev
      ? `<a href="${prev.url}" class="prev"><span class="label">Previous</span>&larr; ${prev.title}</a>`
      : "<span></span>";

    let nextHtml = "<span></span>";
    if (next) {
      nextHtml = next.url
        ? `<a href="${next.url}" class="next"><span class="label">Next</span>${next.title} &rarr;</a>`
        : `<span class="next disabled"><span class="label">Next</span>${next.title}</span>`;
    }

    navEl.innerHTML = `<nav class="post-series-nav">${prevHtml}${nextHtml}</nav>`;
  }

  const listEl = document.getElementById("series-list");
  if (listEl) {
    listEl.innerHTML = parts
      .map((p) => {
        const number = `<div class="series-card-number">${p.number}</div>`;
        const body = `<div class="series-card-body"><h5 class="series-card-title">${p.title}</h5><p class="series-card-desc">${p.desc}</p></div>`;
        return p.url
          ? `<a href="${p.url}" class="card series-card">${number}${body}</a>`
          : `<div class="card series-card is-upcoming">${number}${body}</div>`;
      })
      .join("");
  }
});
