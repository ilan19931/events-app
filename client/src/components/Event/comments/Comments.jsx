import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;

  max-height: 600px;
  overflow: auto;
`;

const NoComments = styled.h4`
  text-align: center;
  overflow: hidden;
`;

const Comments = () => {
  const { comments } = useSelector((state) => state.event);

  return (
    <Container>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}

      {comments.length === 0 && <NoComments>There are no comments</NoComments>}
    </Container>
  );
};

export default Comments;
