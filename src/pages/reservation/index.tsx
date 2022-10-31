import { DateSelectSection } from "./_dateSelectSection";
import { ReservationPageLayout } from "./_layout";
import { ProjectroomSelect } from "./_projectroomSelect";
import { TableSelectSection } from "./_tableSelectSection";
import { TimeSelectSection } from "./_timeSelectSection";

export const ReservationPage = () => {
  return (
    <ReservationPageLayout>
      <DateSelectSection />
      <ProjectroomSelect />
      <TimeSelectSection />
      <TableSelectSection />
    </ReservationPageLayout>
  );
};
