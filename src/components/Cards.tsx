import "./styles/Cards.css";
import Card from "./Card";
import DataContext from "../store/data-context";
import React, { useContext } from "react";
import { DataContextInterface } from "../interfaces/interfaces";

const Cards = () => {
  const { notesData, searchString, modalChangeHanlder } = useContext(
    DataContext
  ) as DataContextInterface;

  // usememo with custom hook

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

  console.log("cards rerendered", pinnedNotes);

  return (
    <>
      {pinnedNotes.length ? <div className="cards-heading">Pinned</div> : null}
      <div className="cards">
        {pinnedNotes.map((card) => (
          <Card
            key={card.id}
            card={card}
            modalChangeHanlder={modalChangeHanlder}
          />
        ))}
      </div>

      {otherNotes.length ? <div className="cards-heading">Others</div> : null}
      <div className="cards">
        {otherNotes.map((card) => (
          <Card
            key={card.id}
            card={card}
            modalChangeHanlder={modalChangeHanlder}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(Cards);
