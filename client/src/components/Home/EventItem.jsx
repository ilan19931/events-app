import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";

import { loadComments, loadEvent } from "../../redux/slices/event.slice";

import Spinner from "../Layout/Spinner";

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
  font-weight: bold;

  background-color: ${({ theme }) => theme.bgCard};
  border-radius: 3px;

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
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GridCol = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  padding: 1rem;
`;

const EventItem = ({ event, index, setStats, setPopUp }) => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(event.isOpen);
  }, [event.isOpen]);

  const handleStatus = async () => {
    try {
      const res = await axios.put(`/event/${event._id}`, { isOpen: !isOpen });

      setIsOpen(!isOpen);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    setPopUp(true);

    try {
      const res = await axios.get(`/comment/all/${event._id}`);
      dispatch(loadComments(res.data));
    } catch (err) {
      console.log(err);
    }

    dispatch(loadEvent(event));
  };

  return (
    <>
      <GridRowContainer>
        <Wrapper>
          <GridRow onClick={handleClick}>
            <GridCol style={{ backgroundColor: event.severity.color, borderRadius: "3px" }}>
              <strong>{index + 1}</strong>
            </GridCol>
            <GridCol>{dateFormat(event.createdAt, "dd-mm-yyyy ")}</GridCol>
            <GridCol>{dateFormat(event.createdAt, "H:MM")}</GridCol>
            <GridCol>{event.category.name}</GridCol>
            <GridCol style={{ textAlign: "start" }}>{event.body}</GridCol>
          </GridRow>

          <GridActions>
            {isOpen ? (
              <Action onClick={handleStatus} className="btn btn-danger btn-sm">
                Close
              </Action>
            ) : (
              <Action onClick={handleStatus} className="btn btn-primary btn-sm">
                Open
              </Action>
            )}
            <Action className="btn btn-success btn-sm">Start Treatment</Action>
          </GridActions>
        </Wrapper>
      </GridRowContainer>
      <hr />
    </>
  );
};

export default EventItem;
