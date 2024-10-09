import React from 'react'; // Ensure React is imported
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/document.css';

const NewDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update document');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="document-container">
      <div className="document-content">
        <h2>Dokument {id}</h2>
        <p>Skapa Nytt Dokument</p>
      </div>
      <form className="document-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Titel</label>
        <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)}/>

        <label htmlFor="content">Innehåll</label>
        <textarea id="content" name="content" onChange={(e) => setContent(e.target.value)}></textarea>

        <button type="submit">Skapa</button>
      </form>
    </div>
  );
};

export default NewDocument;
