import React from "react";
import "./styles/Card.css";
const NoteImage = ({ image }: { image: string }) => {
  if (!image) {
    return <div></div>;
  }
  return (
    <div className="img-div">
      <img src={image} alt="" />
    </div>
  );
};

export default React.memo(NoteImage);
