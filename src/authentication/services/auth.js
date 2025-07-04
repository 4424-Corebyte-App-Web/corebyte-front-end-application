export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
    return !!getToken();
}
