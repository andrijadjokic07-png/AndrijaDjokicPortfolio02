export const fetchJson = async (url) => {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
};