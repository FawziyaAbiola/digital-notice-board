import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PostAnnouncement from './pages/PostAnnouncement';
import announcementsData from './data/announcementData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Static welcome announcement
const staticAnnouncement = {
  id: 0,
  title: 'Welcome to the Digital Notice Board!',
  description:
    'This platform allows you to view all academic, event, and administrative announcements. Stay tuned for updates!',
  category: 'General',
  date: new Date().toISOString().split('T')[0],
};

function App() {
  const [announcements, setAnnouncements] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('announcements'));
    return stored ? stored : [staticAnnouncement, ...announcementsData];
  });

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Dashboard announcements={announcements} />}
        />
        <Route
          path="/post"
          element={
            <PostAnnouncement
              announcements={announcements}
              setAnnouncements={setAnnouncements}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
