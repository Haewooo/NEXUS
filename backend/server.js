// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const challengeRoutes = require('./routes/challengeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const daoRoutes = require('./routes/daoRoutes');
const contributionRoutes = require('./routes/ContributionRoutes');
const loginRoutes = require('./routes/LoginRoutes'); 

const app = express();

// 미들웨어 설정
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost/near_ai_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // DB 연결에 실패하면 서버가 종료
  });

// 라우트 설정
app.use('/api/challenges', challengeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dao', daoRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/login', loginRoutes);  // 로그인 관련 라우트 설정

// 404 에러 처리 (라우트가 존재하지 않을 경우)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// 서버에서 예상하지 못한 오류 처리
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 포트 설정 및 서버 시작
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});