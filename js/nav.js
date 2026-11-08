const MOBILE_QUERY = '(max-width: 999px)';

export const initNav = () => {
    const button = document.getElementById('hamburger');
    const nav = document.getElementById('mainnav');

    const isOpen = () => button.getAttribute('aria-expanded') === 'true';

    const setOpen = (open) => {
        nav.classList.toggle('closed', !open);
        button.setAttribute('aria-expanded', String(open));
    };

    setOpen(!matchMedia(MOBILE_QUERY).matches);

    button.addEventListener('click', () => setOpen(!isOpen()));

    document.addEventListener('keydown', ({ key }) => {
        if (key === 'Escape' && isOpen() && matchMedia(MOBILE_QUERY).matches) {
            setOpen(false);
            button.focus();
        }
    });
};