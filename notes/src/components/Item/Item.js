import React, { useState, useRef } from "react";
import "./item.scss";
import Axios from "axios";
import Popup from "reactjs-popup";

const Item = (props) => {
  console.log("this is props to item.js", props);
  const { refresh } = props;
  const focusInput = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.data.title);
  const [newDesc, setNewDesc] = useState(props.data.desc);

  const deleteItem = () => {
    Axios.delete(`http://localhost:3001/items/${props.data.id}`).then((res) => {
      refresh();
      console.log(res);
    });
  };

  const Modal = () => (
    <Popup
      trigger={
        <span class="right floated view">
          <i class="envelope open outline icon"></i>
        </span>
      }
      modal
      closeOnDocumentClick
    >
      <div className="header">{props.data.title}</div>
      <div> {props.data.desc} </div>
    </Popup>
  );

  const saveItem = () => {
    Axios.patch(`http://localhost:3001/items/${props.data.id}`, {
      title: newTitle,
      desc: newDesc,
    })
      .then((res) => {
        console.log(res);
        refresh();
      })
      .catch((err) => console.log(err));

    setIsEditing(false);
  };

  const editItem = () => {
    setIsEditing(true);
    focusInput.current.focus();
  };

  return (
    <div class="item">
      <i class="sticky note icon"></i>

      {!isEditing && (
        <>
          <div class="content">
            <a class="header" onChange={(e) => setNewTitle(e.target.value)}>
              {props.data.title}
            </a>
            <div
              class="description"
              ref={focusInput}
              // onBlur={(e) => saveItem(e)}
              onChange={(e) => setNewDesc(e.target.value)}
            >
              {props.data.desc}
            </div>
          </div>

          <span class="right floated trash" onClick={deleteItem}>
            <i class="trash alternate outline icon"></i>
          </span>
          <span class="right floated edit" onClick={editItem}>
            <i class="edit outline icon"></i>
          </span>
          <Modal></Modal>
        </>
      )}

      {isEditing && (
        <>
          <div class="content">
            <input
              class="header"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />

            <textarea
              class="description"
              ref={focusInput}
              onChange={(e) => setNewDesc(e.target.value)}
            >
              {props.data.desc}
            </textarea>
          </div>

          <div class="xsave">
            <span class="right floated save" onClick={saveItem}>
              <i class="save icon"></i>
            </span>
            <span class="right floated x" onClick={() => setIsEditing(false)}>
              <i class="x icon"></i>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
