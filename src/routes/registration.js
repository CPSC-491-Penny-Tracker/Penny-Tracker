import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ApiService from '../service/ApiService';
import './users.css';

export default function registration() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const register = event => {
        event.preventDefault();
        const { password, username } = event.target;
        
        ApiService.postLogin({
            username: username.value,
            password: password.value
          })
            .then(res => {
                context.processLogin(res.authToken);
                navigate('/dashboard');
            })
            .catch(error => {
              setError( error.message );
            });
    }
  return (
    <Form className='login' onSubmit={register}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name='username' required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' required/>
        </Form.Group>
        <div role="alert" className="text-danger">{error && <p>{error}</p>}</div>
        <Button className="me-3" variant="primary" type="submit">
            Register
        </Button>
    </Form>
  )
}
