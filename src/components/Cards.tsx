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

  return (
    <div className="cards">
      {filteredNotesData.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;
