import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const StyledButton = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
`;

const TrelloButton = ({ children, onClick }) => {
  return (
    <StyledButton type="edit" variant="contained" onMouseDown={onClick}>
      {children}
    </StyledButton>
  );
};

export default TrelloButton;
