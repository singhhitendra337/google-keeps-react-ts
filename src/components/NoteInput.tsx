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

const NoteInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<FileList | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  const titleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    []
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log("triggerd window");
      setShowDetails(false);
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (title.trim().length === 0) {
      return;
    }

    console.log(title);
    console.log(description);
    const id = Math.floor(Math.random() * 1000 + 5).toString();

    if (!imageData) {
      notesDispatch({
        type: "add",
        payload: { title, description, id, color: "white", image: "" },
      });

      setShowDetails(false);

      setTitle("");
      setDescription("");
      setImageData(null);
    } else {
      const file = imageData[0];
      const fileReader = new FileReader();

      // Read the file as a data URL (base64-encoded string)
      fileReader.readAsDataURL(file);

      // Event listener for when the file is loaded
      fileReader.onload = function (event) {
        if (!event.target) return;
        const imageUrl = event.target.result as string;

        notesDispatch({
          type: "add",
          payload: { title, description, id, color: "white", image: imageUrl },
        });

        setShowDetails(false);

        setTitle("");
        setDescription("");
        setImageData(null);
      };
    }
  };

  return (
    <div className="top-container">
      <form className="form" onSubmit={submitHandler}>
        {!showDetails ? (
          <div className="input-container">
            <input
              type="text"
              id="title"
              placeholder="Take a note..."
              onClick={(event) => {
                event.stopPropagation();
                setShowDetails(true);
              }}
              value={title}
            />
            {/* <div
              className="material-symbols-outlined gray-color"
              style={{ cursor: "pointer", color: "#a7a1a1" }}
            >
              check_box
            </div> */}
          </div>
        ) : (
          <div
            className="newDiv"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <input
              type="text"
              id="titlenew"
              className="input1"
              placeholder="Title"
              onChange={titleChangeHandler}
              value={title}
            />
            <input
              type="text"
              id="description"
              className="input2"
              placeholder="Take a Note..."
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
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
                  setImageData(event.target.files)
                }
              />
              {/* <span
                 className="material-symbols-outlined"
                 onClick={() => setPinned((prevPinned) => !prevPinned)}
               >
                 bookmark
               </span> */}

              <button type="submit" className="b1">
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteInput;
