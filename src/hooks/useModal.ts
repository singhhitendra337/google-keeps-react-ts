import { StateInterface } from "./useData";

interface ModalInterface {
  isOpen: boolean;
  modalData: StateInterface | null;
}

export interface PayloadInterface {
  title?: string;
  description?: string;
  image?: string;
  id: string;
  color?: string;
}

export interface ActionInterface {
  type: string;
  payload: PayloadInterface;
}

const useModal = () => {
  // const reducer = (state: ModalInterface[], action: ActionInterface) => {
  //     switch (action.type) {
  //       case "add": {
  //         const newNotes = addNote(state, action.payload as StateInterface);
  //         return newNotes;
  //       }
  //       case "delete": {
  //         const newNotes = deleteNote(state, action.payload.id);
  //         return newNotes;
  //       }
  //       case "update": {
  //         const newNotes = updateNote(state, action.payload.id, action.payload);
  //         return newNotes;
  //       }
  //       default:
  //         return state;
  //     }
  //   };
  //   const [state, dispatch] = useReducer(reducer, initialValue);
  //   return [state, dispatch];
};

export default useModal;
