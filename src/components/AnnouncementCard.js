import React from 'react';

function AnnouncementCard({ id, title, description, date, category, image, onOpen, onDelete }) {
  // Short excerpt for card
  const excerpt = description.length > 120 ? description.slice(0, 117) + '...' : description;

  // Color classes or fallback
  const categoryColors = {
  Academic: 'bg-primary',
  Events: 'bg-success',
  Administrative: 'bg-info',
  Scholarships: 'bg-warning',
  Exams: 'bg-danger',
  Workshops: 'bg-secondary',
  Sports: 'bg-purple', 
  Others: 'bg-dark',
  General: 'bg-indigo', 
};

  const badgeClass = categoryColors[category] || 'bg-secondary';

  return (
    <div className="notice-card m-3" style={{width: 320}} onClick={() => onOpen && onOpen({id, title, description, date, category, image})}>
      <div className="card h-100 shadow-sm" style={{borderRadius:12, overflow:'hidden'}}>
        {image ? (
          <div style={{height:140, backgroundImage:`url(${image})`, backgroundSize:'cover', backgroundPosition:'center'}}/>
        ) : (
          <div className="card-hero-placeholder" style={{height:140, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span className="fw-bold text-white">NOTICE</span>
          </div>
        )}

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className={`badge ${badgeClass} text-white`}>{category}</span>
            <small className="text-muted">{date}</small>
          </div>

          <h5 className="card-title" style={{minHeight: '42px'}}>{title}</h5>
          <p className="card-text text-muted">{excerpt}</p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); onOpen && onOpen({id, title, description, date, category, image}); }}>
              Read
            </button>

            {/* Delete button */}
            {onDelete && (
              <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCard;
