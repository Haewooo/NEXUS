// src/components/ProposalForm.js
import React, { useState } from "react";

const ProposalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/dao/create-proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      alert("Proposal created successfully!");
    } else {
      alert("Failed to create proposal.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter proposal title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter proposal description"
        required
      ></textarea>
      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default ProposalForm;