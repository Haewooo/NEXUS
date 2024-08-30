// src/components/ProposalPage.js
import React, { useState } from 'react';
import './ProposalPage.css';

function ProposalPage({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, description, tags: tags.split(',').map(tag => tag.trim()) });
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Proposal</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="8"
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProposalPage;