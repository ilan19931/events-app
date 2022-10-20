import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const File = styled.a`
  color: blue;
  text-decoration: underline;
`;

const FilesTab = () => {
  const { files } = useSelector((state) => state.event.event);

  console.log(files);

  return (
    <Container>
      {files.length > 0
        ? files.map((file) => (
            <File
              href={file.url}
              style={{ color: "blue", textDecoration: "underline" }}
              target="_blank"
            >
              {file.name}
            </File>
          ))
        : "There are no files."}
    </Container>
  );
};

export default FilesTab;
