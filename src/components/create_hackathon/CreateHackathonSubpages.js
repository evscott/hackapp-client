import React from "react";
import InfoIcon from '@material-ui/icons/Info';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import VisibilityIcon from '@material-ui/icons/Visibility';

/** The distinct pages for creating hackathons, in order. */
export const PAGES = {
  OVERVIEW: 1,
  DETAILS: 2,
  REGISTRATION: 3,
  PREVIEW: 4
};

export const PAGES_LIST = Object.entries(PAGES).map(k => k[1]);

/**
 * The titles for each page. Can be indexed using PAGE_TITLES[page],
 * where page is an integer.
 */
export const PAGE_TITLES = {
  [PAGES.OVERVIEW]: "Overview",
  [PAGES.DETAILS]: "Details",
  [PAGES.REGISTRATION]: "Registration",
  [PAGES.PREVIEW]: "Preview"
};

export const PAGE_ICONS = {
  [PAGES.OVERVIEW]: <InfoIcon />,
  [PAGES.DETAILS]: <SettingsApplicationsIcon />,
  [PAGES.REGISTRATION]: <QuestionAnswerIcon />,
  [PAGES.PREVIEW]: <VisibilityIcon />
};
