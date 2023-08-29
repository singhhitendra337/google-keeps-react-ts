import "./styles/Notes.css";
import NoteInput from "./NoteInput";
import Cards from "./Cards";

const Notes = ({ hide }: { hide: boolean }) => {
  return (
    <div
      className="notes-wrapper"
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: hide ? 0 : 200,
      }}
    >
      <NoteInput />
      {/* <CardMasonary data={data} setData={setData} /> */}
      <Cards />
    </div>
  );
};

export default Notes;
