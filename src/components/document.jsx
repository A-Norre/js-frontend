import React from 'react'; // Ensure React is imported
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/document.css';

const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to manage form input
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/${id}`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
          },  
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setTitle(result.title);
        setContent(result.content);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${id}`,
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

  if (loading) {
    return <div className="loading">Loading document...</div>;
  }

  return (
    <div className="document-container">
      <div className="document-content">
        <h2>Dokument: {title}</h2>
        <form className="document-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">Innehåll</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Document;
