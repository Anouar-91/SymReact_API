/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';

import React, { useState, useContext } from "react";
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Routes, Route} from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import CustomerPageWithPagination from './pages/CustomerPageWithPagination';
import InvoicePage from './pages/InvoicePage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/AuthAPI';
import AuthContext from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AddCustomerPage from './pages/AddCustomerPage';

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
        <HashRouter>
            <Navbar />
            <main className="container pt-5">
                <Routes>
                    <Route element={<ProtectedRoute  />}>
                        <Route path="/customer/:id" element={<AddCustomerPage />} />
                        <Route path="/customer" element={<CustomerPage />} />
                        <Route path="/invoice" element={<InvoicePage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage  />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
        </HashRouter>
        </AuthContext.Provider>

    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement); 