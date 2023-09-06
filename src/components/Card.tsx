import "./styles/Card.css";
import React from "react";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import { ModalInterface, StateInterface } from "../interfaces/interfaces";

const Card = ({
  card,
  modalChangeHanlder,
}: {
  card: StateInterface;
  modalChangeHanlder: (payload: ModalInterface) => void;
}) => {
  console.log("cardddddd", card);

  return (
    <div
      className="card"
      style={{ backgroundColor: card.color }}
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
        style={{ backgroundColor: card.color }}
      />

      <div className="note-description">{card.description}</div>

      <NoteOptions card={card} />
    </div>
  );
};

export default React.memo(Card);

//export default Card;
