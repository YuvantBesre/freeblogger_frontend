export default {
    getAccessToken : () => {
        return localStorage.getItem('token');
    },

    setAccessToken : token => {
        localStorage.setItem('token', token);
    },

    setCredentials : (token, name, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
    },

    removeCredentials : () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    }
}