import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard, fetchLists } from "../actions";
import { Link } from "react-router-dom";
import { Icon } from "antd";
const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// TODO: Fix performance issue

class TrelloBoard extends PureComponent {
  componentDidMount() {
    // set active trello board here
    const { token, match:{params} } = this.props
    const { boardID } = params;

    this.props.dispatch(setActiveBoard(boardID));
    this.props.dispatch(fetchLists(token, boardID));
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    const { match, boards } = prevProps;
    const { boardID } = match.params;
    const board = boards[boardID];
    console.log("board", board, "prevState: ", prevState)
    if (!board) {
      return;
    }
    if(board.lists.length)
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Ramiro I: ", prevProps.boards, this.props.boards, "prevState: ", prevState)
    if (snapshot !== null) {
      console.log("Corso")
    }
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards, token } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }

    const listOrder = board.lists;
    console.log("CACA: ", listOrder)

    return (
      <div style={{height: "inherit", overflowX: "scroll", scrollMargin:"true"}}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Link to="/project-management/"><Icon type="arrow-left"/>Go Back</Link>
        <h2>{board.title}</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                // console.log("CACA: ", listID, "lists", lists, "list", list)
                if (list) {
                  const listCards = list.cards.map(cardID => cards[cardID]);

                  return (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                      token={token}
                    />
                  );
                }
              })}
              {provided.placeholder}
              <TrelloCreate list token={token} boardID={boardID} order={listOrder} />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
  token: state.auth.token,
});

export default connect(mapStateToProps)(TrelloBoard);
