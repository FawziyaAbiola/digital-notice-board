import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ query, setQuery, category, setCategory, categories }) {
  return (
    <div className="container mb-4">
      <div className="d-flex gap-2">
        <div className="flex-grow-1 input-group">
          <span className="input-group-text bg-white"><FaSearch /></span>
          <input
            className="form-control"
            placeholder="Search announcements, titles, dates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className="form-select w-auto" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
