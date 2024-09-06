// src/frontend/src/pages/ContributionPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContributionChart from '../components/ContributionChart';
import '../styles/ContributionPage.css';

function ContributionPage() {
  const [contributions, setContributions] = useState([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/contributions');
        const data = await response.json();
        setContributions(data.contributions);
        setTotalRewards(data.totalRewards);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const handleWithdraw = async () => {
    setWithdrawing(true);
    try {
      const response = await fetch('/api/reward/withdraw', { method: 'POST' });
      const data = await response.json();
      alert(data.message);
      setTotalRewards(0);
      setWithdrawing(false);
    } catch (error) {
      console.error('Failed to withdraw rewards:', error);
      alert('Failed to withdraw rewards.');
      setWithdrawing(false);
    }
  };

  if (loading) return <p>Loading contributions...</p>;

  return (
    <div className="contribution-page">
      <Navbar />
      <div className="contribution-content">
        <h1>Contributions</h1>
        <p>Total Rewards: {totalRewards} NEAR</p>
        <div className="contribution-list">
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <div key={contribution.id} className="contribution-item">
                <h2>{contribution.task}</h2>
                <p>Contribution Type: {contribution.type}</p>
                <p>Reward: {contribution.reward} NEAR</p>
                <p>Score: {contribution.score}</p>
              </div>
            ))
          ) : (
            <p>You haven't made any contributions yet.</p>
          )}
          {totalRewards > 0 && (
            <button className="withdraw-button" onClick={handleWithdraw} disabled={withdrawing}>
              {withdrawing ? 'Withdrawing...' : 'Withdraw Rewards to Wallet'}
            </button>
          )}
        </div>
        {/* Moved ContributionChart to a dedicated component */}
        <ContributionChart contributions={contributions} />
      </div>
    </div>
  );
}

export default ContributionPage;