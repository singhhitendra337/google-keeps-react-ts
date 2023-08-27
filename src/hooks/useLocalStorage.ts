import { useEffect } from "react";
import useData from "./useData";
import { ActionInterface, StateInterface } from "../interfaces/interfaces";

const useLocalStorage = (
  initialValue: []
): [StateInterface[], React.Dispatch<ActionInterface>] => {
  const [notesData, notesDispatch] = useData(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data") as string)
      : initialValue
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(notesData));
  }, [notesData]);

  return [notesData, notesDispatch];
};

export default useLocalStorage;
