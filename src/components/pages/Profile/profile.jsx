// src/pages/Profile.js
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>{user.name}'s Profile</h2>
            <p>Email: {user.email}</p>
            {/* Tambahkan informasi lain tentang pengguna */}
        </div>
    );
};

export default Profile;
