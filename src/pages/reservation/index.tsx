import { DateSelectSection } from "./_dateSelectSection";
import { ReservationPageLayout } from "./_layout";
import { ProjectroomSelect } from "./_projectroomSelect";

export const ReservationPage = () => {
  return (
    <ReservationPageLayout>
      <DateSelectSection />
      <ProjectroomSelect />
    </ReservationPageLayout>
  );
};
