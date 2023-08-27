import { useEffect, useState } from "react";
import useData, { ActionInterface, StateInterface } from "./useData";

const useLocalStorage = (
  initialValue: []
): [StateInterface[], React.Dispatch<ActionInterface>] => {
  const getData = () => {
    const val = localStorage.getItem("data");
    if (val) return JSON.parse(val);

    return initialValue;
  };

  // const [state, setState] = useState(getData);
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
