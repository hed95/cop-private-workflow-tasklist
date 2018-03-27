import React from 'react'
import Footer from './components/Footer'
import Main from './Main'
import Header from "./components/Header";

const App = () => (
    <div>
        <Header/>
        <div className="container" style={{paddingTop : '20px'}}>
            <Main/>
        </div>
        <Footer/>
    </div>
)

export default App