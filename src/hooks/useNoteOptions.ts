import { ChangeEvent, useCallback, useContext, useMemo } from "react";
import DataContext from "../store/data-context";
import { DataContextInterface, StateInterface } from "../interfaces/interfaces";

const useNoteOptions = ({ card }: { card: StateInterface }) => {
  const { notesDispatch, modal, modalChangeHanlder } = useContext(
    DataContext
  ) as DataContextInterface;

  //const {id : cardID,isPinned : pinValue}=card;

  const deleteHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      notesDispatch({ type: "delete", payload: { id: card.id } });
    },
    [card, notesDispatch]
  );

  const copyHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      const newId = Math.floor(Math.random() * 1000 + 5).toString();
      notesDispatch({ type: "add", payload: { ...card, id: newId } });
    },
    [card, notesDispatch]
  );

  const colorHandler = useCallback(
    (color: string) => {
      notesDispatch({
        type: "update",
        payload: { id: card.id, color: color },
      });

      if (modal.isOpen) {
        const prevData = { ...modal.modalData, color } as StateInterface;
        modalChangeHanlder({ isOpen: true, modalData: prevData });
      }
    },
    [card, modal, modalChangeHanlder, notesDispatch]
  );

  const pinHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      notesDispatch({
        type: "update",
        payload: { id: card.id, isPinned: !card.isPinned },
      });
    },
    [card, notesDispatch]
  );

  const labelClick = useCallback(
    (event: React.MouseEvent<HTMLLabelElement>) => {
      event.stopPropagation();
    },
    []
  );

  const inputClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
    },
    []
  );

  const imageHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // setImageData(event.target.files)
      event.stopPropagation();
      console.log(event.target, "image change triggered");

      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileReader = new FileReader();

      // Read the file as a data URL (base64-encoded string)
      fileReader.readAsDataURL(file);

      // Event listener for when the file is loaded
      fileReader.onload = function (event) {
        if (!event.target) return;
        const imageUrl = event.target.result as string;

        notesDispatch({
          type: "update",
          payload: { id: card.id, image: imageUrl },
        });

        if (modal.isOpen) {
          const prevData = {
            ...modal.modalData,
            image: imageUrl,
          } as StateInterface;
          modalChangeHanlder({ isOpen: true, modalData: prevData });
        }
      };
    },
    [card, modal, modalChangeHanlder, notesDispatch]
  );

  const inputData = useMemo(
    () => ({
      deleteHandler,
      colorHandler,
      copyHandler,
      pinHandler,
      labelClick,
      inputClick,
      imageHandler,
    }),
    [
      deleteHandler,
      colorHandler,
      copyHandler,
      pinHandler,
      labelClick,
      inputClick,
      imageHandler,
    ]
  );

  return inputData;
};

export default useNoteOptions;
