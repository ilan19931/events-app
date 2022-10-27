import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Statistics from "../components/Home/Statistics";
import Filters from "../components/Home/Filters";
import Events from "../components/Home/Events";
import axios from "axios";
import EventPage from "./EventPage/EventPage";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { clearFiles } from "../redux/slices/global.slice";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem;
`;

const Home = () => {
  const [popUp, setPopUp] = useState(false);

  const { files: globalFiles } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  if (globalFiles.length > 0) {
    const storage = getStorage();

    for (let i = 0; i < globalFiles.length; i++) {
      // Create a reference to the file to delete
      const desertRef = ref(storage, `eventsFiles/${globalFiles[i].name}`);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log(globalFiles[i].name + " has been deleted!");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }

    dispatch(clearFiles());
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Statistics />

          <Filters />

          <Events setPopUp={setPopUp} />
        </Wrapper>
      </Container>

      {popUp && <EventPage setPopUp={setPopUp} />}
    </>
  );
};

export default Home;
