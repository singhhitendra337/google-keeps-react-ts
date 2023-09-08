import { useCallback, useMemo, useState } from "react";

const useHeader = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");

  const [darkMode, setDarkMode] = useState<boolean>(false);

  const searchStringChangeHandler = useCallback((pattern: string) => {
    setSearchString(pattern);
  }, []);

  const toggleHide = useCallback(() => {
    setHide((prevHide) => !prevHide);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const html = document.querySelector("html");

    if (html) {
      if (!darkMode) html.style.backgroundColor = "#202124";
      else html.style.backgroundColor = "white";
    }
    setDarkMode((prevState) => !prevState);
  }, [darkMode]);

  const headerData = useMemo(() => {
    return {
      hide,
      searchString,
      searchStringChangeHandler,
      toggleHide,
      darkMode,
      toggleDarkMode,
    };
  }, [
    hide,
    searchString,
    searchStringChangeHandler,
    toggleHide,
    darkMode,
    toggleDarkMode,
  ]);

  return headerData;
};

export default useHeader;
