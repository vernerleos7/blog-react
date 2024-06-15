import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BlogContext } from '../BlogContext';

const BlogList = () => {
  const { posts, deletePost } = useContext(BlogContext);

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  return (
    <>
      {posts.map((post) => (
        <Card className="my-3" key={post.id}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {new Date(post.createdAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
            <Link to={`/post/${post.id}`}>
              <Button variant="primary">Zobrazit více</Button>
            </Link>
            <Button variant="danger" className="ms-2" onClick={() => handleDelete(post.id)}>
              Smazat
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default BlogList;
