{
    let stored = null;

    try {
        stored = localStorage.getItem('theme');
    } catch {
        stored = null;
    }

    const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
}