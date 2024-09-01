const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const challengeRoutes = require('./routes/ChallengeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const daoRoutes = require('./routes/daoRoutes');

const app = express();

mongoose.connect('mongodb://localhost/near_ai_platform');

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/challenges', challengeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dao', daoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});