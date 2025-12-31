import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AnnouncementModal({ show, onHide, data }) {
  if (!data) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2"><small className="text-muted">{data.category} • {data.date}</small></div>
        {data.image && <img src={data.image} alt="" className="img-fluid rounded mb-3" />}
        <p>{data.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AnnouncementModal;
