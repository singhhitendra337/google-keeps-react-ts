import {
  ChangeEvent,
  FormEvent,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DataContext from "../store/data-context";
import { DataContextInterface } from "../interfaces/interfaces";

const useInput = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("white");
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const inputAreaRef = useRef<HTMLDivElement | null>(null);

  const { notesDispatch } = useContext(DataContext) as DataContextInterface;

  const titleChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    []
  );

  const descriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(event.target.value),
    []
  );

  const colorChangeHandler = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const togglePin = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsPinned((prevPinned) => !prevPinned);
  }, []);

  const inputClickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setShowDetails(true);
    },
    []
  );

  const imageParser = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const imageContent = event.target.files;
    if (!imageContent) return;
    const file = imageContent[0];
    const fileReader = new FileReader();

    // Read the file as a data URL (base64-encoded string)
    fileReader.readAsDataURL(file);

    // Event listener for when the file is loaded
    fileReader.onload = function (event) {
      if (!event.target) return;
      const imageUrl = event.target.result as string;

      setImage(imageUrl);
    };
  }, []);

  const divClickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );

  //   useEffect(() => {
  //     const handleOutsideClick = (event: MouseEvent) => {
  //       console.log("triggerd window");
  //       setTitle("");
  //       setShowDetails(false);
  //       setSelectedColor("white");
  //       setImage("");
  //       setDescription("");
  //       setIsPinned(false);
  //     };
  //     window.addEventListener("click", handleOutsideClick);

  //     return () => {
  //       console.log("unmounted");
  //       window.removeEventListener("click", handleOutsideClick);
  //     };
  //   }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log("triggerd window");

      if (
        inputAreaRef &&
        !inputAreaRef.current?.contains(event.target as Node)
      ) {
        const form = document.querySelector(".form") as HTMLFormElement;
        console.log(title);
        if (title.length > 0) {
          console.log("inside fomr");
          form.submit();
        }
        console.log("ref triggered");
        setTitle("");
        setShowDetails(false);
        setSelectedColor("white");
        setImage("");
        setDescription("");
        setIsPinned(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      console.log("unmounted");
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [inputAreaRef, title]);

  const submitHandler = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      console.log("submit triggered");
      if (title.trim().length === 0) {
        return;
      }

      console.log(title);
      console.log(description);
      const id = Date.now().toString();

      notesDispatch({
        type: "add",
        payload: {
          title,
          description,
          id,
          color: selectedColor,
          image,
          isPinned,
        },
      });

      setShowDetails(false);

      setTitle("");
      setDescription("");
      setImage("");
      setSelectedColor("white");
    },
    [title, description, image, selectedColor, isPinned, notesDispatch]
  );

  const inputData = useMemo(
    () => ({
      title,
      description,
      image,
      showDetails,
      selectedColor,
      isPinned,
      titleChangeHandler,
      descriptionChangeHandler,
      colorChangeHandler,
      imageParser,
      submitHandler,
      togglePin,
      inputClickHandler,
      divClickHandler,
      inputAreaRef,
    }),
    [
      title,
      description,
      image,
      showDetails,
      selectedColor,
      isPinned,
      titleChangeHandler,
      descriptionChangeHandler,
      colorChangeHandler,
      imageParser,
      submitHandler,
      togglePin,
      inputClickHandler,
      divClickHandler,
      inputAreaRef,
    ]
  );

  return inputData;
};

export default useInput;
