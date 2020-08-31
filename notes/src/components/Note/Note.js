import React, { useState, useRef, useEffect } from "react";
import Item from "../Item/Item";
import "./note.scss";
import Axios from "axios";

const Note = (props) => {
  console.log(props);
  const { id, title, items } = props;
  const focusInput = useRef();

  const [newTitle, setNewTitle] = useState(title);
  const [show, setShow] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [oldList, setOldList] = useState("");
  const [reload, setReload] = useState(false);

  const editNote = () => {
    focusInput.current.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Axios.patch(`http://localhost:3000/notes/${id}`, {
        title: newTitle,
      })
        .then((res) => console.log(res))
        .then(focusInput.current.blur());
    }
    setReload(!reload);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      focusInput.current.blur();
    }
  };

  const renderItems = (items) => {
    return items.map((item, index) => {
      return <Item data={item} noteID={id} index={index} />;
    });
  };

  const deleteNote = () => {
    Axios.delete(`http://localhost:3000/notes/${id}`).then((res) => {
      console.log(res);

      // window.location.reload();
    });
    setReload(!reload);
  };

  const addItem = (e) => {
    e.preventDefault();

    Axios.get(`http://localhost:3000/notes/${id}`).then((res) => {
      console.log("res.data", res.data);
      Axios.patch(`http://localhost:3000/notes/${id}`, {
        ...res.data,
        items: [
          ...res.data.items,
          {
            id: itemTitle,
            title: itemTitle,
            desc: itemDesc,
          },
        ],
      }).then((res) => console.log(res));
    });
    setReload(!reload);
  };

  const showAddItem = () => {
    setShow(!show);
  };

  return (
    <div class="ui raised card note">
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
        <span class="left floated plus add-item" onClick={showAddItem}>
          <i class="plus icon"></i>
          Add Item
        </span>

        <span onClick={deleteNote} class="right floated delete note-delete">
          <i class="trash alternate outline icon"></i>
          Delete Note
        </span>
      </div>

      {/* add item */}
      {show && (
        <div class="content">
          <form onSubmit={(e) => addItem(e)}>
            <div class="ui input" style={{ width: "100%" }}>
              <input
                type="text"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="Item Title... "
              />
            </div>

            <div class="ui input" style={{ width: "100%" }}>
              <input
                type="text"
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                placeholder="Item Description... "
              />
            </div>
            <button
              class="ui icon button"
              style={{ width: "100%" }}
              type="submit"
            >
              <i class="add icon"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Note;
