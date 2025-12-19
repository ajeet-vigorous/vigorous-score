import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Iframeoptions() {
    let { marketId, eventId } = useParams();
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-around p-3">
            <button  onClick={() => navigate(`/socket-iframe1/${marketId}/${eventId}`)} className="btn btn-primary">Iframe 1</button>
            <button onClick={() => navigate(`/socket-iframe2/${marketId}/${eventId}`)} className="btn btn-secondary">Iframe 2</button>
            <button onClick={() => navigate(`/socket-iframe3/${marketId}/${eventId}`)} className="btn btn-success">Iframe 3</button>
        </div>
    );
}

export default Iframeoptions;
