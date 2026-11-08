export class HttpError extends Error {
    constructor(kind, status = 0) {
        super(`${kind} ${status}`.trim());
        this.name = 'HttpError';
        this.kind = kind;
        this.status = status;
    }
}

const isRateLimited = ({ status, headers }) =>
    status === 429 || (status === 403 && headers.get('x-ratelimit-remaining') === '0');

export const fetchJson = async (url) => {
    let response;

    try {
        response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    } catch (error) {
        throw new HttpError(error.name === 'TimeoutError' ? 'timeout' : 'network');
    }

    if (!response.ok) {
        throw new HttpError(isRateLimited(response) ? 'ratelimit' : 'http', response.status);
    }

    try {
        return await response.json();
    } catch {
        throw new HttpError('parse');
    }
};

export const describeError = ({ kind, status }) => {
    switch (kind) {
        case 'timeout':
            return 'The server is taking too long to answer. Please try again in a moment.';
        case 'network':
            return 'Could not reach the server. Check your internet connection and try again.';
        case 'ratelimit':
            return 'GitHub has limited the number of requests for now. Please try again in a while.';
        case 'parse':
            return 'The server sent data in a format I could not read.';
        case 'http':
            return status === 404
                ? 'The data could not be found.'
                : `The server answered with an error (status ${status}).`;
        default:
            return 'Something went wrong. Please try again.';
    }
};