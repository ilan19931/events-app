import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Container = styled.div`
  background-color: #7b7d7d;
  height: 50px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;

  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-weight: bold;
`;

const Item = styled.div`
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: all 300ms ease;

  &:hover {
    background-color: #979a9a;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const OfflineButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button``;

const Navbar = () => {
  const auth = useSelector((state) => state.auth);

  const offlineNav = (
    <>
      <OfflineButtons>
        <Button className="btn btn-primary">Sign In</Button>
        <Button className="btn btn-success">Sign Up</Button>
      </OfflineButtons>
    </>
  );

  const loggedNav = (
    <>
      <Link to="/newEvent">
        <Item>New Event</Item>
      </Link>

      <Link to="/">
        <Item>Home</Item>
      </Link>

      <Item>Reports</Item>
      <Item>Statistics</Item>
    </>
  );

  return (
    <Container>
      <Wrapper>
        <InnerContainer>
          <Logo>
            <EventAvailableIcon />

            {auth.user && <p>Welcome, {auth.user.email}</p>}
          </Logo>
        </InnerContainer>

        <InnerContainer>{auth.user ? loggedNav : offlineNav}</InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
