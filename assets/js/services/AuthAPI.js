import axios from 'axios';
import jwtDecode from 'jwt-decode'

function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => {
            // je stock mon token dans le local storage
            const token = response.data.token;
            window.localStorage.setItem('authToken', token)
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        })
}

function logout() {
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers["Authorization"];
}

function setup() {
    // on check si on a un token
    const token = window.localStorage.getItem('authToken');

    //on check qu'on a bien un token et que la date est valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > (new Date().getTime())) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;

        } else {
            logout()
        }
    } else {
        logout()
    }
}

export default {
    authenticate,
    logout,
    setup
}

