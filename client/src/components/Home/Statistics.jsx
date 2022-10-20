import axios from "axios";
import React, { useEffect, useState } from "react";
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
  background-color: ${({ theme }) => theme.bgLighter};

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 300ms ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`;

const Statistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getStats = async () => {
      const res = await axios.get("/event/get/statistics");

      setStats(res.data);
    };

    getStats();
  }, []);

  return (
    <Container>
      <Item>
        <h4>All</h4>

        <span>{stats?.all}</span>
      </Item>
      <Item>
        <h4>Open</h4>
        <span>{stats?.open}</span>
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
