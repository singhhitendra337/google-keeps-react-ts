import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reminder from "./components/Reminder";
import Notes from "./components/Notes";
import Wrapper from "./components/Wrapper";
import { useCallback, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Modal from "./components/Modal";
import DataContext from "./store/data-context";
import { ModalInterface } from "./interfaces/interfaces";
import useHeader from "./hooks/useHeader";
import useModal from "./hooks/useModal";

function App() {
  // const [hide, setHide] = useState(false);
  // const [searchString, setSearchString] = useState("");

  // const searchStringChangeHandler = useCallback((pattern: string) => {
  //   setSearchString(pattern);
  // }, []);

  // const toggleHide = useCallback(() => {
  //   setHide((prevHide) => !prevHide);
  // }, []);

  const { hide, searchString, toggleHide, searchStringChangeHandler } =
    useHeader();

  const [notesData, notesDispatch] = useLocalStorage([]);

  const { modal, modalChangeHanlder } = useModal();

  // const [modal, setModal] = useState<ModalInterface>({
  //   isOpen: false,
  //   modalData: null,
  // });

  // const modalChangeHanlder = useCallback((payload: ModalInterface) => {
  //   setModal(payload);
  // }, []);

  // use in separat file if not required

  const contextData = useMemo(
    () => ({
      modal,
      modalChangeHanlder,
      notesData,
      notesDispatch,
      searchString,
    }),
    [modal, modalChangeHanlder, notesData, notesDispatch, searchString]
  );

  return (
    <div className="App">
      <DataContext.Provider value={contextData}>
        <Header
          toggleHide={toggleHide}
          searchStringChangeHandler={searchStringChangeHandler}
        />

        <Router>
          <Wrapper>
            <Navbar hide={hide} />
            <Routes>
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/" element={<Notes hide={hide} />} />

              <Route path="/inspiration" element={<Reminder />} />

              <Route path="/personal" element={<Reminder />} />
              <Route path="/work" element={<Reminder />} />
              <Route path="/edit" element={<Reminder />} />
              <Route path="/archive" element={<Reminder />} />
              <Route path="/trash" element={<Reminder />} />
            </Routes>
          </Wrapper>
        </Router>
        {modal.isOpen && <Modal />}
      </DataContext.Provider>
    </div>
  );
}

export default App;
