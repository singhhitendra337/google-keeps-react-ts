import { useContext, useEffect, useState } from "react";
import "./styles/Modal.css";
import { datainteface } from "../App";
import DataContext, { DataContextInterface } from "../store/data-context";
import NoteImage from "./NoteImage";
import NoteOptions from "./NoteOptions";
import { StateInterface } from "../hooks/useData";

const Modal = () => {
  const { modal, setModal, modalChangeHanlder, notesDispatch } = useContext(
    DataContext
  ) as DataContextInterface;
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      //  if (ref.current && !ref.current.contains(event.target)) {
      // console.log("ref", ref.current);
      // console.log("target", event.target);
      // console.log(ref.current.contains(event.target));
      // console.log(tray);

      console.log("modal remove triggerd window");
      //   setModal({ isOpen: false, modalData: null });

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

          {/* <div className="modal-bottom-container">
          <button
            id="modal-save"
            className="save"
            style={{ marginLeft: 10 }}
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
            <span className="material-symbols-outlined">save</span>
          </button>

          <button
            id="modal-delete"
            className="delete"
            style={{ marginRight: 10 }}
          >
            <span className="material-symbols-sharp">delete</span>
          </button>
        </div> */}
        </div>
        <div className="modal-options" style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            <NoteOptions card={modal.modalData as StateInterface} />
          </div>
          <button
            id={`modal-save ${modal.modalData?.id}`}
            className="save"
            style={{ marginLeft: 136, background: "transparent" }}
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
