import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../style/document.css';

const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shared, setShared] = useState('');
  const [comments, setComments] = useState([]); 
  const [selectedText, setSelectedText] = useState(""); 
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredCommentIndex, setHoveredCommentIndex] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3030`); // Connecting to the server
    newSocket.emit('joinRoom', id); // Sending the chatroom ID to the server
    setSocket(newSocket);
    return () => newSocket.close();
}, [id]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/document/${id}`, {
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

  useEffect(() => {
    if (!socket) return;

      socket.on('updateContent', (newContent) => {
        setContent(newContent);
      });
    
      socket.on('updateTitle', (newTitle) => {
        setTitle(newTitle);
      });

      return () => {
        socket.off('updateContent');
        socket.off('updateTitle');
      };
    }, [socket]);

    // Emit title changes to the server
    const handleTitleChange = (e) => {
      const newTitle = e.target.value;
      setTitle(newTitle);

      // Emit title change to server
      socket.emit('titleChange', { documentId: id, newTitle });
    };

    // Emit content changes to the server
    const handleContentChange = (e) => {
      const newContent = e.target.value;
      setContent(newContent);

      // Emit content change to server
      socket.emit('contentChange', { documentId: id, newContent });
    };

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

  const handleShare = async (e) => {
    e.preventDefault();
    console.log('Sharing with:', shared);

    try {
      const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login'); // Redirect if no token is found
        }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/data/share`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${id}`,
          shared,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share document');
      } else {

        const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mailgun`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: shared,
            subject: `Document shared with you: ${title}`,
            text: `You have been granted access to a document, ${import.meta.env.VITE_BACKEND_URL}/document/${id}`,
          }),
        });

        if (!data.ok) {
          throw new Error('Failed to send email');
        }
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
            //onChange={(e) => setTitle(e.target.value)}
            onChange={handleTitleChange}
          />

          <label htmlFor="content">Innehåll</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
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
        
        <form className='document-form' onSubmit={handleShare}>
          <input
            type="input"
            id="username"
            name="username"
            value={shared}
            placeholder='Username to share with'
            onChange={(e) => setShared(e.target.value)}
          />

          <button type="submit">Share</button>
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
