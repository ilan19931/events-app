import React from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: 100%;
`;

const Top = styled.div`
  background-color: lightgray;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Text = styled.span`
  font-weight: bold;
`;

const Body = styled.div`
  padding: 0.4rem;
`;

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <Container>
      <Top>
        <Text>By: {comment.userId.email}</Text>
        <Text>{format(comment.createdAt)}</Text>
      </Top>

      <Body>{comment.body}</Body>
    </Container>
  );
};

export default Comment;
