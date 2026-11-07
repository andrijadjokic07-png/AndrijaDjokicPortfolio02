const loadCv = async () => {
    try {
        const response = await fetch('data/cv.json');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Something went wrong', error);
    }
};

loadCv();