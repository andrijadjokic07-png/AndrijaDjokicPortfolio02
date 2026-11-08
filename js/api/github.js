import { fetchJson } from './http.js';

export const loadRepos = (username) =>
    fetchJson(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);