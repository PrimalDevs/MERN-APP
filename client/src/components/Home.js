import React from 'react';
import Sidebar from './Sidebar';
import Nav from './Nav';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="App wrapper">
            <Sidebar />
            <div id="content">
                <Nav />
                <div className="content">
                    <h3>Home</h3>
                    <p>Home</p>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;