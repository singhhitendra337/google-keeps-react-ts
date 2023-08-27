import { useReducer } from "react";
import { addNote, deleteNote, updateNote } from "../helpers";
import { ActionInterface, StateInterface } from "../interfaces/interfaces";

const useData = (
  initialValue: StateInterface[] | []
): [StateInterface[], React.Dispatch<ActionInterface>] => {
  const reducer = (state: StateInterface[], action: ActionInterface) => {
    switch (action.type) {
      case "add": {
        const newNotes = addNote(state, action.payload as StateInterface);
        return newNotes;
      }

      case "delete": {
        const newNotes = deleteNote(state, action.payload.id);
        return newNotes;
      }

      case "update": {
        console.log("update", action);
        const newNotes = updateNote(state, action.payload.id, action.payload);
        return newNotes;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);

  return [state, dispatch];
};

export default useData;
