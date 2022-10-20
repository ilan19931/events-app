import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import {
  loadEvents,
  loadFilteredEvents,
  resetFilteredEvents,
} from "../../redux/slices/event.slice.js";

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

const SeverityContainer = styled.div`
  width: 100%;
`;

const SeverityColor = styled.div`
  height: 40px;
  width: 40px;
`;

const Filters = () => {
  const { events, filteredEvents } = useSelector((state) => state.event);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    severities: [],
    //statuses: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const resSeverities = await axios.get("/severity");

      setData({
        severities: resSeverities.data,
      });
    };

    fetchData();
  }, []);

  //filter useeffect
  useEffect(() => {
    const allFilterFuncs = [];

    filters.map((filter) => {
      if (filter.name === "severity") {
        allFilterFuncs.push(function test(data) {
          console.log(data);
          return data.filter((d) => d.severity === filter.value);
        });
      } else if (filter.name === "category") {
        allFilterFuncs.push(function test2(data) {
          return data.filter((d) => d.category === filter.value);
        });
      }
    });

    const allFunc = _.overEvery(allFilterFuncs);

    loadFilteredEvents(events.filter(allFunc));
  }, [events, filters]);

  const filterExists = (name) => {
    return filters.find((f) => f.name === name) !== undefined;
  };

  const addFilter = (filter) => {
    setFilters((prev) => [...prev, filter]);
  };

  const removeFilter = (name) => {
    setFilters((prev) => prev.filter((f) => f.name === name));
  };

  const toggleFilter = (filter) => {
    if (filterExists(filter.name)) {
      removeFilter(filter.name);
    } else {
      addFilter(filter);
    }
  };

  const handleSeverityChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "":
        removeFilter("severity");

        dispatch(resetFilteredEvents());
        break;

      default:
        addFilter({ name: "severity", value });

        //dispatch(loadFilteredEvents(filtered));
        break;
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;

    switch (value) {
      case "open":
        const filteredOpenEvents = events.filter((event) => event.isOpen === true);

        dispatch(loadFilteredEvents(filteredOpenEvents));
        break;

      case "close":
        const filteredClosedEvents = events.filter((event) => event.isOpen === false);

        dispatch(loadFilteredEvents(filteredClosedEvents));
        break;

      default:
        dispatch(resetFilteredEvents());
        break;
    }
  };

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
            <select onChange={handleSeverityChange} id="severity" className="form-control">
              <option defaultChecked value="">
                All
              </option>
              {data.severities?.map((severity) => (
                <option key={severity._id} style={{ backgroundColor: severity.color }}>
                  {severity.name}
                </option>
              ))}
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="status">Status:</label>
            <select onChange={handleStatusChange} id="status" className="form-control">
              <option defaultChecked value="open">
                Open
              </option>
              <option value="closed">Closed</option>
              <option value="all">All</option>
            </select>
          </FormItem>

          <FormItem className="form-group">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" className="form-control" placeholder="Search" />
          </FormItem>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Filters;
