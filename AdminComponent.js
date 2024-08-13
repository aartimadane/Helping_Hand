import { Link } from "react-router-dom";

import React from 'react';


export default function Admin() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Admin Dashboard</h2>
                    <ul className='list-unstyled'>
                        <li>
                            <Link to="/" className='btn btn-primary mb-2'>Add Category</Link>
                        </li>
                        <li>
                            <Link to="Login" className='btn btn-secondary mb-2'>Add Admin</Link>
                        </li>
                    </ul>
                    <Link to='/logout' className='btn btn-danger'>Logout</Link>
                </div>
            </div>
        </div>
    );
}
