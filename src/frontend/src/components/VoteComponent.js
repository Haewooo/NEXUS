import React, { useState } from 'react';
import { ethers } from 'ethers';

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
      // 메타마스크 연결
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
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
    <div className="vote-component">
      <h3>Vote on Proposal</h3>
      <button
        onClick={() => handleVote(true)}
        disabled={loading || vote === true}
        style={{ backgroundColor: vote === true ? 'green' : '' }}
      >
        Vote Yes
      </button>
      <button
        onClick={() => handleVote(false)}
        disabled={loading || vote === false}
        style={{ backgroundColor: vote === false ? 'red' : '' }}
      >
        Vote No
      </button>
      {loading && <p>Submitting vote...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {vote !== null && <p>You've voted: {vote ? 'Yes' : 'No'}</p>}
    </div>
  );
}

export default VoteComponent;