import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from "../components/forms/field";
import axios from "axios";

function AddCustomerPage() {
    const [customer, setCustomer] = useState({
        lastname: "",
        firstname: "",
        company: "",
        email: ""
    })

    const [error, setError] = useState({
        lastname: "",
        firstname: "",
        company: "",
        email: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setCustomer({
            ...customer,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/customers", customer)
            console.log(response.data)
            setError=({})
        } catch (error) {
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setError(apiErrors)
        }
    }

    return (
        <>
            <h1 className="mb-5">Création d'un client</h1>
            <form onSubmit={handleSubmit}>
                <Field value={customer.lastname}
                    onChange={handleChange}
                    name="lastname"
                    label="Nom de famille"
                    error={error.lastname}
                    placeholder="Nom de famille">
                </Field>
                <Field value={customer.firstname}
                    onChange={handleChange}
                    name="firstname"
                    error={error.firstname}
                    label="Prénom de famille"
                    placeholder="Prénom de famille"

                ></Field>
                <Field
                    value={customer.email}
                    error={error.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="Adresse email"
                    type="email"

                ></Field>
                <Field value={customer.company}
                    error={error.company}
                    onChange={handleChange}
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                ></Field>
                <div className="form-group mt-3">
                    <Link to="/customer" className="btn btn-link">Retour à la liste</Link>
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
        </>
    )
}

export default AddCustomerPage