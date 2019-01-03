import React, { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import DataSpinner from '../core/components/DataSpinner';
import Main from './Main';

const SubmissionBanner = lazy(() => import('../core/components/SubmissionBanner'));

const App = () => (
  <div>
    <Header/>
    <Suspense
      fallback={<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}><DataSpinner message="..."/></div>}>
      <SubmissionBanner/>
    </Suspense>
    <div className="container" style={{ height: '100vh' }}>
        <Main/>
    </div>
    <Footer/>
  </div>
);

export default App;
