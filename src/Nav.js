import React, { useState, useEffect } from 'react';
import logo from './assets/netflix.png';
import avatar from './assets/avatar.png';
import './Nav.css';

const Nav = () => {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        })
        return () => {
            window.removeEventListener('scroll');
        }
    }, [])

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img src={logo} alt="netflix" className="nav__logo" />
            <img src={avatar} alt="avatar" className="nav__avatar" />

        </nav>
    );
}

export default Nav;
