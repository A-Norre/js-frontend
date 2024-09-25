import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/document.css';

const NewDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://jsramverk-eafmccbgceegf9bt.northeurope-01.azurewebsites.net/data`, {
        method: 'POST',
        headers: {
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
        <h2>Skapa Nytt Dokument</h2>
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
