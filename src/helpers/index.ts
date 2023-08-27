import { PayloadInterface, StateInterface } from "../interfaces/interfaces";

export const findNote = (state: StateInterface[], id: string) => {
  const foundNote = state.find((c) => c.id === id);
  return foundNote;
};

export const addNote = (state: StateInterface[], card: StateInterface) => {
  let newData = [...state];
  newData.push(card);
  return newData;
};

export const deleteNote = (state: StateInterface[], id: string) => {
  let newData = [...state];
  newData = newData.filter((c) => c.id !== id);
  return newData;
};

export const updateNote = (
  state: StateInterface[],
  id: string,
  newState: PayloadInterface
) => {
  let newData = [...state];
  const foundCard = findNote(newData, id) as StateInterface;
  Object.assign(foundCard, { ...newState });
  return newData;
};
