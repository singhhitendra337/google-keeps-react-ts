import { useContext, useEffect, useState } from "react";
import "./styles/Modal.css";
import DataContext from "../store/data-context";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import { DataContextInterface, StateInterface } from "../interfaces/interfaces";

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

const Modal = () => {
  const { notesDispatch, modal, modalChangeHanlder, darkMode } = useContext(
    DataContext
  ) as DataContextInterface;
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log("modal remove triggerd window");

      modalChangeHanlder({ isOpen: false, modalData: null });
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [modalChangeHanlder]);

  const [modalTitle, setModalTitle] = useState(modal.modalData?.title);
  const [modalDescription, setModalDescription] = useState(
    modal.modalData?.description
  );

  console.log("modal rerendered", modal.modalData);

  return (
    <div className="overlay">
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          backgroundColor: darkMode
            ? dark_colors[Number(modal.modalData?.color)]
            : light_colors[Number(modal.modalData?.color)],
        }}
      >
        <div className="modal-content">
          <NoteImage image={modal.modalData?.image as string} />
          <textarea
            className="modal-title"
            value={modalTitle}
            onChange={(event) => {
              setModalTitle(event.target.value);
            }}
            rows={2}
          ></textarea>

          <textarea
            className="modal-desc"
            onChange={(event) => setModalDescription(event.target.value)}
            rows={5}
            value={modalDescription}
          ></textarea>
        </div>
        <div
          className="modal-options"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ width: "70%" }}>
            <NoteOptions card={modal.modalData as StateInterface} />
          </div>
          <button
            id={`modal-save ${modal.modalData?.id}`}
            className="modal__save"
            style={{
              marginLeft: 136,
              cursor: "pointer",
            }}
            onClick={(event) => {
              event.stopPropagation();
              console.log("inside modal save", modalTitle, modalDescription);
              notesDispatch({
                type: "update",
                payload: {
                  id: modal.modalData?.id as string,
                  title: modalTitle,
                  description: modalDescription,
                },
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
