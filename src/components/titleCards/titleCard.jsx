import React, { useEffect, useRef, useState } from 'react';
import './titleCard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TitleCard = ({ title, category, endpoint }) => {
    const cardsRef = useRef();
    const { user, addFavorite, removeFavorite, favorites } = useAuth();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleWheel = (event) => {
        if (cardsRef.current) {
            event.preventDefault();
            cardsRef.current.scrollLeft += event.deltaY;
        }
    };

    useEffect(() => {
        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = '8f38a77b78899a5500c2f94daea756a1';
                const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [endpoint]);

    const handleFavorite = (movie) => {
        if (!user) {
            alert('You need to be logged in to add favorites!');
            return;
        }

        const isFavorite = favorites.some((fav) => fav.id === movie.id);
        if (isFavorite) {
            removeFavorite(movie.id);
            const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            addFavorite(movie);
            const updatedFavorites = [...favorites, movie];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
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
        <div className="title-card">
            <h2>
                {title || 'Popular Movies'} {category || 'Movies'}
            </h2>
            <div className="card-list" ref={cardsRef}>
                {movies.map((movie) => {
                    const isFavorite = favorites.some((fav) => fav.id === movie.id);

                    return (
                        <div className="card" key={movie.id} onClick={() => navigate(`/detail`, { state: { movie } })}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <button
                                className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavorite(movie);
                                }}
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TitleCard;
