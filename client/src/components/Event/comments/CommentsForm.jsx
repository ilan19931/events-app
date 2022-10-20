import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { addComment } from "../../../redux/slices/event.slice";
import createAlert from "../../../helpers/createAlert";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TextArea = styled.textarea``;
const Button = styled.button``;

const CommentsForm = () => {
  const { event } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (body.length > -1) {
      try {
        const res = await axios.post("/comment", { body, eventId: event._id });

        dispatch(addComment(res.data));

        setBody("");
      } catch (err) {
        console.log(err);

        createAlert({ message: "sdf" }, dispatch);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        <TextArea
          className="form-control"
          rows="3"
          placeholder="Comment Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></TextArea>
      </div>

      <Button className="btn btn-primary">Add Comment</Button>
    </Form>
  );
};

export default CommentsForm;
