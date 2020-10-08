import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="App">
            <Nav />
            <div>
                <h3>Home</h3>
            </div>
            <Footer />
        </div>
    );
}

export default Home;