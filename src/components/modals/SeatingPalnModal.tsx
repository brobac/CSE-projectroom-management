import { Modal } from "./Modal";

export const SeatingPlanModal = () => {
  return (
    <Modal type="modal-seating-plan" closeButton>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-4 text-center text-2xl font-bold text-base-content">
            D330 배치도
          </h3>
          <div className="overflow-hidden rounded-md border">
            <img src="../images/330.png" alt="D330 배치도" />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-center text-2xl font-bold text-base-content">
            DB134 배치도
          </h3>
          <div className="overflow-hidden rounded-md border">
            <img src="../images/134.png" alt="DB134 배치도" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
