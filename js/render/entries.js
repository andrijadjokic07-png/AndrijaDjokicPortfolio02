const formatMonth = (isoMonth) =>
    new Date(`${isoMonth}-01`).toLocaleDateString('en', { month: 'short', year: 'numeric' });

const fillEntry = (template, { title, type, place, location, start, end }) => {
    const entry = template.content.cloneNode(true);

    entry.querySelector('.experiencename').textContent = title;
    entry.querySelector('.experiencetype').textContent = type;
    entry.querySelector('.entryplace').textContent = place;

    if (location) {
        entry.querySelector('.entrylocation').textContent = location;
    } else {
        entry.querySelector('.entrylocationrow').remove();
    }

    const startTime = entry.querySelector('.entrystart');
    startTime.textContent = formatMonth(start);
    startTime.dateTime = start;

    const endTime = entry.querySelector('.entryend');

    if (end) {
        endTime.textContent = formatMonth(end);
        endTime.dateTime = end;
    } else {
        endTime.replaceWith('Present');
    }

    return entry;
};

export const renderEntries = (entries, container) => {
    const template = document.getElementById('entrytemplate');
    container.replaceChildren(...entries.map((entry) => fillEntry(template, entry)));
};