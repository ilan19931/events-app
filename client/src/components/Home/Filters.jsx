import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px var(--light-border) solid;
  border-radius: 8px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
const Wrapper = styled.div`
  padding: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  font-weight: 500;
`;

const FormItem = styled.div`
  flex: 1;
`;

const Filters = () => {
  return (
    <Container>
      <Wrapper>
        <Form>
          <FormItem className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input type="date" id="fromDate" className="form-control" />
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input type="date" id="toDate" className="form-control" />
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="severity">severity:</label>
            <select id="severity" className="form-control">
              <option>High</option>
              <option>Mid</option>
              <option>Low</option>
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" className="form-control">
              <option>Open</option>
              <option>Closed</option>
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search"
            />
          </FormItem>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Filters;
