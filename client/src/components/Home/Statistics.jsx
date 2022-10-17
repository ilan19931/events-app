import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.6rem;
  border-radius: 8px;
  text-align: center;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 300ms ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`;

const Statistics = () => {
  return (
    <Container>
      <Item>
        <h4>All</h4>

        <span>600</span>
      </Item>
      <Item>
        <h4>Open</h4>
        <span>300</span>
      </Item>
      <Item>
        <h4>All</h4>
        <span>600</span>
      </Item>
      <Item>
        <h4>All</h4>
        <span>600</span>
      </Item>
    </Container>
  );
};

export default Statistics;
