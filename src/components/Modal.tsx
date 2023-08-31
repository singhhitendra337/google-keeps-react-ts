import { useContext, useEffect, useState } from "react";
import "./styles/Modal.css";
import DataContext from "../store/data-context";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import { DataContextInterface, StateInterface } from "../interfaces/interfaces";
import { couldStartTrivia } from "typescript";

const Modal = () => {
  //const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  const { notesDispatch, modal, modalChangeHanlder } = useContext(
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
  }, []);

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
        style={{ backgroundColor: modal.modalData?.color }}
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
        <div className="modal-options" style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            <NoteOptions card={modal.modalData as StateInterface} />
          </div>
          <button
            id={`modal-save ${modal.modalData?.id}`}
            className="save"
            style={{
              marginLeft: 136,
              background: "transparent",
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
