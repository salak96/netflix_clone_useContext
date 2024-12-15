// src/pages/Favorites.js
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Favorites = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Menampilkan daftar film favorit
    return (
        <div>
            <h2>Your Favorite Movies</h2>
            {/* Daftar favorit film akan ditampilkan di sini */}
        </div>
    );
};

export default Favorites;
