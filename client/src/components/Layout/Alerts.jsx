import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
        <Alert key={alert._id}>{alert.msg}</Alert>
      ))}
    </Container>
  );
};

export default Alerts;
