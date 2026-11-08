import { loadCv } from '../api/cv.js';
import { renderEntries } from '../render/entries.js';

const statusText = document.getElementById('cvstatus');

const init = async () => {
    statusText.textContent = 'Loading CV…';

    try {
        const { work, education } = await loadCv();

        if (work.length === 0 && education.length === 0) {
            statusText.textContent = 'There is no CV information to show yet.';
            return;
        }

        statusText.textContent = '';
        renderEntries(work, document.getElementById('worklist'));
        renderEntries(education, document.getElementById('educationlist'));
    } catch (error) {
        statusText.textContent = 'Could not load the CV. Please try again later.';
    }
};

init();