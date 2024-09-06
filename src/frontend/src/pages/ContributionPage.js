// src/frontend/src/pages/ContributionPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
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

  // 보상 수령 함수
  const handleWithdraw = async () => {
    setWithdrawing(true);
    try {
      const response = await fetch('/api/reward/withdraw', { method: 'POST' });
      const data = await response.json();
      alert(data.message);

      // 보상 수령 후 totalRewards 업데이트
      setTotalRewards(0); // 서버에서 보상을 성공적으로 인출한 후 totalRewards가 0으로 설정
      setWithdrawing(false);
    } catch (error) {
      console.error('Failed to withdraw rewards:', error);
      alert('Failed to withdraw rewards.');
      setWithdrawing(false);
    }
  };

  if (loading) {
    return <p>Loading contributions...</p>;
  }

  const labels = contributions.map((contribution) => contribution.task);
  const scores = contributions.map((contribution) => contribution.score);
  const rewards = contributions.map((contribution) => contribution.reward);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rewards (NEAR)',
        data: rewards,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        type: 'line',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // y축을 100으로 설정하여 백분율 기준으로 표시
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Contribution Scores & Rewards',
      },
    },
  };

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
            <p>You haven't made any contributions yet. Start contributing to earn rewards!</p>
          )}
          {totalRewards > 0 && (
            <button 
              className="withdraw-button" 
              onClick={handleWithdraw} 
              disabled={withdrawing}
            >
              {withdrawing ? 'Withdrawing...' : 'Withdraw Rewards to Wallet'}
            </button>
          )}
        </div>

        <div className="chart-container" style={{ margin: '0 auto', width: '80%' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ContributionPage;