import axios from "axios";
import {API_URL} from './Config'

function findAll(){
    return axios.get(API_URL + 'invoices?pagination=false')
    .then(response => response.data["hydra:member"]);
}
function deleteInvoice(id){
    return axios.delete(API_URL + 'invoices/' + id)
}

function find(id){
    return axios.get(API_URL + 'invoices/' + id).then(response => response.data)
   };
function update(id, invoice){
    return axios.put(API_URL + "invoices/" + id, 
            {...invoice, customer: `/api/customers/${invoice.customer}`})
}
function create( invoice){
    return axios.post(API_URL + "invoices", 
            {...invoice, customer: `/api/customers/${invoice.customer}`})
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}