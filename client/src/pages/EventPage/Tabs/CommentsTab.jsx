import React from "react";
import styled from "styled-components";
import Comments from "../../../components/Event/comments/Comments";
import CommentsForm from "../../../components/Event/comments/CommentsForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h2``;

const CommentsTab = () => {
  return (
    <Container>
      <Title>Add New Comment</Title>

      <CommentsForm />

      <Title>Comments</Title>

      <Comments />
    </Container>
  );
};

export default CommentsTab;
