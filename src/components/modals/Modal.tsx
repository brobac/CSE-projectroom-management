import { MODAL_TYPE } from ".";

type ModalProps = {
  type: typeof MODAL_TYPE[keyof typeof MODAL_TYPE];
  children?: React.ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
};
export const Modal = ({ type, closeButton, children, onClose }: ModalProps) => {
  return (
    <>
      <input type="checkbox" id={type} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="align-center modal-box relative flex flex-col items-center">
          {closeButton && (
            <label
              htmlFor={type}
              onClick={onClose}
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
