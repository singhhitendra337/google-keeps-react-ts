import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import "./styles/Notes.css";
import DataContext from "../store/data-context";
import { DataContextInterface } from "../interfaces/interfaces";
import ColorPalette from "./ColorPalette";
import NoteImage from "./NoteImage";

const NoteInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");
  const [isPinned, setIsPinned] = useState(false);

  const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  const titleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    []
  );

  const colorChangeHandler = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const imageParser = useCallback((imageContent: FileList | null) => {
    if (!imageContent) return;
    const file = imageContent[0];
    const fileReader = new FileReader();

    // Read the file as a data URL (base64-encoded string)
    fileReader.readAsDataURL(file);

    // Event listener for when the file is loaded
    fileReader.onload = function (event) {
      if (!event.target) return;
      const imageUrl = event.target.result as string;

      setImage(imageUrl);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log("triggerd window");
      setTitle("");
      setShowDetails(false);
      setSelectedColor("white");
      setImage("");
      setDescription("");
      setIsPinned(false);
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const submitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (title.trim().length === 0) {
        return;
      }

      console.log(title);
      console.log(description);
      const id = Math.floor(Math.random() * 1000 + 5).toString();

      notesDispatch({
        type: "add",
        payload: {
          title,
          description,
          id,
          color: selectedColor,
          image,
          isPinned,
        },
      });

      setShowDetails(false);

      setTitle("");
      setDescription("");
      setImage("");
      setSelectedColor("white");
    },
    [title, description, image, selectedColor, isPinned, notesDispatch]
  );

  return (
    <div className="top-container">
      <form className="form" onSubmit={submitHandler}>
        <div
          className="newDiv"
          onClick={(event) => {
            event.stopPropagation();
          }}
          style={{ backgroundColor: selectedColor }}
        >
          <span
            className={`material-icons pin-icon ${
              showDetails ? "pin-icon-active" : ""
            }`}
            onClick={() => setIsPinned((prevPinned) => !prevPinned)}
          >
            turned_in{!isPinned ? "_not" : ""}
          </span>

          {/* <span className="material-icons">turned_in</span> */}

          <div className="note-content">
            {image.length ? <NoteImage image={image} /> : null}
            {showDetails ? (
              <input
                type="text"
                id="titlenew"
                className="input1"
                placeholder="Title"
                onChange={titleChangeHandler}
                value={title}
              />
            ) : null}

            <input
              type="text"
              id="description"
              className="input2"
              placeholder="Take a Note..."
              onChange={(event) => setDescription(event.target.value)}
              onClick={(event) => {
                event.stopPropagation();
                setShowDetails(true);
              }}
              value={description}
            />
          </div>
          {showDetails ? (
            <div className="input-img-container">
              <label htmlFor="input-img" className="file-label">
                <span
                  id="span-icon"
                  className="material-symbols-outlined gray-color"
                >
                  image
                </span>
              </label>
              <input
                type="file"
                id="input-img"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  //setImageData(event.target.files)
                  imageParser(event.target.files)
                }
              />

              <ColorPalette colorHandler={colorChangeHandler} />
              <button className="b1">Save</button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default NoteInput;
