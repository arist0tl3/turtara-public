// @ts-nocheck
import { Dashboard } from '../../../generated';
import { IContext } from '../../../types';

async function dashboard(parent: undefined, args: undefined, context: IContext): Promise<Dashboard | null> {
  try {
    const { currentUser } = context;

    if (!currentUser?._id) throw new Error('User not found');

    const reports = await context.models.Person.find({
      createdById: currentUser._id,
      reportsToMe: true,
    });

    const mostRecentMeetingByReport = await Promise.all(
      reports.map(async (report) => {
        const meeting = await context.models.PersonNote.findOne({
          personId: report._id,
        }).sort({ createdAt: -1 });
        return meeting;
      }),
    );

    const outstandingMeetingReports = reports
      .map((report) => {
        const mostRecentMeeting = mostRecentMeetingByReport.find((meeting) => meeting?.personId === report._id);

        const outstandingMeetingReport = {
          _id: report._id,
          firstName: report.firstName,
          lastName: report.lastName,
          profileImageSrc: report.profileImageSrc,
        };

        if (!mostRecentMeeting) return outstandingMeetingReport;

        const twentyOneDaysAgo = new Date();
        twentyOneDaysAgo.setDate(twentyOneDaysAgo.getDate() - 21);
        if (mostRecentMeeting.createdAt < twentyOneDaysAgo) {
          return {
            ...outstandingMeetingReport,
            lastMeetingDate: mostRecentMeeting.createdAt,
          };
        }

        return null;
      })
      .filter((report) => report !== null);

    return {
      outstandingMeetingReports,
    };
  } catch (error) {
    return null;
  }
}

export default dashboard;
