import React, { useMemo } from "react";

import "./styles/Notes.css";
import ColorPalette from "./ColorPalette";
import NoteImage from "./NoteImage";
import useInput from "../hooks/useInput";

const NoteInput = () => {
  const {
    title,
    description,
    image,
    showDetails,
    selectedColor,
    isPinned,
    titleChangeHandler,
    descriptionChangeHandler,
    colorChangeHandler,
    imageParser,
    submitHandler,
    togglePin,
    inputClickHandler,
    divClickHandler,
    inputAreaRef,
  } = useInput();

  console.log("noteinput rerendere");

  const inputStyles = useMemo(() => {
    return { backgroundColor: selectedColor };
  }, [selectedColor]);

  return (
    <div className="top-container">
      <form className="form" onSubmit={submitHandler}>
        <div
          className={`newDiv ${showDetails ? "newDiv-active" : ""}`}
          onClick={divClickHandler}
          style={inputStyles}
          ref={inputAreaRef}
        >
          <span
            className={`material-icons pin-icon ${
              showDetails ? "pin-icon-active" : ""
            } `}
            onClick={togglePin}
          >
            turned_in{!isPinned ? "_not" : ""}
          </span>

          <div className="note-content">
            {image.length ? <NoteImage image={image} /> : null}
            {showDetails ? (
              <input
                type="text"
                id="titlenew"
                className="input1"
                placeholder="Title"
                onChange={titleChangeHandler}
                value={title}
              />
            ) : null}

            <input
              type="text"
              id="description"
              className={`input2 hidden-input ${
                showDetails ? "input2-active" : ""
              }`}
              placeholder="Take a Note..."
              onChange={descriptionChangeHandler}
              onClick={inputClickHandler}
              value={description}
            />
          </div>
          {showDetails ? (
            <div className="options-container">
              <div className="left-options">
                <div className="image-button">
                  <label htmlFor="input-img" className="file-label">
                    <span
                      id="span-icon"
                      className="material-symbols-outlined gray-color"
                    >
                      image
                    </span>
                  </label>

                  <input
                    type="file"
                    id="input-img"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={imageParser}
                  />
                </div>

                <ColorPalette
                  colorHandler={colorChangeHandler}
                  styles={{
                    width: 30,
                    height: 30,
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 2,
                    marginRight: 5,
                    color: "#5f6368",
                  }}
                />
              </div>
              <button className="b1">Save</button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default React.memo(NoteInput);
