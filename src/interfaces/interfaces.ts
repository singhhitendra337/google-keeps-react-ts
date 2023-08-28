export interface StateInterface {
  title: string;
  description: string;
  image: string;
  id: string;
  color: string;
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

export interface ModalInterface {
  isOpen: boolean;
  modalData: StateInterface | null;
}

export interface DataContextInterface {
  modal: {
    isOpen: boolean;
    modalData: StateInterface | null;
  };
  notesData: StateInterface[];
  notesDispatch: React.Dispatch<ActionInterface>;
  modalChangeHanlder: (payload: ModalInterface) => void;
  searchString: string;
}
