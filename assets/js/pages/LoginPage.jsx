import React, { useState } from 'react'
import axios from 'axios';
import AuthAPI from '../services/AuthAPI'

function LoginPage({onLogin}) {
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
            onLogin(true)
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
                            <div className="form-group">
                                <label htmlFor="username">Adresse email</label>
                                <input onChange={handleChange} value={credentials.username} type="email" placeholder="Email de connexion"
                                    className={(!error ? "form-control" : "form-control is-invalid")} id="username" name="username" />
                                {error && <p className="invalid-feedback">{error}</p>}
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Mot de passe</label>
                                <input onChange={handleChange} value={credentials.password} type="password" placeholder="Mot de passe" className="form-control" id="password" name="password" />
                            </div>
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