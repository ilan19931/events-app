import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Main = styled.div``;

const Layout = (props) => {
  const { setLightTheme } = props;
  return (
    <Container>
      <Navbar setLightTheme={setLightTheme} />

      <Main>{props.children}</Main>

      <Footer />
    </Container>
  );
};

export default Layout;
