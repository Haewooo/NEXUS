// src/frontend/src/components/VoteComponent.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import '../styles/VoteComponent.css'; 

function VoteComponent({ proposalId, contractAddress, contractABI }) {
  const [vote, setVote] = useState(null);  // null means no vote yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVote = async (voteType) => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.voteOnProposal(proposalId, voteType);
      await tx.wait();

      setVote(voteType);

      // Redirect to the upload page after vote
      navigate('/upload');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vote-component-card">
      <h3>Vote on Proposal #{proposalId}</h3>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote(true)}
          disabled={loading}
          className={`vote-button yes-button ${vote === true ? 'selected' : ''}`}
        >
          Yes
        </button>
        <button
          onClick={() => handleVote(false)}
          disabled={loading}
          className={`vote-button no-button ${vote === false ? 'selected' : ''}`}
        >
          No
        </button>
      </div>
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}

      {/* Always display the result section */}
      <div className="vote-result">
        {vote === true && <p>You voted: Yes</p>}
        {vote === false && <p>You voted: No</p>}
        {vote === null && <p>You haven't voted yet. Please cast your vote.</p>}
      </div>
    </div>
  );
}

export default VoteComponent;