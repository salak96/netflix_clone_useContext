// src/pages/Favorites.js
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../../Navbar/navbarNetflix';


const Favorites = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Menampilkan daftar film favorit
    return (
        <Navbar>
        <div>
            <h2>Your Favorite Movies</h2>
            {/* Daftar film favorit */}
           
        </div> 
        </Navbar>

    );
};

export default Favorites;
