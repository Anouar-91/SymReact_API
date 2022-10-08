import React from 'react'

export default function Navbar() {
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
                            <a className="nav-link" href="#">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                            <a href="" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="btn btn-success">Connexion</a>
                        </li>
   
                        <li className="nav-item">
                            <a href="" className="btn btn-danger">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
