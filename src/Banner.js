import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import requests from './request';
import './Banner.css'

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchDAta() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            )
        }
        fetchDAta();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || '')
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(err => console.log(err));
        }
    }

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    return (
        <>
            <header className="banner" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>
                <div className="banner__contents">
                    <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                    <div className="banner__buttons">
                        <button className="banner__button" onClick={() => handleClick(movie)}>Play</button>
                        <button className="banner__button">My List</button>
                    </div>

                    <p className="banner__description">
                        {truncate(movie?.overview, 150)}
                    </p>
                </div>

                <div className="banner--fadeBottom"></div>
            </header>
            {trailerUrl && <YouTube opts={opts} videoId={trailerUrl} />}
        </>
    );
}

export default Banner;