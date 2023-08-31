import { useCallback, useMemo, useState } from "react";

const useHeader = () => {
  const [hide, setHide] = useState(false);
  const [searchString, setSearchString] = useState("");

  const searchStringChangeHandler = useCallback((pattern: string) => {
    setSearchString(pattern);
  }, []);

  const toggleHide = useCallback(() => {
    setHide((prevHide) => !prevHide);
  }, []);

  const headerData = useMemo(() => {
    return { hide, searchString, searchStringChangeHandler, toggleHide };
  }, [hide, searchString, searchStringChangeHandler, toggleHide]);

  return headerData;
};

export default useHeader;
