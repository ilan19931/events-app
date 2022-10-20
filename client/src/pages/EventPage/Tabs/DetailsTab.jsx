import React from "react";
import styled from "styled-components";
import formatDate from "dateformat";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:first-child {
    border-right: 1px black solid;
  }
`;

const Title = styled.h3``;

const TextSection = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const StrongText = styled.span`
  flex: 1;
  font-weight: bold;
`;

const Text = styled.span`
  flex: 3;
`;

const Severity = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const SeverityColor = styled.div`
  height: 20px;
  width: 20px;
`;

const DetailsTab = () => {
  const { event } = useSelector((state) => state.event);

  return (
    <Container>
      <Section>
        <Title>Details</Title>

        <TextSection>
          <StrongText>Start Date:</StrongText>
          <Text>{formatDate(event?.createdAt)}</Text>
        </TextSection>

        <TextSection>
          <StrongText>Number:</StrongText>
          <Text>1,322</Text>
        </TextSection>

        <TextSection>
          <StrongText>Status:</StrongText>
          <Text>{event?.isOpen ? "Open" : "Closed"}</Text>
        </TextSection>

        <TextSection>
          <StrongText>Severity:</StrongText>
          <Text>
            <Severity>
              <SeverityColor style={{ backgroundColor: event?.severity.color }} />

              <span>{event?.severity.name}</span>
            </Severity>
          </Text>
        </TextSection>

        <TextSection>
          <StrongText>Category:</StrongText>
          <Text>{event?.category.name}</Text>
        </TextSection>

        <TextSection>
          <StrongText>Location:</StrongText>
          <Text>{event?.location.name}</Text>
        </TextSection>

        <TextSection>
          <StrongText>Reported By:</StrongText>
          <Text>{event?.user.email}</Text>
        </TextSection>
      </Section>

      <Section>
        <Title>Description</Title>

        <TextSection>
          <Text>{event?.body}</Text>
        </TextSection>
      </Section>
    </Container>
  );
};

export default DetailsTab;
