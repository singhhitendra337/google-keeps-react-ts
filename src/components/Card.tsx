import "./styles/Card.css";
import React, { useContext } from "react";
import DataContext from "../store/data-context";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import {
  DataContextInterface,
  ModalInterface,
  StateInterface,
} from "../interfaces/interfaces";

const Card = ({
  card,
  modalChangeHanlder,
}: {
  card: StateInterface;
  modalChangeHanlder: (payload: ModalInterface) => void;
}) => {
  // const { modalChangeHanlder } = useContext(
  //   DataContext
  // ) as DataContextInterface;

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
