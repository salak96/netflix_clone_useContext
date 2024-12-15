import React, { useState } from 'react';
import './login.css';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [signIn, setSignIn] = useState('Sign In');
    const [yourName, setYourName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (signIn === 'Sign Up') {
            if (!yourName || !email || !password) {
                alert('Please fill in all fields to sign up.');
                return;
            }
            // Save user data including the password to localStorage
            const userData = { name: yourName, email, password };
            localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
            login(userData); // Set user in context
            alert('Sign Up successful! You can now Sign In.');
            setSignIn('Sign In');
        } else {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser && savedUser.email === email && savedUser.password === password) {
                login(savedUser); // Set user in context
                navigate('/home'); // Redirect to home page
            }
        }
    };

    return (
        <div className='login'>
            <img className='login-logo' src={logo} alt='Logo' />
            <div className='login-form'>
                <h1>{signIn}</h1>
                <form onSubmit={handleSubmit}>
                    {signIn === 'Sign Up' && (
                        <input
                            type='text'
                            placeholder='Your Name'
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                        />
                    )}
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                            New to the platform? <span onClick={() => setSignIn('Sign Up')}>Sign up now</span>
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
