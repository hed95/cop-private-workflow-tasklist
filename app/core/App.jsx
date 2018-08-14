import React from 'react'
import Footer from './components/Footer'
import Main from './Main'
import Header from "./components/Header";
import SubmissionBanner from "./components/SubmissionBanner";

const App = () => (
    <div>
        <Header/>
        <SubmissionBanner />
        <div className="container" style={{height:'100vh'}}>
            <Main/>
        </div>
        <Footer/>
    </div>
);

export default App