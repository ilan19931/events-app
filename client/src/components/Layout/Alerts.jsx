import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Alert = styled.div`
  background-color: gray;
  padding: 0.5rem;
`;

const Alerts = () => {
  const { alerts } = useSelector((state) => state.alerts);

  if (alerts?.length === 0) return <></>;

  return (
    <Container>
      {alerts?.map((alert) => (
        <Alert key={alert._id}>{alert.message}</Alert>
      ))}
    </Container>
  );
};

export default Alerts;
