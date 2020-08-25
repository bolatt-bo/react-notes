import React, { useState, useRef } from "react";
import Item from "../Item/Item";
import "./note.scss";
import Axios from "axios";

const Note = (props) => {
  console.log(props);
  const { id, title, items } = props;
  const focusInput = useRef();
  const [newTitle, setNewTitle] = useState(title);

  const editNote = () => {
    focusInput.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Axios.patch(`http://localhost:3000/notes/${id}`, {
        title: newTitle,
      }).then((res) => console.log(res));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      focusInput.current.blur();
    }
  };

  const renderItems = (items) => {
    return items.map((item) => {
      return <Item data={item} />;
    });
  };
  return (
    <div class="ui card note">
      <div class="content">
        <div class="header note-header">
          {/* <span class="left floated title">{title}</span> */}
          <input
            // onBlur={() => focusInput.current.blur()}
            onKeyDown={(e) => handleKeyDown(e)}
            onKeyPress={(e) => handleKeyPress(e)}
            ref={focusInput}
            class="left floated title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            contentEditable="true"
            style={{
              border: "none",
              width: "85%",
              fontFamily: "Montserrat",
              wordWrap: "break-word",
            }}
          />
          <span onClick={editNote} class="right floated edit">
            <i class="edit icon"></i>
          </span>
        </div>
        <div class="description">
          <div class="ui list">{renderItems(items)}</div>
        </div>
      </div>
      <div class="extra content">
        <span class="left floated plus add-item">
          <i class="plus icon"></i>
          Add Item
        </span>
        <span class="right floated delete note-delete">
          <i class="trash alternate outline icon"></i>
          Delete Note
        </span>
      </div>
    </div>
  );
};

export default Note;
