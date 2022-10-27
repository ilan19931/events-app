import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addFile, clearFiles } from "../redux/slices/global.slice";
import createAlert from "../helpers/createAlert";

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

const Files = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const NewEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    location: "",
    category: "",
  });
  const [dataObj, setDataObj] = useState({
    location: "",
    category: "",
    severity: "",
    body: "",
    files: [],
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.nativeEvent.target[index].text,
    }));

    setDataObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const storage = getStorage();

    const file = e.target.files[0];
    const newName = new Date().getTime() + file.name;

    const storageRef = ref(storage, `/eventsFiles/${newName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //console.log(snapshot);
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setUploadProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploadProgress(0);
          const fileObj = { name: newName, url: downloadURL };

          dispatch(addFile(fileObj));

          setUploadedFiles((prev) => [...prev, fileObj]);
        });
      }
    );
  };

  //handle submit of form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setDataObj((prev) => ({ ...prev, files: uploadedFiles }));

      await axios.post("/event", { ...dataObj, files: uploadedFiles });

      dispatch(clearFiles());

      navigate("/");
    } catch (err) {
      const errors = err.response.data.message.errors;

      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i]);
        createAlert(errors[i].msg, dispatch);
      }
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Section>
          <Text>Location</Text>
          <SelectArea>
            <Input
              disabled
              type="text"
              className="form-control"
              value={formData.location}
            />

            <InnerArea>
              <select
                className="form-select"
                size="5"
                name="location"
                onChange={handleChange}
              >
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
            <Input
              disabled
              type="text"
              className="form-control"
              value={formData.category}
            />

            <InnerArea>
              <select
                className="form-select"
                size="5"
                name="category"
                onChange={handleChange}
              >
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

            <select
              onChange={(e) =>
                setDataObj((prev) => ({ ...prev, severity: e.target.value }))
              }
            >
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
            onChange={(e) =>
              setDataObj((prev) => ({ ...prev, body: e.target.value }))
            }
          ></textarea>

          <Files>
            {uploadedFiles.length > 0 &&
              uploadedFiles.map((uf, i) => (
                <a
                  key={i}
                  style={{ color: "blue", textDecoration: "underline" }}
                  href={uf.url}
                  target="_blank"
                >
                  {uf.name}
                </a>
              ))}

            {uploadProgress > 0 && uploadProgress + " %"}
          </Files>
          <input
            type="file"
            className="btn btn-success"
            onChange={handleFileUpload}
          />

          <button className="btn btn-primary">Save Event</button>
        </Section>
      </Form>
    </Container>
  );
};

export default NewEvent;
