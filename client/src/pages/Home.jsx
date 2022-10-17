import React from "react";
import styled from "styled-components";

import Statistics from "../components/Home/Statistics";
import Filters from "../components/Home/Filters";
import Events from "../components/Home/Events";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Statistics />

        <Filters />

        <Events />
      </Wrapper>
    </Container>
  );
};

export default Home;
