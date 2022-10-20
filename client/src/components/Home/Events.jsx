import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import EventItem from "./EventItem";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents } from "../../redux/slices/event.slice";

const Container = styled.div`
  border: 1px solid var(--light-border);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bg};
  //box-shadow: ${({ theme }) => theme.boxShadow};

  max-height: 60vh;
  overflow: auto;
`;
const Wrapper = styled.div`
  padding: 0.6rem;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 6fr;
  text-align: center;
  border-radius: 6px;
  transition: all 300ms ease;
`;

const GridTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Events = ({ setStats, setPopUp }) => {
  const dispatch = useDispatch();
  const { events, filteredEvents } = useSelector((state) => state.event);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get("/event");

        dispatch(loadEvents(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    getEvents();
  }, [dispatch]);

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

        {filteredEvents &&
          filteredEvents.map((event, index) => (
            <EventItem
              key={event._id}
              event={event}
              index={index}
              setStats={setStats}
              setPopUp={setPopUp}
            />
          ))}
      </Wrapper>
    </Container>
  );
};

export default Events;
