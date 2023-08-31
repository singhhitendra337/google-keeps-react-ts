import { useCallback, useMemo, useState } from "react";
import { ModalInterface } from "../interfaces/interfaces";

const useModal = () => {
  const [modal, setModal] = useState<ModalInterface>({
    isOpen: false,
    modalData: null,
  });

  const modalChangeHanlder = useCallback((payload: ModalInterface) => {
    setModal(payload);
  }, []);

  const modalHookData = useMemo(() => {
    return { modal, modalChangeHanlder };
  }, [modal, modalChangeHanlder]);

  return modalHookData;
};

export default useModal;
