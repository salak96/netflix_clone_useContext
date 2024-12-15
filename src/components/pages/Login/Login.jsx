import React, { useState } from 'react';
import './login.css';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [signIn, setSignIn] = useState('Sign In');
    const [yourName, setYourName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook untuk navigasi

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signIn === 'Sign Up') {
            if (!yourName || !email || !password) {
                alert('Please fill in all fields to sign up.');
                return;
            }
            // Simpan data pengguna ke Local Storage
            localStorage.setItem('user', JSON.stringify({ name: yourName, email }));
            alert('Sign Up successful! You can now Sign In.');
            setSignIn('Sign In');
        } else {
            // Validasi untuk Sign In
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser && savedUser.email === email && password) {
                navigate('/home'); // Navigasi ke /home setelah berhasil login
            } else {
                alert('Invalid email or password.');
            }
        }
    
    };

    return (
        <div className='login'>
            <img className='login-logo' src={logo} alt='Netflix' />
            <div className='login-form'>
                <h1>{signIn}</h1>
                <form onSubmit={handleSubmit}>
                    {signIn === 'Sign Up' && (
                        <input type='text' placeholder='Your Name' value={yourName} onChange={(e) => setYourName(e.target.value)} />
                    )}
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>{signIn}</button>
                    <div className='form-help'>
                        <div className='remember'>
                            <input type='checkbox' id='remember' />
                            <label htmlFor='remember'>Remember Me</label>
                        </div>
                        <p>
                            <a href='/home'>No account</a>
                        </p>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className='form-switch'>
                    {signIn === 'Sign In' ? (
                        <p>
                            New to Netflix? <span onClick={() => setSignIn('Sign Up')}>Sign up now</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span onClick={() => setSignIn('Sign In')}>Sign in now</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
