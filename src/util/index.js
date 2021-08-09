export function tokenExists() {
    return localStorage.getItem('shortyToken') != null;
}

export const serverUrl = 'http://localhost:8000/api';