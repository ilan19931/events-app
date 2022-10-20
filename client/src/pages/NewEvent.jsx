import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
const Form = styled.form`
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectArea = styled.div``;

const InnerArea = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input``;

const Text = styled.span`
  font-size: 1.2rem;
`;
//const Container = styled.div``

const NewEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    category: "",
  });
  const [dataObj, setDataObj] = useState({
    location: "",
    category: "",
    severity: "",
    body: "",
  });
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const resLocations = await axios.get("/location");
      const resCategories = await axios.get("/category");
      const resSeverities = await axios.get("/severity");

      setLoadedData({
        locations: resLocations.data,
        categories: resCategories.data,
        severities: resSeverities.data,
      });
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const index = e.nativeEvent.target.selectedIndex;
    setFormData((prev) => ({ ...prev, [e.target.name]: e.nativeEvent.target[index].text }));

    setDataObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/event", dataObj);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Section>
          <Text>Location</Text>
          <SelectArea>
            <Input disabled type="text" className="form-control" value={formData.location} />

            <InnerArea>
              <select className="form-select" size="5" name="location" onChange={handleChange}>
                {loadedData.locations?.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </InnerArea>
          </SelectArea>

          <Text>Category</Text>
          <SelectArea>
            <Input disabled type="text" className="form-control" value={formData.category} />

            <InnerArea>
              <select className="form-select" size="5" name="category" onChange={handleChange}>
                {loadedData.categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </InnerArea>
          </SelectArea>

          <InnerArea>
            <Text>Severity</Text>

            <select onChange={(e) => setDataObj((prev) => ({ ...prev, severity: e.target.value }))}>
              <option value="" defaultChecked>
                Select Severity
              </option>
              {loadedData.severities?.map((sev) => (
                <option key={sev._id} value={sev._id}>
                  {sev.name}
                </option>
              ))}
            </select>
          </InnerArea>
        </Section>

        <Section>
          <Text>Event Description</Text>
          <textarea
            className="form-control"
            rows="10"
            onChange={(e) => setDataObj((prev) => ({ ...prev, body: e.target.value }))}
          ></textarea>

          <span>No files attached</span>
          <input type="file" className="btn btn-success" />

          <button className="btn btn-primary">Save Event</button>
        </Section>
      </Form>
    </Container>
  );
};

export default NewEvent;
