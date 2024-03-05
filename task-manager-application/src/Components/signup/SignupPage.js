import React, { useState } from 'react';
import signupValidation from '../signup/SignupValidation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../signup/signup.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const SignupPage = () => {

  const [formData, setFormData] = useState({
    name: '',
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

  const navigate = useNavigate();
  const[errors, setErrors] = useState({})

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(signupValidation(formData));
    if(errors.name === "" && errors.email === "" && errors.password === ""){
      axios.post('http://localhost:8081/signup', {formData})
      .then(res => {
        alert("Your account has been created!")
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className='home'></div>{
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div className="input-box">
              <input type="name"
                placeholder='Username'
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span>{errors.name && <span className='text-danger'>{errors.name} </span>}</span>
              <FaUser className='icon' />
            </div>
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
              <MdEmail className='icon' />
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

            <button className="login_button" type="submit">Signup</button>

            <div className="register-link">
              <p>Already have a account? <a href="http://localhost:3000/login">Login</a></p>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default SignupPage;