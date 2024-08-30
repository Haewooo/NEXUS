// src/pages/CommunityPage.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import './CommunityPage.css';

function CommunityPage() {
  const [questions, setQuestions] = useState([
    { id: 1, title: 'How to reduce air pollution?', description: 'Discuss methods to reduce air pollution in urban areas.', tags: ['environment', 'pollution'] },
    { id: 2, title: 'Best practices for learning AI?', description: 'Share resources and tips for learning AI effectively.', tags: ['AI', 'learning'] },
    { id: 3, title: 'What is NEAR AI?', description: 'Explain NEAR AI and its applications.', tags: ['blockchain', 'NEAR', 'AI'] }
  ]);

  return (
    <div className="community-page">
      <Navbar />
      <div className="community-sidebar">
        <button className="vote-button">New Question</button>
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="question-item">
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <div className="tags">
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="community-content">
        <SearchBar placeholder="Search questions..." />
        {/* Add discussion topics and posts here */}
      </div>
    </div>
  );
}

export default CommunityPage;