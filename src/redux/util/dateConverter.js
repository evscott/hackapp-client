import dayjs from "dayjs";

export function convertOverview(overview) {
  // TODO: remove these lines when server is fixed
  if (!overview.startDate) overview.startDate = overview.start_date;
  if (!overview.endDate) overview.endDate = overview.end_date;
  if (!overview.maxReg) overview.maxReg = overview.max_reg;
  if (!overview.regDeadline) overview.regDeadline = overview.reg_deadline;
  // Convert dates
  overview.startDate = dayjs(overview.startDate).toDate();
  overview.endDate = dayjs(overview.endDate).toDate();
  overview.regDeadline = dayjs(overview.regDeadline).toDate();
  return overview;
}
