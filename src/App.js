import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import { Container, Button } from 'react-bootstrap';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import CreatePostModal from './components/CreatePostModal';
import Header from './components/Header';
import Login from './components/Login';
import { BlogProvider } from './BlogContext';
import { AuthProvider, AuthContext } from './AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/post/:postId" element={<ProtectedRoute><BlogPost /></ProtectedRoute>} />
          </Routes>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

const Home = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Header />
      <Container className='text-center col-9 my-5 p-4 vh-70 bg-white rounded'>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className='fw-bold text-center'>Nejnovější příspěvky</h2>
          {isAuthenticated && (
            <Button variant="primary" onClick={() => setModalShow(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" style={{ fill: 'rgba(255, 255, 255, 1)', transform: 'none', msFilter: 'none' }}>
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg> Přidat příspěvek
            </Button>
          )}
        </div>
        <CreatePostModal show={modalShow} onHide={() => setModalShow(false)} />
        <BlogList />
      </Container>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
