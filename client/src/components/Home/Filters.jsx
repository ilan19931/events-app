import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { loadFilteredEvents } from "../../redux/slices/event.slice.js";

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
  const { events } = useSelector((state) => state.event);
  const [filters, setFilters] = useState({
    fromDate: {
      isActive: false,
      date: "",
    },
    toDate: {
      isActive: false,
      date: "",
    },

    severity: {
      isActive: false,
      name: "",
    },
    status: {
      isActive: false,
      isOpen: true,
    },
    search: {
      isActive: false,
      query: "",
    },
  });

  const dispatch = useDispatch();

  const [data, setData] = useState({
    severities: [],
    //statuses: [],
  });

  // load data
  useEffect(() => {
    const fetchData = async () => {
      const resSeverities = await axios.get("/severity");

      setData({
        severities: resSeverities.data,
      });
    };

    fetchData();
  }, []);

  //
  //filters useeffect
  useEffect(() => {
    let filteredEvents = events;

    // severity filter
    if (filters.severity.isActive === true) {
      filteredEvents = filteredEvents.filter(
        (e) => e.severity.name === filters.severity.name
      );
    }

    // status filter
    if (filters.status.isActive === true) {
      filteredEvents = filteredEvents.filter(
        (e) => e.isOpen === filters.status.isOpen
      );
    }

    // from date filter
    if (filters.fromDate.isActive === true) {
      filteredEvents = filteredEvents.filter(
        (e) => Date.parse(e.createdAt) >= filters.fromDate.date
      );
    }

    // to date filter
    if (filters.toDate.isActive === true) {
      const toDate = new Date(filters.toDate.date).setHours(23, 59, 59, 999); // update filter date to the end of the day, 23: 59:59

      filteredEvents = filteredEvents.filter(
        (e) => toDate >= Date.parse(e.createdAt)
      );
    }

    // search by text filter
    if (filters.search.isActive === true) {
      filteredEvents = filteredEvents.filter((e) =>
        e.body.includes(filters.search.query)
      );
    }

    dispatch(loadFilteredEvents(filteredEvents));
  }, [filters]);

  const handleSeverityChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "":
        setFilters((prev) => ({
          ...prev,
          severity: {
            isActive: false,
            name: "",
          },
        }));
        break;

      default:
        setFilters((prev) => ({
          ...prev,
          severity: {
            isActive: true,
            name: value,
          },
        }));
        break;
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "open":
        setFilters((prev) => ({
          ...prev,
          status: {
            isActive: true,
            isOpen: true,
          },
        }));
        break;

      case "closed":
        setFilters((prev) => ({
          ...prev,
          status: {
            isActive: true,
            isOpen: false,
          },
        }));
        break;

      default:
        setFilters((prev) => ({
          ...prev,
          status: {
            isActive: false,
            isOpen: true,
          },
        }));
        break;
    }
  };

  const handleDateChange = (e) => {
    const value = Date.parse(e.target.value) || "";
    const name = e.target.name;

    if (name === "fromDate") {
      setFilters((prev) => ({
        ...prev,
        fromDate: {
          isActive: value ? true : false,
          date: value,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        toDate: {
          isActive: value ? true : false,
          date: value,
        },
      }));
    }
  };

  // handle search event by text
  const handleSearch = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      search: {
        isActive: value ? true : false,
        query: value,
      },
    }));
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <FormItem className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              className="form-control"
              onChange={handleDateChange}
            />
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              className="form-control"
              onChange={handleDateChange}
            />
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="severity">severity:</label>
            <select
              onChange={handleSeverityChange}
              id="severity"
              className="form-control"
            >
              <option defaultChecked value="">
                All
              </option>
              {data.severities?.map((severity) => (
                <option
                  key={severity._id}
                  style={{ backgroundColor: severity.color }}
                >
                  {severity.name}
                </option>
              ))}
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              onChange={handleStatusChange}
              id="status"
              className="form-control"
            >
              <option defaultChecked value="open">
                Open
              </option>
              <option value="closed">Closed</option>
              <option value="all">All</option>
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search"
              onChange={handleSearch}
            />
          </FormItem>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Filters;
