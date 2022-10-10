import React, { useState, useContext } from 'react'
import axios from 'axios';
import AuthAPI from '../services/AuthAPI'
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import Field from "../components/forms/field"


function LoginPage() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await AuthAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            navigate("/customer");
        } catch (error) {
            console.log(error.response.data)
            setError("Aucun compte ne correspond à ces identifiants !")
        }
    }
    return (
        <>
            <h1 className="h1 text-center">Connexion à l'application</h1>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <div className="card p-5">
                        <form onSubmit={handleSubmit} >
                            <Field name="username" label="Adresse email" value={credentials.username} onChange={handleChange} placeholder="Email de connexion" type="email" error={error} />
  
                            <Field name="password" label="Mot de passe" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" type="password" error="" />


                            <div className="form-group mt-3 text-center">
                                <button className="btn btn-success">Connexion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage