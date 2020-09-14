import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard, fetchBoardList } from "../actions";
import BoardThumbnail from "./BoardThumbnail";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 28px;
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const Home = ({ boards, boardOrder, boardList, username, token, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.
  const [newBoardTitle, setNewBoardTitle] = useState("");
  // console.log("patas: ", boards, "boardOrder: ", boardOrder)

  useEffect(() => {
    if(username !== null && token !== null && boardList === null){
      dispatch(fetchBoardList(username, token))
    }
  })

  const handleChange = e => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle, token));
    setNewBoardTitle("");
  };

  const renderBoards = () => {
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        board && board.id && (
        <Link
          key={boardID}
          to={`/project-management/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
        )
      );
      // return (
      //   boardList && boardList.userBoards.map(board  => {
      //     return(
      //       <Link
      //         key={boardID}
      //         to={`/project-management/${board.id}`}
      //         style={{ textDecoration: "none" }}
      //       >
      //         <BoardThumbnail {...board} />
      //       </Link>
      //     )
      //   })
      // );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your board title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <HomeContainer>
      {renderCreateBoard()}
      <Thumbnails>{renderBoards()}</Thumbnails>
    </HomeContainer>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder,
  boardList: state.boardList,
  token: state.auth.token,
  username: state.auth.username,
});

export default connect(mapStateToProps)(Home);
