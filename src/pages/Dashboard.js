import { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementModal from '../components/AnnouncementModal';
import announcementsData from '../data/announcementData';

function Dashboard() {
  // Load from localStorage or default to announcementsData
  const [announcements] = useState(() => {
    const stored = localStorage.getItem('announcements');
    if (stored) return JSON.parse(stored);

    // Map static announcements to ensure date is present
    return announcementsData.map(a => ({
      ...a,
      date: a.date || new Date().toISOString().split('T')[0],
    }));
  });

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Keep localStorage in sync 
  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const categories = useMemo(
    () => Array.from(new Set(announcements.map(a => a.category))),
    [announcements]
  );

  const filtered = announcements.filter(a => {
    const q = query.toLowerCase();
    return (
      (a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        q === '') &&
      (category === '' || a.category === category)
    );
  });

  const openDetails = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="container">
          <h2 className="fw-bold mb-1">Digital Notice Board</h2>
          <p className="text-muted mb-0">
            Official academic, event, and administrative announcements for Bells University students
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <div className="container mt-4 mb-3">
        <SearchBar
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="container mb-5">
        <div className="d-flex flex-wrap gap-3">
          {filtered.length > 0 ? (
            filtered.map(a => (
              <AnnouncementCard
                key={a.id}
                {...a}
                onOpen={openDetails}
              />
            ))
          ) : (
            <div className="text-center text-muted w-100 mt-5">
              <h5>No announcements found</h5>
              <p>Try adjusting your search or filter options.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnnouncementModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selected}
      />
    </>
  );
}

export default Dashboard;
