// src/components/ProposalPage.js
import React, { useState } from 'react';
import '../styles/ProposalPage.css';

function ProposalPage({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !tags) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({ title, description, tags: tags.split(',').map(tag => tag.trim()) });
      setTitle('');
      setDescription('');
      setTags('');
      setError('');
      onClose();
    } catch (err) {
      setError('Failed to submit proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Proposal</h2>
        {error && <p className="error-message">{error}</p>}
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
          <button className="cancel-button" onClick={onClose} disabled={isLoading}>Cancel</button>
          <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProposalPage;