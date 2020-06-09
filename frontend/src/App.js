import React from "react";
import './App.scss';

import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div className="legoManager">
        <div className="header">
            <Header />
        </div>
        <div className="mainBody">
            <MainBody />
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
  );
}
