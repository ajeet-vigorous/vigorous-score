import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sportMatchList } from '../../middleware/Http';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);

    const fetchMatches = async () => {
        const matchData = await sportMatchList();
        setMatches(matchData.data);
    };

    useEffect(() => {
        fetchMatches();
        const intervalId = setInterval(fetchMatches, 300000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-dark home-container">
            <div className="display-4 mb-4 text-primary">Match List</div>
            <div className="list-group w-75 shadow-lg">
                {matches.length > 0 ? (
                    matches.map((match, index) => (
                        <button
                            key={index}
                            className="list-group-item list-group-item-action  d-flex justify-content-between align-items-center "
                            
                        >
                            <div className="match-info">
                                <h5 className="mb-1">{match.matchName}</h5>
                                <small>{(match.matchDate)}</small>
                            </div>
                            <div style={{ gap:"2px"}} className='d-flex '>
                            <span onClick={() => navigate(`/socket-iframe-1/crex/${match.eventId}`)} className="badge bg-primary rounded-pill match-item">View crex</span>
                            <span onClick={() => navigate(`/socket-iframe-1/crickexpo/${match.eventId}`)} className="badge bg-primary rounded-pill match-item">View crickexpo</span>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center p-5">Loading matches...</div>
                )}
            </div>
        </div>
    );
}

export default Home;


