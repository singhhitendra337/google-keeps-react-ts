import "./styles/Cards.css";
import { notesprops } from "./Notes";
import Card from "./Card";
import DataContext, { DataContextInterface } from "../store/data-context";
import { useContext } from "react";

const Cards = () => {
  const { data, notesData } = useContext(DataContext) as DataContextInterface;

  return (
    <div className="cards">
      {notesData.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;
