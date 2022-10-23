import { Children } from "react";
import { MODAL_TYPE } from ".";

type ModalProps = {
  type: typeof MODAL_TYPE[keyof typeof MODAL_TYPE];
  children?: React.ReactNode;
  closeButton?: boolean;
};
export const Modal = ({ type, closeButton, children }: ModalProps) => {
  return (
    <>
      <input type="checkbox" id={type} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="align-center modal-box relative flex flex-col items-center">
          {closeButton && (
            <label
              htmlFor={type}
              className=" btn-outline btn-sm btn-circle btn absolute right-2 top-2"
            >
              ✕
            </label>
          )}
          {children}
        </div>
      </div>
    </>
  );
};
