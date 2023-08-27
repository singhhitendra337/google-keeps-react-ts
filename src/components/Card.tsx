import "./styles/Card.css";
import { useContext } from "react";
import DataContext from "../store/data-context";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import { DataContextInterface, StateInterface } from "../interfaces/interfaces";

const Card = ({ card }: { card: StateInterface }) => {
  const { modalChangeHanlder } = useContext(
    DataContext
  ) as DataContextInterface;

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

export default Card;
