import React, { useContext, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { BlogContext } from '../BlogContext';

const CreatePostModal = ({ show, onHide }) => {
  const { addPost } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
        comments: [],
      };
      addPost(newPost);
      onHide(); 
      setTitle('');
      setContent('');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Vytvořit nový příspěvek</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Titulek</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Obsah</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Button className='my-3' variant="primary" type="submit">
            Vytvořit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostModal;
