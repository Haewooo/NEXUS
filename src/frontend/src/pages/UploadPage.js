// src/pages/UploadPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './UploadPage.css';

function UploadPage() {
  const { id } = useParams(); 
  const [dataset, setDataset] = useState(null);
  const [model, setModel] = useState(null);
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const fetchChallengeData = async () => {
      const response = await fetch(`/api/challenges/${id}`); // example api
      const data = await response.json();
      setChallenge(data);
    };

    fetchChallengeData();
  }, [id]);
  const handleDatasetChange = (e) => {
    setDataset(e.target.files[0]);
  };

  const handleModelChange = (e) => {
    setModel(e.target.files[0]);
  };

  const handleUpload = () => {
    alert('Models Uploaded');
  };

  return (
    <div className="upload-page">
      <Navbar />
      <div className="upload-container">
        <h1>Upload Model or Dataset</h1>
        {challenge && (
          <div className="challenge-details">
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <div className="tags">
              {challenge.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
        <div className="upload-section">
          <label htmlFor="dataset-upload">Upload Dataset:</label>
          <input type="file" id="dataset-upload" onChange={handleDatasetChange} />
        </div>
        <div className="upload-section">
          <label htmlFor="model-upload">Upload AI Model:</label>
          <input type="file" id="model-upload" onChange={handleModelChange} />
        </div>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadPage;