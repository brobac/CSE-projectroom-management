import { DateSelectSection } from "./_dateSelectSection";
import { ReservationPageLayout } from "./_layout";
import { ProjectroomSelect } from "./_projectroomSelect";
import { TimeSelectSection } from "./_timeSelectSection";

export const ReservationPage = () => {
  return (
    <ReservationPageLayout>
      <DateSelectSection />
      <ProjectroomSelect />
      <TimeSelectSection />
    </ReservationPageLayout>
  );
};
