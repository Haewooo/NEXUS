// src/frontend/src/pages/LoginPage.js
import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import '../styles/LoginPage.css';
import { initNear } from '../utils/nearUtils'; // Ensure nearUtils is correctly linked

async function loginWithMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      const response = await fetch('/api/auth/metamask-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Logged in:', data);
      } else {
        throw new Error('Failed to login with MetaMask');
      }
    } catch (error) {
      console.error('MetaMask login error:', error);
    }
  } else {
    alert('MetaMask is not installed');
  }
}

// NEAR login functionality
async function loginWithNEAR() {
  try {
    const walletConnection = await initNear();
    walletConnection.requestSignIn('near-ai-nexus.testnet'); 
  } catch (error) {
    console.error('NEAR login error:', error);
  }
}

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <div className="login-buttons">
          <button className="login-button metamask-button" onClick={loginWithMetaMask}>
            <FaEthereum className="icon" />
            Login with MetaMask
          </button>
          <button className="login-button near-button" onClick={loginWithNEAR}>
            Login with NEAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;