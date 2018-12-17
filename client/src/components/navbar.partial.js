import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to='/' className="navbar-brand">Vanilla</Link>
            <ul className="navbar-nav ml-auto">
            
                <li className="nav-item"><NavLink to='/' className="nav-link">Home</NavLink></li>
                <li className="nav-item"><NavLink to='/products' className="nav-link">Products</NavLink></li>
                <li className="nav-item"><NavLink to='/about' className="nav-link">About</NavLink></li>
                <li className="nav-item"><NavLink to='/contact' className="nav-link">Contact</NavLink></li>
                <li className="nav-item"><NavLink to='/login' className="nav-link">Login</NavLink></li>

            </ul>
        </nav>
    )
}

export default NavBar