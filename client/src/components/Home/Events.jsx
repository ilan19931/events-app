import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  border: 1px solid var(--light-border);
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
const Wrapper = styled.div`
  padding: 0.6rem;
`;

const GridActions = styled.div`
  gap: 1rem;
  display: none;
`;

const Action = styled.button`
  padding: 0.5rem;
`;

const GridRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    ${GridActions} {
      display: flex;
    }
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 6fr;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
`;

const GridTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const GridCol = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  padding: 1rem;
`;

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get("/event");

        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getEvents();
  }, []);

  return (
    <Container>
      <Wrapper>
        <GridRow>
          <GridTitle>#</GridTitle>
          <GridTitle>Date</GridTitle>
          <GridTitle>Time</GridTitle>
          <GridTitle>Category</GridTitle>
          <GridTitle>Description</GridTitle>
        </GridRow>

        {events.map((event, index) => (
          <div key={event._id}>
            <GridRowContainer>
              <GridRow>
                <GridCol style={{ backgroundColor: "green" }}>
                  <strong>{index + 1}</strong>
                </GridCol>
                <GridCol>10/12/2022</GridCol>
                <GridCol>10:45 AM</GridCol>
                <GridCol>To Fix</GridCol>
                <GridCol style={{ textAlign: "start" }}>{event.body}</GridCol>
              </GridRow>

              <GridActions>
                <Action className="btn btn-primary btn-sm">Close</Action>
                <Action className="btn btn-success btn-sm">
                  Start Treatment
                </Action>
              </GridActions>
            </GridRowContainer>

            <hr />
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Events;
