import { datainteface } from "../App";
import "./styles/Notes.css";
import NoteInput from "./NoteInput";
import Cards from "./Cards";
import CardMasonary from "./CardMasonary";
import { StateInterface } from "../hooks/useData";

export interface notesprops {
  data: StateInterface[];
  // dataUpdateHandler: (newData: datainteface) => void;
  setData: React.Dispatch<React.SetStateAction<datainteface[]>>;
  setModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      modalData: datainteface | null;
    }>
  >;
}

const Notes = () => {
  return (
    <div
      className="notes-wrapper"
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NoteInput />
      {/* <CardMasonary data={data} setData={setData} /> */}
      <Cards />
    </div>
  );
};

export default Notes;
