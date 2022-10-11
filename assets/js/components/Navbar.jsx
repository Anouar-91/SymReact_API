import React, {useContext} from 'react';
import AuthAPI from '../services/AuthAPI';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext'
import { toast } from 'react-toastify';


export default function Navbar() {

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info('Vous êtes désormais déconnecté')
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SymReact</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"customer"} className="nav-link">Clients      </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"invoice"} className="nav-link" href="#">Factures </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!isAuthenticated ? (
                            <>
                        <li className="nav-item">
                        <Link to="/register" className="nav-link">Inscription</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"login"} className="btn btn-success">Connexion</Link>
                        </li></>)
                            : (
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                                </li>
                            )
                        }


                    </ul>
                </div>
            </div>
        </nav>
    )
}
