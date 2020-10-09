import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Template
import Sidebar from './template/Sidebar';
import Nav from './template/Nav';
import Footer from './template/Footer';
// Contents
import ContentHome from './contents/ContentHome';
import ContentUser from './contents/ContentUsers';

const Home = () => {
    const [toggleButton, setToggleButton] = useState('');
    return (
        <Router>
            <div className="App wrapper">
                <Sidebar toggleButton={toggleButton} />
                <div id="content">
                    <Nav setToggleButton={setToggleButton} toggleButton={toggleButton} />
                    <div>
                        <Switch>
                            <Route path="/" exact component={ContentHome} />
                            <Route path="/home" exact component={ContentHome} />
                            <Route path="/home/user" exact component={ContentUser} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default Home;