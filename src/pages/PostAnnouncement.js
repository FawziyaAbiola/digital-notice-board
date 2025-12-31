import { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementModal from '../components/AnnouncementModal';
import announcementsData from '../data/announcementData';

// Default categories
const defaultCategories = [
  'Academic', 'Events', 'Administrative',
  'Scholarships', 'Exams', 'Workshops',
  'Sports', 'Others'
];

// Static welcome card
const staticAnnouncement = {
  id: 0,
  title: 'Welcome to the Digital Notice Board!',
  description: 'This platform allows you to view all academic, event, and administrative announcements. Stay tuned for updates!',
  category: 'General',
  date: new Date().toISOString().split('T')[0],
};

function PostAnnouncement() {
  // Load announcements from localStorage or initialize
  const [announcements, setAnnouncements] = useState(() => {
    const stored = localStorage.getItem('announcements');
    if (stored) return JSON.parse(stored);

    // static card + data from announcementData.js
    return [staticAnnouncement, ...announcementsData.map(a => ({
      ...a,
      date: a.date || new Date().toISOString().split('T')[0],
    }))];
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Merge current categories with default categories
  const categories = useMemo(() => {
    const current = Array.from(new Set(announcements.map(a => a.category)));
    return [...new Set([...current, ...defaultCategories])];
  }, [announcements]);

  const filtered = announcements.filter(a => {
    const q = query.toLowerCase();
    return (a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || q === '')
      && (filterCategory === '' || a.category === filterCategory);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category.trim()) {
      alert("Please fill in all fields before posting.");
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      date: new Date().toISOString().split('T')[0], // Current date
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);

    setTitle('');
    setDescription('');
    setCategory('');
    alert("Announcement added successfully!");
  };

  const openDetails = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4 fw-bold text-primary">Post a New Announcement</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="announcement-form mb-5 p-4 shadow-sm rounded bg-white">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Description"
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Post Announcement
          </button>
        </form>

        {/* Announcements List */}
        <h3 className="mb-3 fw-bold">All Announcements</h3>

        <SearchBar
          query={query}
          setQuery={setQuery}
          category={filterCategory}
          setCategory={setFilterCategory}
          categories={categories}
        />

        <div className="d-flex flex-wrap justify-content-start mb-5">
          {filtered.map(a => (
            <AnnouncementCard
              key={a.id}
              {...a}
              onOpen={openDetails}
              onDelete={handleDelete} // Only PostAnnouncement has delete
            />
          ))}
        </div>
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selected}
      />
    </>
  );
}

export default PostAnnouncement;
