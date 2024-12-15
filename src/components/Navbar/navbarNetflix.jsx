import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleSignOut = () => {
        localStorage.removeItem('user'); // Hapus data pengguna dari localStorage
        navigate('/login'); // Arahkan ke halaman login
    };

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt='Netflix' className='navbar-logo' />
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New and Popular</li>
                    <li>My List</li>
                    <li>Browse by Language</li>
                </ul>
            </div>
            <div className='navbar-right'>
                <img src={search_icon} alt='Search' className='icon' />
                {userLogin ? <p className='username'>Hello, {userLogin.name}</p> : <p className='username'>Guest</p>}
                <img src={bell_icon} alt='Notifications' className='icon bell' />
                <div className='navbar-profile'>
                    <img src={profile_img} alt='Profile' className='profile' />
                    <img src={caret_icon} alt='Caret' className='caret_icon' />
                    <div className='dropdown'>
                        <p onClick={handleSignOut}>Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
