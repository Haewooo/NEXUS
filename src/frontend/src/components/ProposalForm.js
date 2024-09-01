// src/components/ProposalForm.js
import React, { useState } from "react";

const ProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !tags) {
      setError('All fields are required.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, tags: tags.split(',').map(tag => tag.trim()) }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit challenge');
      }
  
      const result = await response.json();
      await onSubmit(result);
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

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter proposal title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter proposal description"
        required
      ></textarea>
      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default ProposalForm;