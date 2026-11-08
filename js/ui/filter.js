export const ALL = 'All';

const languageOf = ({ language }) => language ?? 'Not specified';

export const filterByLanguage = (repos, language) =>
    language === ALL ? repos : repos.filter((repo) => languageOf(repo) === language);

const getLanguages = (repos) => [...new Set(repos.map(languageOf))].sort();

export const initFilter = (fieldset, repos, onChange) => {
    const languages = getLanguages(repos);

    if (languages.length < 2) {
        return;
    }

    const buttons = [ALL, ...languages].map((language) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'filterbutton';
        button.textContent = language;
        button.dataset.language = language;
        button.setAttribute('aria-pressed', String(language === ALL));

        return button;
    });

    fieldset.append(...buttons);
    fieldset.hidden = false;

    fieldset.addEventListener('click', ({ target }) => {
        const selected = target.closest('button');

        if (!selected) {
            return;
        }

        buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
        onChange(selected.dataset.language);
    });
};