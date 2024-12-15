import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating the Authentication Context
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            setUser(storedUser);
        } 
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const signUp = (name, email, password) => {
        const newUser = { name, email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
