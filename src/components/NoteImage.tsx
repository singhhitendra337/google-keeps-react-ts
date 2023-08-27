import "./styles/Card.css";
function NoteImage({ image }: { image: string }) {
  if (!image) {
    return <div></div>;
  }
  return (
    <div className="img-div">
      <img src={image} alt="" />
    </div>
  );
}

export default NoteImage;
