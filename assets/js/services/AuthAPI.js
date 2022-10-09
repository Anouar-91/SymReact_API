import axios from 'axios';

 function  authenticate(credentials){
    return axios
            .post("http://127.0.0.1:8000/api/login_check", credentials)
            .then(response => {
             // je stock mon token dans le local storage
                const token = response.data.token;
                window.localStorage.setItem('authToken', token)
                axios.defaults.headers["Authorization"] = "Bearer " + token;
            })
}

function logout(){
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers["Authorization"];
}

export default {
    authenticate,
    logout
}

