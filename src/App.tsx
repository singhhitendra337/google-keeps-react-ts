import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reminder from "./components/Reminder";
import Notes, { notesprops } from "./components/Notes";
import Wrapper from "./components/Wrapper";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Modal from "./components/Modal";
import DataContext from "./store/data-context";
import useData, { StateInterface } from "./hooks/useData";

export interface datainteface {
  title: string;
  description: string;
  image: string;
  id: string;
  color: string;
}

export interface ModalInterface {
  isOpen: boolean;
  modalData: StateInterface | null;
}

function App() {
  const [hide, setHide] = useState(false);
  const [data, setData] = useState<datainteface[]>([]);
  // const [data, setData] = useLocalStorage([]);
  const [notesData, notesDispatch] = useLocalStorage([]);

  //const [notesData, notesDispatch] = useData();

  const [modal, setModal] = useState<ModalInterface>({
    isOpen: false,
    modalData: null,
  });

  const modalChangeHanlder = (payload: ModalInterface) => {
    setModal(payload);
  };

  return (
    <div className="App">
      <DataContext.Provider
        value={{
          data,
          setData,
          modal,
          setModal,
          modalChangeHanlder,
          notesData,
          notesDispatch,
        }}
      >
        <Header setHide={setHide} />

        <Router>
          <Wrapper>
            <Navbar hide={hide} />
            <Routes>
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/" element={<Notes />} />
              {/* <Route path="/signin" element={<Inspiration />} /> */}

              {/* <Route path="/addcourse" element={<Personal/>} />
            <Route path="/courses" element={<Work />} />
            <Route path="/courses/:courseId" element={<Edit Labels />} /> */}
            </Routes>
          </Wrapper>
        </Router>
        {modal.isOpen && <Modal />}
      </DataContext.Provider>
    </div>
  );
}

export default App;
