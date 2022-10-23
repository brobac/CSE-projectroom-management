import { MODAL_TYPE } from "@components";

export const useModal = (type: typeof MODAL_TYPE[keyof typeof MODAL_TYPE]) => {
  const target = document.getElementById(type) as HTMLInputElement;

  const openModal = () => (target.checked = true);
  const closeModal = () => (target.checked = false);
  const toggleModal = () => (target.checked = !target.checked);

  return { openModal, closeModal, toggleModal };
};
