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

export const renderProjects = (repos, list) => {
    const template = document.getElementById('projecttemplate');
    list.replaceChildren(...repos.map((repo) => fillProject(template, repo)));
};