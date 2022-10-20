import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInFail, signInSuccess } from "../redux/slices/auth.slice";

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

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
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
      const creds = { email: formData.email, password: formData.password };
      const res = await axios.post("/auth/signup", creds);

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
          <Title>Sign Up</Title>
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

          <div className="form-group">
            <label htmlFor="rePassword">Confirm Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              placeholder="Confirm Password"
              className="form-control"
              value={formData.rePassword}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary">Sign Up</button>
          <Link to="/signin" style={{ textAlign: "center" }}>
            <button className="btn btn-success">Sign In</button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
