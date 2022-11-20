import { useEffect, useState } from "react";
import { MODAL_TYPE } from "@components";

export const useModal = (type: typeof MODAL_TYPE[keyof typeof MODAL_TYPE]) => {
  const [target, setTarget] = useState<HTMLInputElement>();

  useEffect(() => {
    setTarget(document.getElementById(type) as HTMLInputElement);
  }, [type]);

  const openModal = () => {
    target!.checked = true;
  };
  const closeModal = () => (target!.checked = false);
  const toggleModal = () => (target!.checked = !target!.checked);

  return { openModal, closeModal, toggleModal };
};
