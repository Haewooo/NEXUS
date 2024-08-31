// src/pages/CommunityPage.js
import React, { useState } from 'react';
import ProposalPage from './ProposalPage';
import Navbar from '../components/Navbar';
import '../styles/CommunityPage.css';
import { useNavigate } from 'react-router-dom';

function CommunityPage() {
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Want to reduce air pollution?', description: 'Give me your homes dataset.', tags: ['environment', 'pollution'] },
    { id: 2, title: 'Lets reduce traffic jam with AI', description: 'yeah', tags: ['AI', 'learning'] },
    { id: 3, title: 'NEAR AI?', description: 'Explore NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 4, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 5, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 6, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 7, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 8, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 9, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] },
    { id: 10, title: 'NEAR AI?', description: 'Explain NEAR AI.', tags: ['blockchain', 'NEAR', 'AI'] }
  ]);

  const navigate = useNavigate();
    
  const handleChallengeClick = (id) => {
    navigate(`/challenge/${id}`);
  };

  const [isPageOpen, setPageOpen] = useState(false);

  const handleWriteButtonClick = () => {
    setPageOpen(true);
  };

  const handlePageClose = () => {
    setPageOpen(false);
  };

  const handlePageSubmit = (newChallenge) => {
    if (newChallenge.title && newChallenge.description) {
      setChallenges([...challenges, { ...newChallenge, id: challenges.length + 1 }]);
      setPageOpen(false); 
    } else {
      alert("Fill in all the fields.");
    }
  };

  return (
    <div className="community-page">
      <Navbar />
      <div className="community-content">
        <h1>All Challenges</h1>
        <div className="model-list">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="model-item" onClick={() => handleChallengeClick(challenge.id)}>
              <h2>{challenge.title}</h2>
              <p>{challenge.description}</p>
              <div className="tags">
                {challenge.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="write-button" onClick={handleWriteButtonClick}>Propose Challenge</button>
      </div>
      {isPageOpen && (
        <ProposalPage 
          isOpen={isPageOpen} 
          onClose={handlePageClose} 
          onSubmit={handlePageSubmit} 
        />
      )}
    </div>
  );
}

export default CommunityPage;