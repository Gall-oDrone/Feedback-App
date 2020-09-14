import React from "react";
import styled from "styled-components";
import getRandomColor from "./RandomColor"; 

const Thumbnail = styled.div`
  height: 180px;
  width: 180px;
  background-color: rgba(0,0,0,.3);
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 4px grey;
  transition: .2s;
  &:hover, :focus {
   transform: translateY(-0.8rem);
  }
`;

const Title = styled.h4`
  color: black;
  text-decoration: none;
`;

const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <Thumbnail style={{backgroundColor: getRandomColor() }} >
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
