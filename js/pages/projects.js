import { loadRepos } from '../api/github.js';
import { renderProjects } from '../render/projects.js';
import { ALL, filterByLanguage, initFilter } from '../ui/filter.js';

const USERNAME = 'andrijadjokic07-png';

const statusText = document.getElementById('projectstatus');
const countText = document.getElementById('projectcount');
const list = document.getElementById('projectlist');
const filter = document.getElementById('projectfilter');

const showProjects = (repos, language) => {
    const visible = filterByLanguage(repos, language);

    renderProjects(visible, list);
    countText.textContent = `Showing ${visible.length} of ${repos.length} projects`;
};

const init = async () => {
    statusText.textContent = 'Loading projects from GitHub…';
    list.replaceChildren();

    try {
        const repos = await loadRepos(USERNAME);

        if (repos.length === 0) {
            statusText.textContent = 'There are no public projects to show yet.';
            return;
        }

        statusText.textContent = '';
        showProjects(repos, ALL);
        initFilter(filter, repos, (language) => showProjects(repos, language));
    } catch (error) {
        statusText.textContent = 'Could not load projects from GitHub. Please try again later.';
    }
};

init();