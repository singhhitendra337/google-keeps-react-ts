import "./styles/NoteOptions.css";
import ColorPalette from "./ColorPalette";
import { StateInterface } from "../interfaces/interfaces";
import useNoteOptions from "../hooks/useNoteOptions";

const NoteOptions = ({ card }: { card: StateInterface }) => {
  const {
    deleteHandler,
    colorHandler,
    copyHandler,
    pinHandler,
    labelClick,
    inputClick,
    imageHandler,
    isClicked,
    clickHandler,
  } = useNoteOptions(card);

  //console.log("note options rerendered");

  return (
    <div
      className="note-option-container"
      style={{ visibility: isClicked ? "visible" : undefined }}
    >
      <div
        className="material-symbols-outlined note-icon "
        onClick={deleteHandler}
      >
        delete
      </div>

      <ColorPalette colorHandler={colorHandler} clickHandler={clickHandler} />

      <div
        className="material-symbols-outlined note-icon "
        onClick={copyHandler}
      >
        file_copy
      </div>

      <div className="img-container">
        <label
          htmlFor={`options ${card.id}`}
          className="file-label-options"
          onClick={labelClick}
          style={{ padding: 0 }}
        >
          <div className="material-symbols-outlined note-icon">image</div>
        </label>
        <input
          type="file"
          id={`options ${card.id}`}
          accept="image/*"
          style={{ display: "none" }}
          onClick={inputClick}
          onChange={imageHandler}
        />
      </div>

      <div className="material-icons note-icon" onClick={pinHandler}>
        turned_in{!card.isPinned ? "_not" : ""}
      </div>
    </div>
  );
};

export default NoteOptions;
