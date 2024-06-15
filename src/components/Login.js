import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'test@test.cz' && password === 'password') {
      login();
      navigate('/');
    } else {
      alert('Nesprávné údaje');
    }
  };

  return (
    <>
      <Header />
      <Container className="col-4 mt-5">
        <h2 className="text-center fw-bold text-white">Přihlášení</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label className='text-white'>Email (test@test.cz)</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label className='text-white'>Heslo (password)</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 col-12">Přihlásit se</Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
