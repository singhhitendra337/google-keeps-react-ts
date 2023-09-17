import React, { useContext, useMemo } from "react";

import "./styles/Notes.css";
import ColorPalette from "./ColorPalette";
import NoteImage from "./NoteImage";
import useInput from "../hooks/useInput";
import DataContext from "../store/data-context";
import { DataContextInterface } from "../interfaces/interfaces";

const light_colors = [
  "#faafa8",
  "#f39f76",
  "#fff8b8",
  "#e2f6d3",
  "#b4ddd3",
  "#d4e4ed",
  "#aeccdc",
  "#d3bfdb",
  "#f6e2dd",
  "#e9e3d4",
  "#d7d7d7",
];

const dark_colors = [
  "#77172e",
  "#692b17",
  "#7c4a03",
  "#264d3b",
  "#0c625d",
  "#256377",
  "#284255",
  "#472e5b",
  "#6c394f",
  "#4b443a",
  "#472e5b",
];

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
    inputClick,
    labelClick,
  } = useInput();

  const { darkMode } = useContext(DataContext) as DataContextInterface;

  console.log("noteinput rerendere");

  // console.log("selected color", selectedColor);
  const inputStyles = useMemo(() => {
    let bgColor = "white";

    if (darkMode) {
      if (selectedColor === "white") bgColor = "#202124";
      else bgColor = dark_colors[Number(selectedColor)];
    } else {
      if (selectedColor !== "white")
        bgColor = light_colors[Number(selectedColor)];
    }
    return {
      backgroundColor: bgColor,
      borderColor: darkMode ? "#5f6368" : "",
    };
  }, [selectedColor, darkMode]);

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
                className={`input1 ${darkMode ? "input1-dark" : ""}`}
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
              } ${darkMode ? "input2-dark" : ""}`}
              placeholder="Take a Note..."
              onChange={descriptionChangeHandler}
              onClick={inputClickHandler}
              value={description}
            />
          </div>
          {showDetails ? (
            <div className="options-container">
              <div className="left-options">
                <button className="image-button" type="button">
                  <label
                    htmlFor="input-img"
                    className="file-label"
                    onClick={labelClick}
                  >
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
                    onClick={inputClick}
                  />
                </button>

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
