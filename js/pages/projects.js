import { loadRepos } from '../api/github.js';
import { renderProjects } from '../render/projects.js';

const USERNAME = 'andrijadjokic07-png';

const statusText = document.getElementById('projectstatus');
const list = document.getElementById('projectlist');

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
        renderProjects(repos, list);
    } catch (error) {
        statusText.textContent = 'Could not load projects from GitHub. Please try again later.';
    }
};

init();