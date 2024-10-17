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
  const [isEditMode, setIsEditMode] = useState(false);


  
  

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

        const response = await fetch(`http://localhost:8080/data/${id}`, {
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
      const escapedText = comment.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      const regex = new RegExp(`(${escapedText})`, "g");
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

      const response = await fetch(`http://localhost:8080/data`, {
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
            className="title-input"
          />

          <label htmlFor="content">Innehåll</label>

          {isEditMode ? (
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onMouseUp={handleTextSelect}
              className="content-textarea"
            ></textarea>
          ) : (
            <div
              id="content-display"
              className="content-display"
              dangerouslySetInnerHTML={getHighlightedContent()}
            />
          )}

          <button type="submit" className="update-button">
            Update
          </button>
        </form>

        <br />

        <button onClick={() => setIsEditMode(!isEditMode)} className="toggle-button">
          {isEditMode ? "Switch to View Mode" : "Switch to Edit Mode"}
        </button>
      </div>

      <div className="comment-section">
        {selectedText && (
          <form onSubmit={handleAddComment}>
            <p>Selected text: "{selectedText}"</p>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment"
              className="comment-textarea"
            ></textarea>
            <br />
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
        )}

        <div className="comments-section">
          <h3>Comments</h3>
          <ul className="comments-list">
            {comments.map((c, index) => (
              <li
                key={index}
                className="comment-item"
                onMouseEnter={() => setHoveredCommentIndex(index)}
                onMouseLeave={() => setHoveredCommentIndex(null)}
              >
                <span className="comment-text">
                  <strong>On "{c.text}":</strong> {c.comment}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteComment(index);
                  }}
                  className="delete-comment-button"
                >
                  ✓
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );  
};

export default Document;
