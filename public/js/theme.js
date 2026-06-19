(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("devtrack-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (stored === "dark" || (!stored && prefersDark)) {
    root.setAttribute("data-theme", "dark");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("devtrack-theme", "light");
        toggle.textContent = "🌙";
        toggle.setAttribute("aria-label", "Switch to dark mode");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("devtrack-theme", "dark");
        toggle.textContent = "☀️";
        toggle.setAttribute("aria-label", "Switch to light mode");
      }
    });

    const isDark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = isDark ? "☀️" : "🌙";
    toggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  });
})();
