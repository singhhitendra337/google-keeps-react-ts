import "./styles/Cards.css";
import Card from "./Card";
import DataContext from "../store/data-context";
import { useContext } from "react";
import { DataContextInterface } from "../interfaces/interfaces";

const Cards = () => {
  const { notesData } = useContext(DataContext) as DataContextInterface;

  return (
    <div className="cards">
      {notesData.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;
