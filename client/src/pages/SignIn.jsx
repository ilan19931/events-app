import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { signInFail, signInStart, signInSuccess } from "../redux/slices/auth.slice.js";

const Container = styled.div`
  display: flex;
  height: 80vh;

  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.bgCard};
  border-radius: 8px;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const creds = { email: formData.email, password: formData.password };
      const res = await axios.post("/auth/signin", creds);

      dispatch(signInSuccess(res.data));
    } catch (err) {
      console.log(err.response.data.message);
      dispatch(signInFail(err.response.data.message));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Sign In</Title>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary">Sign In</button>
          <Link to="/signup" style={{ textAlign: "center" }}>
            <button className="btn btn-success">Sign Up</button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
