import { loadRepos } from '../api/github.js';
import { describeError } from '../api/http.js';
import { renderProjects } from '../render/projects.js';
import { ALL, filterByLanguage, initFilter } from '../ui/filter.js';
import { clearStatus, showError, showInfo } from '../lib/status.js';

const USERNAME = 'andrijadjokic07-png';

const statusBox = document.getElementById('projectstatus');
const countText = document.getElementById('projectcount');
const list = document.getElementById('projectlist');
const filter = document.getElementById('projectfilter');

const showProjects = (repos, language) => {
    const visible = filterByLanguage(repos, language);

    renderProjects(visible, list);
    countText.textContent = `Showing ${visible.length} of ${repos.length} projects`;
};

const init = async () => {
    showInfo(statusBox, 'Loading projects from GitHub…');
    list.replaceChildren();

    try {
        const repos = await loadRepos(USERNAME);

        if (repos.length === 0) {
            showInfo(statusBox, 'There are no public projects to show yet.');
            return;
        }

        clearStatus(statusBox);
        showProjects(repos, ALL);
        initFilter(filter, repos, (language) => showProjects(repos, language));
    } catch (error) {
        showError(statusBox, describeError(error), init);
    }
};

init();