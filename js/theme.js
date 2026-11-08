const STORAGE_KEY = 'theme';

const readStoredTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const storeTheme = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch {
        // Storage can be blocked. The theme still works for this visit.
    }
};

const applyTheme = (theme, button) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
};

export const initTheme = () => {
    const button = document.getElementById('themetoggle');
    const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    applyTheme(readStoredTheme() ?? systemTheme, button);

    button.addEventListener('click', () => {
        const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';

        applyTheme(next, button);
        storeTheme(next);
    });
};