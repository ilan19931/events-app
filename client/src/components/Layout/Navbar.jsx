import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { signOut } from "../../redux/slices/auth.slice";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 60px;
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
  color: ${({ theme }) => theme.text};
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

const Navbar = ({ setLightTheme }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
  };

  const offlineNav = (
    <>
      <OfflineButtons>
        <Link to="/signin">
          <Button className="btn btn-primary">Sign In</Button>
        </Link>

        <Link to="/signup">
          <Button className="btn btn-success">Sign Up</Button>
        </Link>
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

      <Button onClick={handleSignOut} className="btn btn-danger">
        Sign Out
      </Button>
    </>
  );

  return (
    <Container>
      <Wrapper>
        <InnerContainer>
          <Logo>
            <Link to="/">
              <EventAvailableIcon style={{ fontSize: "2.5rem" }} />
            </Link>

            {auth.user && <p>Welcome, {auth.user.email}</p>}
          </Logo>
        </InnerContainer>

        <InnerContainer>
          {auth.user ? loggedNav : offlineNav}
          <Item onClick={() => setLightTheme((prev) => !prev)}>Change Theme</Item>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
