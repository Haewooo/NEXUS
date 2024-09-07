// src/pages/UploadPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import Navbar from '../components/Navbar';
import VoteComponent from '../components/VoteComponent';
import '../styles/UploadPage.css';

function UploadPage() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [model, setModel] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [voteStatus, setVoteStatus] = useState(null);
  const [error, setError] = useState(null);  // Add error state for graceful error handling

  const contractAddress = "near-ai-nexus.testnet";

  // Fetch voting status from NEAR contract
  const fetchVoteStatus = async () => {
    try {
      const nearConfig = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        contractId: contractAddress,
      };

      const near = await connect(nearConfig);
      const walletConnection = new WalletConnection(near);

      const accountId = walletConnection.getAccountId(); // Get logged in account ID
      const account = await near.account(accountId);

      const contract = new Contract(account, contractAddress, {
        viewMethods: ['getProposalStatus'],
        changeMethods: [], 
      });

      const status = await contract.getProposalStatus({ _proposalId: id });
      setVoteStatus(status ? 'finished' : 'ongoing');
    } catch (error) {
      console.error('Error fetching vote status from NEAR:', error);
      setError('Error fetching vote status');  // Set error message if any issue
    }
  };

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
        setError('Failed to load challenge details');  // Set an error message
      }
    };

    fetchChallengeData();
    fetchVoteStatus();
  }, [id]);

  const handleDatasetChange = (e) => setDataset(e.target.files[0]);
  const handleModelChange = (e) => setModel(e.target.files[0]);

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

        {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}

        {challenge ? (
          <div className="challenge-details">
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
          </div>
        ) : (
          <p>Loading challenge data...</p>
        )}

        {voteStatus === 'finished' || voteStatus === 'ongoing' ? (
          <div>
            <h2>Voting Completed! You can now upload your model or dataset.</h2>
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
        ) : (
          <div>
            <h2>Voting Ongoing</h2>
            <VoteComponent
              proposalId={id}
              contractAddress={contractAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;