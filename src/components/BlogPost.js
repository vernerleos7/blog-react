import React, { useContext, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { BlogContext } from '../BlogContext';
import { AuthContext } from '../AuthContext';
import Header from './Header';

const BlogPost = () => {
  const { postId } = useParams();
  const { posts, addComment, deleteComment, updateComment, updatePost } = useContext(BlogContext);
  const { isAuthenticated } = useContext(AuthContext);
  const post = posts.find(post => post.id === postId);
  const [comment, setComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || '');
  const [editedContent, setEditedContent] = useState(post?.content || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(postId, { id: Date.now().toString(), text: comment, date: new Date().toISOString() });
      setComment('');
    }
  };

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    if (editCommentText.trim()) {
      updateComment(postId, editCommentId, editCommentText);
      setEditCommentId(null);
      setEditCommentText('');
    }
  };

  const handleSave = () => {
    updatePost(postId, { title: editedTitle, content: editedContent });
    setEditMode(false);
  };

  const handleDeletePost = () => {
    setShowDeleteModal(false);
    alert('Příspěvek byl úspěšně smazán!');
  };

  if (!post) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Container className="col-8 mt-5">
        <Card className='bg-white text-black shadow'>
          <Card.Body>
            {post.image && 
              <Card.Img 
                variant="top" 
                src={post.image} 
                style={{ width: '100%', height: 'auto' }}
              />
            }
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className='fw-bold'>{post.title}</h3>
              {isAuthenticated && (
                <div>
                  <Button variant="primary" onClick={() => setEditMode(true)}>Upravit příspěvek</Button>
                  <Button variant="danger" className="ms-2" onClick={() => setShowDeleteModal(true)}>Smazat příspěvek</Button>
                </div>
              )}
            </div>
            {editMode ? (
              <>
                <Form.Group controlId="editTitle">
                  <Form.Label>Titulek</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group controlId="editContent" className="mt-3">
                  <Form.Label>Obsah</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    value={editedContent} 
                    onChange={(e) => setEditedContent(e.target.value)} 
                  />
                </Form.Group>
                <Button variant="primary" className="mt-3" onClick={handleSave}>
                  Uložit změny
                </Button>
              </>
            ) : (
              <>
                <p>{post.content}</p>
                <p className='text-muted'>{new Date(post.createdAt).toLocaleString()}</p>
              </>
            )}
            <h5 className='mt-4'>Komentáře</h5>
            <ul>
              {post.comments && post.comments.map((comment) => (
                <li key={comment.id}>
                  <p className='my-3'>{comment.text} - <small>{new Date(comment.date).toLocaleString()}</small></p>
                  {isAuthenticated && (
                    <div>
                      <Button variant="outline-primary" size="sm" onClick={() => { setEditCommentId(comment.id); setEditCommentText(comment.text); }}>Upravit</Button>
                      <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => deleteComment(postId, comment.id)}>Smazat</Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <Form onSubmit={handleCommentSubmit} className="mt-3">
                <Form.Group controlId="comment">
                  <Form.Label>Přidat komentář</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Odeslat
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Smazat příspěvek</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete smazat tento příspěvek?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Zrušit
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            Smazat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogPost;
