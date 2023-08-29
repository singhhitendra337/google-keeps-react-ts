import "./styles/Cards.css";
import Card from "./Card";
import DataContext from "../store/data-context";
import { useContext } from "react";
import { DataContextInterface } from "../interfaces/interfaces";

const Cards = () => {
  const { notesData, searchString } = useContext(
    DataContext
  ) as DataContextInterface;

  const filteredNotesData = notesData.filter((notes) => {
    return (
      notes.title.toLowerCase().includes(searchString.toLowerCase()) ||
      notes.description.toLowerCase().includes(searchString.toLowerCase())
    );
  });

  const pinnedNotes = filteredNotesData.filter(
    (filteredNotesData) => filteredNotesData.isPinned
  );
  const otherNotes = filteredNotesData.filter(
    (filteredNotesData) => filteredNotesData.isPinned === false
  );

  return (
    <>
      {pinnedNotes.length ? <div className="cards-heading">Pinned</div> : null}
      <div className="cards">
        {pinnedNotes.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {otherNotes.length ? <div className="cards-heading">Others</div> : null}
      <div className="cards">
        {otherNotes.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};

export default Cards;
