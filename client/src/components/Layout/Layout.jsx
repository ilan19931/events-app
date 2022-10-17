import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Main = styled.div``;

const Layout = (props) => {
  return (
    <Container>
      <Navbar />

      <Main>{props.children}</Main>

      <Footer />
    </Container>
  );
};

export default Layout;
