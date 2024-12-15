import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Detail = () => {
    const { user, addFavorite, removeFavorite, favorites } = useAuth();
    const location = useLocation();
    const movie = location.state?.movie;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    // Check the initial favorite status
    useEffect(() => {
        if (movie && favorites) {
            setIsFavorite(favorites.some((fav) => fav.id === movie.id));
        }
    }, [favorites, movie]);

    // Fetch movie details on component mount
    useEffect(() => {
        if (!movie) {
            setError('Movie data is missing.');
            setLoading(false);
            return;
        }

        const fetchMovieDetails = async () => {
            try {
                const apiKey = '8f38a77b78899a5500c2f94daea756a1';
                const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                await response.json(); // Optionally handle data if needed
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movie]);

    // Toggle favorite handler
    const handleFavoriteToggle = () => {
        if (!user) {
            alert('You need to be logged in to add favorites!');
            return;
        }

        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
        setIsFavorite((prev) => !prev);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="detail">
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <button onClick={handleFavoriteToggle} className="favorite-button">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>
        </div>
    );
};

export default Detail;
