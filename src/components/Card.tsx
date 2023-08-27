import "./styles/Card.css";
import ColorPalette from "./ColorPalette";
import { datainteface } from "../App";
import { useContext } from "react";
import DataContext, { DataContextInterface } from "../store/data-context";
import { StateInterface } from "../hooks/useData";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";

const Card = ({ card }: { card: StateInterface }) => {
  //console.log("card rerendered", card);
  const { setData, setModal, notesDispatch, modalChangeHanlder } = useContext(
    DataContext
  ) as DataContextInterface;
  const deleteHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    // setData((prevData) => {
    //   const newData = prevData.filter((c) => c.id !== card.id);
    //   return newData;
    // });

    notesDispatch({ type: "delete", payload: { id: card.id } });
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: card.color }}
      onClick={(event) => {
        event.stopPropagation();
        // setModal({ isOpen: true, modalData: card });

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
