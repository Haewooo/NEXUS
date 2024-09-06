// backend/utils/evaluateContributions.js
const Contribution = require('../models/Contribution');

async function calculatePercentiles() {
  // 모든 기여 데이터를 점수 기준으로 내림차순 정렬
  const contributions = await Contribution.find().sort({ score: -1 });

  // 백분위 계산
  contributions.forEach((contribution, index) => {
    const percentile = (index / contributions.length) * 100; // 백분위 계산
    contribution.percentile = percentile;
    contribution.reward = (percentile * 0.1).toFixed(2); // 백분위에 0.1을 곱한 값을 보상으로 지급
    contribution.save();  // 변경된 기여 데이터를 저장
  });

  return contributions;
}

module.exports = { calculatePercentiles };

