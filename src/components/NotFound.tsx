import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div>404 Not found</div>
            <Link to="/">Back to main page</Link>
        </>
    );
};

export default NotFound;
