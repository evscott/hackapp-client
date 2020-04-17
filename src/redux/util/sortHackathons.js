/**
 * Sorts hackathons in order by date. By default, it sorts chronologically, but
 * by setting the reverse parameter, it sorts reverse-chronologically.
 *
 * @param hackathons The array of hackathons to sort
 * @param reverse True if the user wishes to sort in reverse order
 * @returns {*} The sorted array of hackathons
 */
const sortHacks = (hackathons, reverse = false) => {
  const multiplier = reverse ? -1 : 1;
  return hackathons.sort((h1, h2) => {
    // Sort in reverse-chronological format
    if (h1.overview.startDate !== h2.overview.startDate) {
      return multiplier * (h1.overview.startDate - h2.overview.startDate);
    } else if (h1.overview.endDate !== h2.overview.endDate) {
      return multiplier * (h1.overview.endDate - h2.overview.endDate);
    } else {
      return multiplier * (h1.overview.regDeadline - h2.overview.regDeadline);
    }
  });
};

/**
 * Filters and sorts hackathons that have already ended. Does not include draft
 * hackathons.
 *
 * @param hackathons Array of hackathons
 * @returns {*} The hackathons that have ended in reverse-chronological order
 */
const sortPrevHackathons = hackathons => {
  hackathons = hackathons.filter(
    // Only keep hackathons that end before now and are not drafts
    hackathon =>
      hackathon.overview.endDate < new Date() && !hackathon.overview.draft
  );
  return sortHacks(hackathons, true);
};

/**
 * Filters and sorts hackathons that are drafts.
 *
 * @param hackathons Array of hackathons
 * @returns {*} The hackathons that are drafts in chronological order
 */
const sortDraftHackathons = hackathons => {
  hackathons = hackathons.filter(hackathon => hackathon.overview.draft);
  return sortHacks(hackathons);
};

/**
 * Filters and sorts hackathons that are in the future. Does not include draft
 * hackathons.
 *
 * @param hackathons Array of hackathons
 * @returns {*} The hackathons that end after the present date/time
 */
const sortNextHackathons = hackathons => {
  hackathons = hackathons.filter(
    // Only keep hackathons that end after today and are not drafts
    hackathon =>
      hackathon.overview.endDate >= new Date() && !hackathon.overview.draft
  );
  return sortHacks(hackathons);
};

export { sortPrevHackathons, sortNextHackathons, sortDraftHackathons };
