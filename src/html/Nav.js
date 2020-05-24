import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Nav() {
    return (
        <ul className="navbar-nav mr-auto">
            <li  className="nav-item active">
                <NavLink to="/" className="nav-link" >Главная</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/catalog.html" className="nav-link" >Каталог</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/about.html" className="nav-link" >О магазине</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/contacts.html" className="nav-link" >Контакты</NavLink>
            </li>
        </ul>
    )
}
