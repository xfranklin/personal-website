(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const icon = document.querySelector("[data-theme-toggle-icon]");

  if (!(toggle instanceof HTMLButtonElement) || !(icon instanceof HTMLElement)) return;

  const setTheme = (theme) => {
    const isDark = theme === "dark";
    const darkLabel = toggle.dataset.themeDarkLabel || "Enable dark theme";
    const lightLabel = toggle.dataset.themeLightLabel || "Enable light theme";

    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? lightLabel : darkLabel);
    icon.textContent = isDark ? "☼" : "◐";
  };

  setTheme(root.dataset.theme === "dark" ? "dark" : "light");

  toggle.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(theme);

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Theme switching works even when persistent storage is unavailable.
    }
  });
})();
