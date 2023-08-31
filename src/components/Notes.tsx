import "./styles/Notes.css";
import NoteInput from "./NoteInput";
import Cards from "./Cards";
import React, { useMemo } from "react";

const Notes = ({ hide }: { hide: boolean }) => {
  const notesWrapperStyles = useMemo(
    () => ({
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: hide ? 0 : 200,
    }),
    [hide]
  );
  return (
    <div
      className="notes-wrapper"
      style={notesWrapperStyles as React.CSSProperties}
    >
      <NoteInput />
      {/* <CardMasonary data={data} setData={setData} /> */}
      <Cards />
    </div>
  );
};

export default React.memo(Notes);
