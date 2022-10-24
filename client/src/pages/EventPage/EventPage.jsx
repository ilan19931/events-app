import React from "react";
import styled from "styled-components";
import TabsComponent from "./TabsComponent";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  //border: 1px black solid;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1``;
const SmallTitle = styled.h3`
  text-align: center;
`;

const TopSide = styled.div`
  display: flex;
  gap: 2rem;
`;

const Id = styled.span`
  font-size: 1.3rem;
`;

const Close = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Hr = styled.hr``;

const InnerContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const InnerLeft = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InnerRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.button``;

const EventPage = ({ setPopUp }) => {
  return (
    <Container>
      <Wrapper>
        <Top>
          <Title>Event Details</Title>

          <TopSide>
            <Id>123</Id>
            <Close onClick={() => setPopUp(false)}>X</Close>
          </TopSide>
        </Top>

        <Hr />

        <InnerContainer>
          <InnerLeft>
            <TabsComponent />
          </InnerLeft>

          <InnerRight>
            <SmallTitle>Actions</SmallTitle>

            <Button className="btn btn-primary">Close Event</Button>
            <Button className="btn btn-primary">Close Event</Button>
            <Button className="btn btn-primary">Close Event</Button>
            <Button className="btn btn-primary">Close Event</Button>
          </InnerRight>
        </InnerContainer>
      </Wrapper>
    </Container>
  );
};

export default EventPage;
