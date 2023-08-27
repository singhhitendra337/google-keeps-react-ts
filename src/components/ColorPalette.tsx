import { useContext, useEffect, useState } from "react";
import "./styles/ColorPalette.css";
import { datainteface } from "../App";
import DataContext, { DataContextInterface } from "../store/data-context";

const ColorPalette = ({ cardId }: { cardId: string }) => {
  const [tray, setTray] = useState(false);
  const colors = [
    "#f39f76",
    "#faafa8",
    "#d7d7d7",
    "#b4ddd3",
    "#fff8b8",
    "#e2f6d3",
    "#aeccdc",
    "#d3bfdb",
    "#f6e2dd",
    "#e9e3d4",
  ];

  const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  useEffect(() => {
    const handleOutsideClick = () => {
      console.log("triggerd window palette");
      setTray(false);
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const colorClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("reacheed here");
    const targetDiv = event.target as HTMLDivElement;
    // setData((prevData) => {
    //   const newData = [...prevData];
    //   const findCard = newData.find((d) => d.id === cardId) as datainteface;

    //   // Cast event.target to HTMLDivElement

    //   // console.log(event.target.dataset.color);

    //   Object.assign(findCard, { color: targetDiv.dataset.color });

    //   console.log(newData);

    //   return newData;
    // });

    notesDispatch({
      type: "update",
      payload: { id: cardId, color: targetDiv.dataset.color },
    });
  };

  return (
    <div
      className="color-button"
      onClick={(event) => {
        event.stopPropagation();
        setTray((prev) => !prev);
      }}
    >
      <span className="material-symbols-outlined note-icon">palette</span>
      {tray && (
        <div className="color-tray">
          <div
            className="material-symbols-outlined color-box"
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={"#FFFFFF"}
            onClick={colorClickHandler}
            data-color={"#FFFFFF"}
          >
            <span className="material-symbols-outlined">
              format_color_reset
            </span>
          </div>
          {colors.map((color) => {
            return (
              <div
                className="color-box"
                style={{ backgroundColor: color }}
                key={color}
                onClick={colorClickHandler}
                data-color={color}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
