import React, { useState } from "react";
import { Card, Icon, Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const TrelloCard = React.memo(({ text, id, listID, index, dispatch, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setText] = useState(text);

  const closeForm = e => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  const saveCard = e => {
    e.preventDefault();
    dispatch(editCard(id, listID, cardText, token));
    setIsEditing(false);
  };

  const handleDeleteCard = e => {
    dispatch(deleteCard(id, listID, token));
  };

  const renderEditForm = () => {
    return (
      <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
        <TrelloButton onClick={saveCard}>Save</TrelloButton>
      </TrelloForm>
    );
  };

  const renderCard = () => {
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <CardContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <Card>
              <EditButton
                type="edit"
                onMouseDown={() => setIsEditing(true)}
                fontSize="small"
              >
              </EditButton>
              <DeleteButton type="delete" fontSize="small" onMouseDown={handleDeleteCard} />
                <Typography>{text}</Typography>
            </Card>
          </CardContainer>
        )}
      </Draggable>
    );
  };

  return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
