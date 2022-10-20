import React from "react";
import styled from "styled-components";

import SpinnerGif from "../../images/Spinner.gif";

const Image = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
`;

const Spinner = () => {
  return (
    <div>
      <Image src={SpinnerGif} alt="Loading" />
    </div>
  );
};

export default Spinner;
