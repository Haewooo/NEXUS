const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const challengeRoutes = require('./routes/challengeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

app.use(helmet());
app.use(compression());

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/near_ai_platform');

app.use('/api/challenges', challengeRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});