// src/pages/Detail.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Detail = ({ movie }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = () => {
        if (!user) {
            alert('You need to be logged in to add favorites!');
            return;
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={movie.image} alt={movie.title} />
            <p>{movie.description}</p>
            <button onClick={handleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default Detail;
