import './index.css'; // Ensure you have Tailwind set up in your project
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/pages/Profile/profile';
import Detail from './components/pages/Detail/detailMovies';
import Favorites from './components/pages/Favorite/Favorite';
function App() {
    return (
        <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/detail' element={<Detail />} />
                    <Route
                        path="/favorites"
                        element={
                            
                                <Favorites />
                                                    }
                    />
                    <Route path='/home' element={<Home />} />
                    <Route path='*' element={<Login />} />
                </Routes>
        </AuthProvider>
    );
}

export default App;
