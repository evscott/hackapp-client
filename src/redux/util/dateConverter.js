import dayjs from "dayjs";

export function convertOverview(overview) {
  // Convert dates
  overview.startDate = dayjs(overview.startDate).toDate();
  overview.endDate = dayjs(overview.endDate).toDate();
  overview.regDeadline = dayjs(overview.regDeadline).toDate();
  return overview;
}
