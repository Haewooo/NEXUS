// src/frontend/src/pages/LoginPage.js
import React from 'react';
import { FaEthereum, FaWallet } from 'react-icons/fa';
import '../styles/LoginPage.css';

async function loginWithNEAR() {
    try {
        const response = await fetch('/api/auth/near-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const userData = await response.json();
        console.log('User data:', userData);
    } catch (error) {
        console.error('NEAR login error:', error);
    }
}

async function loginWithMetaMask() {
    try {
        const response = await fetch('/api/auth/metamask-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const userData = await response.json();
        console.log('User data:', userData);
    } catch (error) {
        console.error('MetaMask login error:', error);
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
                        <FaWallet className="icon" />
                        Login with NEAR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;