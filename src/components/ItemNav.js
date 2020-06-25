import React from 'react';
// import {NavLink, useLocation} from 'react-router-dom';

export default function ItemNav(props) {
    const item = props.item;
    // let location = useLocation();
    // console.log(location)
    return (
        <li className="nav-item" onClick={() => {props.handleCategory(item.id)}}>
            {/* <NavLink to={`${location.pathname}/${item.id}`} className="nav-link" >{item.title}</NavLink> */}
            <a className="nav-link" href="#" onClick={(event) => {event.preventDefault()}}>{item.title}</a>
        </li>
    )
}
