import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Statistics from "../components/Home/Statistics";
import Filters from "../components/Home/Filters";
import Events from "../components/Home/Events";
import axios from "axios";
import EventPage from "./EventPage/EventPage";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

const Home = () => {
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      <Container>
        <Wrapper>
          <Statistics />

          <Filters />

          <Events setPopUp={setPopUp} />
        </Wrapper>
      </Container>

      {popUp && <EventPage setPopUp={setPopUp} />}
    </>
  );
};

export default Home;
