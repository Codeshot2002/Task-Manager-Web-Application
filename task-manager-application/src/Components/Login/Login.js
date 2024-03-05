import React, { useState } from 'react';
import validation from './LoginValidation';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './login.css';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="register-link">
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}
const RegisterPage = () => {
  return <h1>Register Page</h1>; 
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(validation(formData));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', { formData })
        .then(res => {
          //Login successfully
          if (res.data.Login) {
            localStorage.setItem("token", res.data.token);
            navigate('/application');
          } else {
            alert("No record found!")
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <>
        <div className='home'></div>{
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className="input-box">
                <input type="email"
                  placeholder='Email'
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span>{errors.email && <span className='text-danger'>{errors.email} </span>}</span>
                <MdEmail className='icon'/>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required />
                <span>{errors.password && <span className='text-danger'>{errors.password} </span>}</span>
                <FaLock className='icon' />
              </div>

              <button className="login_button" type="submit">Login</button>

              <div className="register-link">
                <p>Don't have an account? <a href="http://localhost:3000/signup">Register</a></p>
              </div>
            </form>
          </div>
        }
      </>
    </>
  );
};

export default Login;