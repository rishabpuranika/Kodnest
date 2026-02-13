import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components';
import { Landing, Dashboard, Saved, Digest, Settings, Proof, Test, Ship, NotFound } from './pages';
import './styles/design-system.css';
import './styles/components.css';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/digest" element={<Digest />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/proof" element={<Proof />} />
          <Route path="/jt/07-test" element={<Test />} />
          <Route path="/jt/08-ship" element={<Ship />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
