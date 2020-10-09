import React, {useState} from 'react';
import Sidebar from './template/Sidebar';
import Nav from './template/Nav';
import Footer from './template/Footer';
import ContentHome from './contents/ContentHome';

const Home = () => {
    const [toggleButton, setToggleButton] = useState('');
    return (
        <div className="App wrapper">
            <Sidebar toggleButton={ toggleButton } />
            <div id="content">
                <Nav setToggleButton={ setToggleButton } toggleButton={ toggleButton } />
                {/* Switch para saber que apartado cargar */}
                <ContentHome />
                <Footer />
            </div>
        </div>
    );
}

export default Home;