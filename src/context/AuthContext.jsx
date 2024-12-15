import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(); // Membuat context

export const useAuth = () => useContext(AuthContext); // Hook untuk mengakses context

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedUser) {
            setUser(storedUser);
            setFavorites(storedFavorites);
        }
    }, []);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            setUser(storedUser);
        } else {
            alert('Invalid email or password');
        }
    };

    const logout = () => {
        setUser(null);
        setFavorites([]);
        localStorage.removeItem('user');
    };

    const signUp = (name, email, password) => {
        const newUser = { name, email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const addFavorite = (movie) => {
        if (!favorites.some((fav) => fav.id === movie.id)) {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const removeFavorite = (movieId) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                favorites,
                login,
                logout,
                signUp,
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
