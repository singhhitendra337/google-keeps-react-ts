import "./styles/Card.css";
import React, { useContext } from "react";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import {
  DataContextInterface,
  ModalInterface,
  StateInterface,
} from "../interfaces/interfaces";
import DataContext from "../store/data-context";

interface CardProps {
  card: StateInterface;
  modalChangeHanlder: (payload: ModalInterface) => void;
}

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

const Card = ({ card, modalChangeHanlder }: CardProps) => {
  console.log("cardddddd", card);

  const { darkMode } = useContext(DataContext) as DataContextInterface;

  return (
    <div
      className="card"
      style={{
        backgroundColor: darkMode
          ? dark_colors[Number(card.color)]
          : light_colors[Number(card.color)],
      }}
      onClick={(event) => {
        event.stopPropagation();
        console.log("modal click triggered", card);
        modalChangeHanlder({ isOpen: true, modalData: card });
      }}
    >
      <NoteImage image={card.image} />
      <input
        type="text"
        className="card-title"
        value={card.title}
        style={{
          backgroundColor: "transparent",
          color: darkMode ? "white" : "",
        }}
      />

      <div
        className="note-description"
        style={{ color: darkMode ? "white" : "" }}
      >
        {card.description}
      </div>

      <NoteOptions card={card} />
    </div>
  );
};

export default React.memo(Card);

//export default Card;
