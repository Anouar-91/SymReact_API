import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';
import CustomersAPI from '../services/CustomersAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/TableLoader';
import { ThreeDots } from 'react-loader-spinner'

export default function CustomerPage() {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] =useState(true)

  const fetchCustomers = async () => {
    try{
      const data = await CustomersAPI.findAll();
      setCustomers(data)
      setLoading(false)
    }catch(error){
      toast.error("Une erreur est survenue lors du chargement des clients")

      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [])

  // First method with then and catch
  const handleDelete = (id) => {
    const copyCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id))
      CustomersAPI.delete(id)
      .then(response => console.log("ok"))
      .catch(error => {
        setCustomers(copyCustomers);
        console.log(error.response)
      });
  };

  // second method with try and catch
  const handleDelete2 = async (id) => {
    const copyCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id))
    try{
      await CustomersAPI.delete(id)
      console.log("ok")
    }catch(error){
      toast.error("Une erreur est survenue")
      setCustomers(copyCustomers);
      console.log(error.response)
    }
  };

  //method 3
  const handleDelete3 =  (id) => {
    const copyCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id))
    axios.delete('http://127.0.0.1:8000/api/customers/' + id)
          .then(response => console.log(ok))
          .catch(error => {
            console.log(error.response)
            setCustomers(copyCustomers);
          })
    }



  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = e => {
    const value = e.currentTarget.value;
    setSearch(value)
    setCurrentPage(1)

  }

  const itemsPerPage = 10;

  const filteredCustomers = customers.filter(
    c => 
    c.firstname.toLowerCase().includes(search.toLowerCase()) ||
    c.lastname.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company &&  c.company.toLowerCase().includes(search.toLowerCase()))

    )

  const start = currentPage * itemsPerPage - itemsPerPage
  const paginatedCustomers = filteredCustomers.slice(start, start + itemsPerPage);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
      <h1>Liste des clients</h1>
      <Link to="/customer/new" className="btn btn-primary">Cr??er un client</Link>
      </div>

      <div className="form-group mb-5 mt-5">
        <input type="text" placeholder="Rechercher..." value={search} onChange={handleSearch} className="form-control" />
      </div>
      {!loading  ?(
      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Factures</th>
            <th>Montant total</th>
            <th></th>
          </tr>
        </thead>
     
        <tbody>
          {paginatedCustomers.map((customer) =>
            <tr key={customer.id} >
              <td>{customer.id}</td>
              <td><Link to={"/customer/"+customer.id}>{customer.lastname} {customer.firstname}</Link></td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td > <span >{customer.invoices.length}</span> </td>
              <td >{customer.totalAmount.toLocaleString()}???</td>
              <td>
                <button
                  onClick={() => handleDelete2(customer.id)}
                  disabled={customer.invoices.length > 0 ? true : false}
                  className="btn btn-sm btn-danger">Supprimer
                </button>
              </td>
            </tr>
          )}
  
        </tbody>
              </table>
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
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChange={handleChangePage} />

    </>
  )
}
