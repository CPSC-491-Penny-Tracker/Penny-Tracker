import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext'

export default function user() {
    const context = useContext(UserContext)
    const navigate = useNavigate();
    const login = event => {
        event.preventDefault();
        const { name } = event.target;
        context.processLogin(name.value);
        navigate('/');
    }
    return (
        <form onSubmit={login}>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type='submit' value="submit"/>
        </form>
  )
}
