import "./styles/Notes.css";
import NoteInput from "./NoteInput";
import Cards from "./Cards";
import React, { useMemo } from "react";

const Notes = ({ hide }: { hide: boolean }) => {
  const customStyles = useMemo(
    () => ({
      marginLeft: hide ? 96 : 281,
    }),
    [hide]
  );
  return (
    <div className="notes-wrapper" style={customStyles as React.CSSProperties}>
      <NoteInput />
      {/* <CardMasonary data={data} setData={setData} /> */}
      <Cards />
    </div>
  );
};

export default React.memo(Notes);
