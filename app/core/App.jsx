import React, { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import DataSpinner from '../core/components/DataSpinner';

const Main = lazy(() => import('./Main'));
const SubmissionBanner = lazy(() => import('../core/components/SubmissionBanner'));

const App = () => (
  <div>
    <Header/>
    <SubmissionBanner/>
    <div className="container" style={{ height: '100vh' }}>
      <Suspense
        fallback={<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
          <DataSpinner message="Loading main..."/></div>}>
        <Main/>
      </Suspense>
    </div>
    <Footer/>
  </div>
);

export default App;
