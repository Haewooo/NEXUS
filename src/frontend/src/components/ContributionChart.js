// src/components/ContributionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/ContributionPage.css';

function ContributionChart({ contributions }) {
  const labels = contributions.map((contribution) => contribution.task);
  const scores = contributions.map((contribution) => contribution.score);
  const rewards = contributions.map((contribution) => contribution.reward);

  const chartData = {
    labels,
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
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Contribution Scores & Rewards' },
    },
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-container" style={{ margin: '0 auto', width: '60%', height: '300px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default ContributionChart;