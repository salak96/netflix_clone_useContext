import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './favorite.css';
import Navbar from '../../Navbar/navbarNetflix';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        try {
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
        } catch (error) {
            console.error('Failed to parse favorites from localStorage:', error);
            setFavorites([]);
        }
    }, []);

    return (
            <div className="favorites-page">
                <Navbar />
                <h2 className="favorites-title">Your Favorite Movies</h2>
                {favorites.length === 0 ? (
                    <p className="favorites-empty">You have no favorite movies yet.</p>
                ) : (
                    <div className="favorites-list">
                        {favorites.map((movie) => (
                            <div className="favorite-item" key={movie.id}>
                                <img
                                    className="favorite-image"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <p className="favorite-title">{movie.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
    );
};

export default Favorites;
