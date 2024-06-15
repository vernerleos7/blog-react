import React, { createContext, useState } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'První příspěvek',
      content: 'Toto je obsah prvního příspěvku.',
      createdAt: new Date().toISOString(),
      comments: [
        { id: '1', text: 'První komentář', date: new Date().toISOString() },
        { id: '2', text: 'Druhý komentář', date: new Date().toISOString() },
      ],
    },
  ]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
          : post
      )
    );
  };

  const updateComment = (postId, commentId, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId ? { ...comment, text } : comment
              ),
            }
          : post
      )
    );
  };

  const updatePost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
    );
  };

  return (
    <BlogContext.Provider
      value={{ posts, addPost, deletePost, addComment, deleteComment, updateComment, updatePost }}
    >
      {children}
    </BlogContext.Provider>
  );
};
