import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage';
import LevelPage from './components/LevelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
