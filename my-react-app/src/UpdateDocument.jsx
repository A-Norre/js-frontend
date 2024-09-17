import { useParams, useNavigate } from 'react-router-dom';
import './Document.css';

const UpdateDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="document-container">
      <div className="document-content">
        <h2>Dokument {id}</h2>
        <p>Uppdatera Dokument {id}</p>
      </div>
      <form className="document-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Titel</label>
        <input type="text" id="title" name="title" />

        <label htmlFor="content">Innehåll</label>
        <textarea id="content" name="content"></textarea>

        <button type="submit">Uppdatera</button>
      </form>
    </div>
  );
};

export default UpdateDocument;
