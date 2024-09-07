import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from '../components/Navbar';
import VoteComponent from '../components/VoteComponent';
import '../styles/UploadPage.css';

function UploadPage() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [model, setModel] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [voteStatus, setVoteStatus] = useState(null);

  const contractAddress = "스마트 컨트랙트 주소"; 
  const contractABI = [
    "function getProposalStatus(uint256 _proposalId) public view returns (bool)"
  ];

  // 투표 상태를 블록체인에서 가져오는 함수
  const fetchVoteStatus = async () => {
    if (!window.ethereum) {
      console.error('MetaMask is not installed');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const status = await contract.getProposalStatus(id);
      setVoteStatus(status ? 'finished' : 'ongoing');
    } catch (error) {
      console.error('Error fetching vote status from blockchain:', error);
    }
  };

  // 챌린지 데이터를 불러오는 함수
  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await fetch(`/api/challenges/${id}`);
        if (response.ok) {
          const data = await response.json();
          setChallenge(data);
        } else {
          console.error('Failed to fetch challenge data');
        }
      } catch (error) {
        console.error('Error fetching challenge data:', error);
      }
    };

    fetchChallengeData();
    fetchVoteStatus();
  }, [id]);

  const handleDatasetChange = (e) => {
    setDataset(e.target.files[0]);
  };

  const handleModelChange = (e) => {
    setModel(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('dataset', dataset);
    formData.append('model', model);

    try {
      const response = await fetch(`/api/challenges/${id}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Models Uploaded Successfully');
      } else {
        alert('Upload failed, please try again.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Upload failed, please try again.');
    }
  };

  return (
    <div className="upload-page">
      <Navbar />
      <div className="upload-container">
        <h1>Upload Model or Dataset</h1>
        {challenge ? (
          <div className="challenge-details">
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <div className="tags">
              {challenge.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading challenge data...</p>
        )}

        <div>
          <h2>Upload your model or dataset here:</h2>
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

        <div>
          <h2>Voting Component</h2>
          <VoteComponent
            proposalId={id}
            contractAddress={contractAddress}
            contractABI={contractABI}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
