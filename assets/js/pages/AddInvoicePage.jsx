import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Field from '../components/forms/field';
import Select from '../components/forms/select';
import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'



function AddInvoicePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(true);
    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: 'SENT'
    })
    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: ''
    })
    const [customers, setCustomers] = useState([])
    let { id } = useParams();


    useEffect(() => {
        fetchCustomers()

    }, [])

    useEffect(() => {
        if (id === "new") {
            setEditing(false)
            setLoading(false)

        } else {
            const data = fetchInvoice()
            console.log(invoice)
        }
    }, [id])

    const fetchInvoice = async () => {
        try {
            const data = await InvoicesAPI.find(id);
            setInvoice({ ...invoice, amount: data.amount, status: data.status, customer: data.customer.id })
            setLoading(false)

        } catch (error) {
            toast.error("Impossible de charger la facture")
            console.log(error)
            navigate("/invoice")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInvoice({
            ...invoice,
            [name]: value,
        })
    }

    const fetchCustomers = async () => {
        try {
            const customers = await CustomersAPI.findAll()
            setCustomers(customers)
            if (customers.length > 0) {
                setInvoice({
                    ...invoice,
                    customer: customers[0].id
                })
            }
        } catch (error) {
            toast.error("Impossible de charger la liste des clients")
            console.log(error.response)
            navigate("/invoice")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            if (!editing) {
                const data = await InvoicesAPI.create(invoice)
                navigate('/invoice')
            } else {
                const response = await InvoicesAPI.update(id, invoice)
                console.log(response);
            }
            setLoading(false)

            toast.success("Enregistr?? avec succ??s")
        } catch (error) {
            toast.error("Une erreur est survenue")
            console.log(error)
            const apiErrors = {}
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
            setLoading(false)

        }
    }
    return (
        <>
            {editing ? (
                <h1 className="mb-5">Modification d'une facture</h1>
            ) : (
                <h1>Cr??ation d'une facture</h1>
            )}
                   {!loading  ?(
            <form onSubmit={handleSubmit}>

                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map((customer) => {
                        return <option key={customer.id} value={customer.id}>{customer.firstname} {customer.lastame}</option>
                    })}
                </Select>

                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoy??e</option>
                    <option value="PAID">Pay??e</option>
                    <option value="CANCELLED">Annul??e</option>
                </Select>
                <div className="form-group mt-3">
                    <Link to="/invoice" className="btn btn-link">Retour au factures</Link>
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                </div>
            </form>
            ):(
          <div className="text-center">
          <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#0d6efd" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{marginLeft:'50%', transform: 'translateX(-10%)'}}
          wrapperClassName=""
          visible={true}
           />
          </div>

        )}

        </>
    )
}

export default AddInvoicePage