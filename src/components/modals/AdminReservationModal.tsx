import { adminSelectedReservationState } from "@/stores/admin/reservation";
import { toYYMMDD_KO_DAY_DOT_HHmm } from "@utils";
import { useRecoilValue } from "recoil";
import { Modal } from "./Modal";

export const AdminReservationModal = () => {
  const { member, reservation, tableReturn } = useRecoilValue(
    adminSelectedReservationState,
  );
  return (
    <Modal type="modal-admin-reservation" closeButton>
      <div className="flex w-full flex-col gap-4">
        <div>
          <span className="text-xl font-bold">예약자 정보</span>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right">로그인 ID :</span>
            <span>{member.loginId}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right">이름 :</span>
            <span>{member.name}</span>
          </p>
        </div>
        <div>
          <span className="text-xl font-bold">예약 정보</span>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right">프로젝트실 :</span>
            <span>{reservation.roomName}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right"> 테이블 :</span>
            <span>{reservation.tableName}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right">시작 시간 :</span>
            <span>{toYYMMDD_KO_DAY_DOT_HHmm(reservation.startAt)}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="w-20 text-right">종료시간 :</span>
            <span>{toYYMMDD_KO_DAY_DOT_HHmm(reservation.endAt)}</span>
          </p>
        </div>
        <div>
          <span className="text-xl font-bold">반납 정보</span>
          {tableReturn.returnedAt ? (
            <div>
              <p className="flex items-center gap-1">
                <span className="w-20 text-right">반납시간 :</span>
                <span>{toYYMMDD_KO_DAY_DOT_HHmm(tableReturn.returnedAt)}</span>
              </p>
              <div className="h-96  overflow-auto">
                <img
                  src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${tableReturn.cleanUpPhoto.fileUrl}${tableReturn.cleanUpPhoto.fileLocalName}`}
                  alt="반납사진"
                  className=" w-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div>반납하지 않았습니다</div>
          )}
        </div>
      </div>
    </Modal>
  );
};
