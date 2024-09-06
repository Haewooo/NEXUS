// src/frontend/src/components/VoteComponent.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import '../styles/VoteComponent.css'; 

function VoteComponent({ proposalId, contractAddress, contractABI }) {
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          disabled={loading || vote === true}
          className={`vote-button yes-button ${vote === true ? 'selected' : ''}`}
        >
          Yes
        </button>
        <button
          onClick={() => handleVote(false)}
          disabled={loading || vote === false}
          className={`vote-button no-button ${vote === false ? 'selected' : ''}`}
        >
          No
        </button>
      </div>
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}
      {vote !== null && <p className="vote-result">You've voted: {vote ? 'Yes' : 'No'}</p>}
    </div>
  );
}

export default VoteComponent;