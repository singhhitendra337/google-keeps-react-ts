import { ChangeEvent, useContext, useState } from "react";
import "./styles/NoteOptions.css";
import DataContext from "../store/data-context";
import ColorPalette from "./ColorPalette";
import { DataContextInterface, StateInterface } from "../interfaces/interfaces";

const NoteOptions = ({ card }: { card: StateInterface }) => {
  const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  const deleteHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    notesDispatch({ type: "delete", payload: { id: card.id } });
  };

  const copyHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const newId = Math.floor(Math.random() * 1000 + 5).toString();
    notesDispatch({ type: "add", payload: { ...card, id: newId } });
  };

  const colorHandler = (color: string) => {
    notesDispatch({
      type: "update",
      payload: { id: card.id, color: color },
    });
  };

  const pinHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    notesDispatch({
      type: "update",
      payload: { id: card.id, isPinned: !card.isPinned },
    });
  };

  return (
    <div className="note-option-container">
      <div
        className="material-symbols-outlined note-icon "
        onClick={deleteHandler}
      >
        delete
      </div>

      <ColorPalette colorHandler={colorHandler} />

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
          onClick={(event) => {
            console.log("label click triggered");
            console.log(card, event.target);
            event.stopPropagation();
          }}
          style={{ padding: 0 }}
        >
          <div className="material-symbols-outlined note-icon">image</div>
        </label>
        <input
          type="file"
          id={`options ${card.id}`}
          accept="image/*"
          style={{ display: "none" }}
          onClick={(event) => {
            event.stopPropagation();
            console.log("input click triggered");
            console.log(card, event.target);
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            // setImageData(event.target.files)
            event.stopPropagation();
            console.log(event.target, "image change triggered");

            if (!event.target.files || event.target.files.length === 0) return;

            const file = event.target.files[0];
            const fileReader = new FileReader();

            // Read the file as a data URL (base64-encoded string)
            fileReader.readAsDataURL(file);

            // Event listener for when the file is loaded
            fileReader.onload = function (event) {
              if (!event.target) return;
              const imageUrl = event.target.result as string;

              notesDispatch({
                type: "update",
                payload: { id: card.id, image: imageUrl },
              });
            };
          }}
        />
      </div>

      <div className="material-icons note-icon" onClick={pinHandler}>
        turned_in{!card.isPinned ? "_not" : ""}
      </div>
    </div>
  );
};

export default NoteOptions;
