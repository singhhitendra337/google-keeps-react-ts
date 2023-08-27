import { createContext } from "react";
import { notesprops } from "../components/Notes";
import { ModalInterface, datainteface } from "../App";
import { ActionInterface, StateInterface } from "../hooks/useData";

export interface DataContextInterface extends notesprops {
  modal: {
    isOpen: boolean;
    modalData: StateInterface | null;
  };
  notesData: StateInterface[];
  notesDispatch: React.Dispatch<ActionInterface>;
  modalChangeHanlder: (payload: ModalInterface) => void;
}

const DataContext = createContext<DataContextInterface | null>(null);

export default DataContext;
