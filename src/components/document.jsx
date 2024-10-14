import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/document.css';

const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]); 
  const [selectedText, setSelectedText] = useState(""); 
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
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

  const handleTextSelect = () => {
    const selected = window.getSelection().toString();
    setSelectedText(selected);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (selectedText && newComment) {
      setComments([...comments, { text: selectedText, comment: newComment }]);
      setNewComment("");
      setSelectedText("");
    }
  };

  const handleDeleteComment = (index) => {
  const updatedComments = comments.filter((_, i) => i !== index);
  setComments(updatedComments);
  };

  const getHighlightedContent = () => {
    let highlightedContent = content;

    comments.forEach((comment, index) => {
      const regex = new RegExp(`(${comment.text})`, "g");
      highlightedContent = highlightedContent.replace(
        regex,
        (match) => 
          index === hoveredCommentIndex
            ? `<mark style="background-color: yellow;">${match}</mark>`
            : match
      );
    });

    return { __html: highlightedContent };
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
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
            onMouseUp={handleTextSelect}
            style={{
              width: '100%',
              height: '200px',
              marginBottom: '10px',
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          ></textarea>

          <button type="submit">Update</button>
        </form>

        <br />

        <div className="comment-section">
          {selectedText && (
            <form onSubmit={handleAddComment}>
              <p>Selected text: "{selectedText}"</p>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment"
              ></textarea>
              <br />
              <button type="submit">Add Comment</button>
            </form>
          )}

          <div className="comments-section">
            <h3>Comments</h3>
            <ul>
              {comments.map((c, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredCommentIndex(index)}
                  onMouseLeave={() => setHoveredCommentIndex(null)}
                >
                  <strong>On "{c.text}":</strong> {c.comment}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteComment(index);
                    }}
                    style={{
                      marginLeft: "10px",
                      background: "none",
                      border: "none",
                      color: "green",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✓
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
