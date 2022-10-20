import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgStrong};
  padding: 0.5rem;
`;

const Footer = () => {
  return <Container>Footer</Container>;
};

export default Footer;
