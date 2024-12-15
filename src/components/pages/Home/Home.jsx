import React from 'react';
import './Home.css';
import Navbar from '../../Navbar/navbarNetflix';
import heroBanner from '../../../assets/poster.jpg';
import heroTitle from '../../../assets/hero_title.png';
import infoIcon from '../../../assets/info_icon.png';
import TitleCard from '../../titleCards/titleCard';
import Footer from '../../Footer/footer';

const PlayIcon = '/play_icon.png'; // Mengakses file dari folder public secara langsung
const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="hero">
                    <img src={heroBanner} alt="banner" className="banner-img" />
                    <div className="hero-caption">
                        <img src={heroTitle} alt="title" className="caption-img" />
                        <p>
                            "Ipar Adalah Maut" berhasil menarik perhatian lebih dari 3 juta penonton hanya dalam waktu 14 hari sejak penayangan
                            perdananya pada 13 Juni 2024 lalu. Melalui akun Instagram resmi, @iparadalahmautmovie, mereka mengumumkan capaian terbaru
                            ini dengan jumlah penonton mencapai 3.051.789 orang.
                        </p>
                        <div className="hero-btns">
                            <button className="btn">
                                <img src={PlayIcon} alt="Play Icon" />
                                Play
                            </button>
                            <button className="btn dark-btn">
                                <img src={infoIcon} alt="info" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
                <div className="more-cards">
                    <TitleCard title={'Only on Netflix'} category={'Movies'} endpoint={'now_playing'}/>
                    <TitleCard title={'Upcoming'} category={'TV Shows'} endpoint={`top_rated`} />
                    <TitleCard title={'Favorite'} category={'Web Series'} endpoint={`top_rated`} />
                    <TitleCard title={'Top Picks for You'} category={'Web Series'} endpoint={`upcoming`} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
