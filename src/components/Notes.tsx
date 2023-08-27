import "./styles/Notes.css";
import NoteInput from "./NoteInput";
import Cards from "./Cards";

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
