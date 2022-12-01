import { useModal } from "@/hooks/useModal";
import { useReservation, useUserState } from "@stores";
import { DateSelectSection } from "./_dateSelectSection";
import { ReservationPageLayout } from "./_layout";
import { ProjectroomSelect } from "./_projectroomSelect";
import { TableSelectSection } from "./_tableSelectSection";
import { TimeSelectSection } from "./_timeSelectSection";

export const ReservationPage = () => {
  const { hasAuth } = useUserState();
  const { openModal } = useModal("modal-login");

  const { mutate: reservation, isValid } = useReservation();

  const onClickReservation = () => {
    if (!hasAuth) openModal();
    else reservation();
  };

  return (
    <ReservationPageLayout>
      <DateSelectSection />
      <ProjectroomSelect />
      <TimeSelectSection />
      <TableSelectSection />
      <div className="flex justify-center py-10">
        <button
          onClick={onClickReservation}
          disabled={!isValid}
          className="btn-primary btn-wide btn text-lg text-base-100"
        >
          예약하기
        </button>
      </div>
    </ReservationPageLayout>
  );
};
