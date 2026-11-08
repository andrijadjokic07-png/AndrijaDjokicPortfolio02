import { loadCv } from '../api/cv.js';
import { describeError } from '../api/http.js';
import { renderEntries } from '../render/entries.js';
import { clearStatus, showError, showInfo } from '../lib/status.js';

const statusBox = document.getElementById('cvstatus');

const init = async () => {
    showInfo(statusBox, 'Loading CV…');

    try {
        const { work, education } = await loadCv();

        if (work.length === 0 && education.length === 0) {
            showInfo(statusBox, 'There is no CV information to show yet.');
            return;
        }

        clearStatus(statusBox);
        renderEntries(work, document.getElementById('worklist'));
        renderEntries(education, document.getElementById('educationlist'));
    } catch (error) {
        showError(statusBox, describeError(error), init);
    }
};

init();