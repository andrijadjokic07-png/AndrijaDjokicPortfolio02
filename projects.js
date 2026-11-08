const USERNAME = 'andrijadjokic07-png';
const API_URL = `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100`;

const statusText = document.getElementById('projectstatus');
const list = document.getElementById('projectlist');

const fillProject = (template, { name, description, html_url: url, homepage, language }) => {
    const project = template.content.cloneNode(true);

    project.querySelector('.projectinfotitle').textContent = name;
    project.querySelector('.projectinfoparagraph').textContent = description ?? 'No description provided.';
    project.querySelector('.projectlanguage').textContent = language ?? 'Not specified';

    const codeLink = project.querySelector('.codelink');
    codeLink.href = url;
    codeLink.setAttribute('aria-label', `View code of ${name}`);

    if (homepage) {
        const liveLink = project.querySelector('.livelink');
        liveLink.href = homepage;
        liveLink.setAttribute('aria-label', `Live preview of ${name}`);
    } else {
        project.querySelector('.linkone').remove();
    }

    return project;
};

const loadProjects = async () => {
    statusText.textContent = 'Loading projects from GitHub…';
    list.replaceChildren();

    try {
        const response = await fetch(API_URL, { signal: AbortSignal.timeout(8000) });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            statusText.textContent = 'There are no public projects to show yet.';
            return;
        }

        const template = document.getElementById('projecttemplate');

        statusText.textContent = '';
        list.replaceChildren(...repos.map((repo) => fillProject(template, repo)));
    } catch (error) {
        statusText.textContent = 'Could not load projects from GitHub. Please try again later.';
    }
};

loadProjects();