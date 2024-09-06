// backend/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const Challenge = require('../models/Challenge'); // 프로젝트 모델을 가져옴
const router = express.Router();

// 업로드 설정: 파일이 저장될 경로와 파일 이름을 지정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// 특정 프로젝트에 데이터셋과 모델 파일을 업로드
router.post('/:id/upload', upload.fields([{ name: 'dataset' }, { name: 'model' }]), async (req, res) => {
  try {
    // 프로젝트(챌린지)를 데이터베이스에서 찾음
    const challenge = await Challenge.findById(req.params.id);

    // 투표가 완료되지 않았을 경우 업로드 불가
    if (challenge.voteStatus !== 'finished') {
      return res.status(400).json({ error: 'Voting not finished. Cannot upload files yet.' });
    }

    // 업로드된 데이터셋과 모델 파일을 프로젝트에 연결
    const dataset = req.files['dataset'][0];
    const model = req.files['model'][0];

    // 프로젝트 시작 상태 기록
    challenge.projectStarted = true;
    challenge.files = { dataset: dataset.filename, model: model.filename };
    await challenge.save();

    res.status(200).json({ message: 'Files uploaded and project started successfully.' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'File upload failed. Please try again.' });
  }
});

module.exports = router;