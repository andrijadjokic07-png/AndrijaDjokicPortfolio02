import { fetchJson } from './http.js';

export const loadCv = () => fetchJson('data/cv.json');