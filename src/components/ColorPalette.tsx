import { useContext, useEffect, useState } from "react";
import "./styles/ColorPalette.css";
import DataContext from "../store/data-context";
import { DataContextInterface } from "../interfaces/interfaces";

interface ColorPaletteProps {
  colorHandler: (color: string) => void;
  styles?: React.CSSProperties;
  clickHandler?: (value: boolean) => void;
}

const ColorPalette = ({
  colorHandler,
  styles,
  clickHandler,
}: ColorPaletteProps) => {
  const [tray, setTray] = useState(false);

  const { darkMode } = useContext(DataContext) as DataContextInterface;

  const light_colors = [
    "#faafa8",
    "#f39f76",
    "#fff8b8",
    "#e2f6d3",
    "#b4ddd3",
    "#d4e4ed",
    "#aeccdc",
    "#d3bfdb",
    "#f6e2dd",
    "#e9e3d4",
    "#d7d7d7",
  ];

  const dark_colors = [
    "#77172e",
    "#692b17",
    "#7c4a03",
    "#264d3b",
    "#0c625d",
    "#256377",
    "#284255",
    "#472e5b",
    "#6c394f",
    "#4b443a",
    "#472e5b",
  ];

  useEffect(() => {
    const handleOutsideClick = () => {
      console.log("triggerd window palette");
      setTray(false);
      // setIsClicked?.(false);
      clickHandler?.(false);
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [clickHandler]);

  const colorClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("reacheed here");
    const targetDiv = event.target as HTMLDivElement;

    if (darkMode)
      colorHandler(
        dark_colors.findIndex((c) => c === targetDiv.dataset.color).toString()
      );
    else
      colorHandler(
        light_colors.findIndex((c) => c === targetDiv.dataset.color).toString()
      );

    // notesDispatch({
    //   type: "update",
    //   payload: { id: cardId, color: targetDiv.dataset.color },
    // });
  };

  return (
    <button
      className="color-button"
      onClick={(event) => {
        event.stopPropagation();
        // const allTrays = document.querySelectorAll(".color-tray");

        // allTrays.forEach((node) => {
        //   node.remove();
        // });

        // console.log(allTrays);
        console.log("target", (event.target as HTMLSpanElement).dataset.id);

        setTray((prev) => !prev);
        // setIsClicked?.(true);
        clickHandler?.(true);
      }}
    >
      <span
        className="material-symbols-outlined note-icon"
        style={{ ...styles }}
      >
        palette
      </span>
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
          {!darkMode
            ? light_colors.map((color) => {
                return (
                  <div
                    className="color-box"
                    style={{ backgroundColor: color }}
                    key={color}
                    onClick={colorClickHandler}
                    data-color={color}
                  ></div>
                );
              })
            : dark_colors.map((color) => {
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
    </button>
  );
};

export default ColorPalette;
