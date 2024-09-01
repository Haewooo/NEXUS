// src/pages/CommunityPage.js
import React, { useState, useEffect } from 'react';
import ProposalPage from './ProposalPage';
import Navbar from '../components/Navbar';
import '../styles/CommunityPage.css';
import { useNavigate } from 'react-router-dom';

function CommunityPage({ searchQuery, onSearch }) {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [isPageOpen, setPageOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const url = searchQuery ? `/api/challenges?search=${searchQuery}` : '/api/challenges';
        const response = await fetch(url);
        const data = await response.json();
        setChallenges(data);
        setFilteredChallenges(data);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      }
    };
    fetchChallenges();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredChallenges(filtered);
    } else {
      setFilteredChallenges(challenges);
    }
  }, [searchQuery, challenges]);

  const handleChallengeClick = (id) => {
    navigate(`/challenge/${id}`);
  };

  const handleWriteButtonClick = () => {
    setPageOpen(true);
  };

  const handlePageClose = () => {
    setPageOpen(false);
  };

  const handlePageSubmit = async (newChallenge) => {
    if (newChallenge.title && newChallenge.description) {
      try {
        const response = await fetch('/api/challenges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newChallenge),
        });
        const savedChallenge = await response.json();
        setChallenges([...challenges, savedChallenge]);
        setFilteredChallenges([...challenges, savedChallenge]);
        setPageOpen(false);
      } catch (error) {
        console.error('Failed to submit new challenge:', error);
      }
    } else {
      alert('Fill in all the fields.');
    }
  };

  return (
    <div className="community-page">
      <Navbar onSearch={onSearch} />
      <div className="community-content">
        <h1>All Challenges</h1>
        <div className="model-list">
          {filteredChallenges.map((challenge) => (
            <div key={challenge._id} className="model-item" onClick={() => handleChallengeClick(challenge._id)}>
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