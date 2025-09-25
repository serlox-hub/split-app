export const APP_NAME = "Split App";
export const ROUTES = {
  HOME: {
    path: () => "/",
    regex: /^\/$/,
  },
  GROUPS: {
    path: () => "/groups",
    title: "titles.groups",
    regex: /^\/groups$/,
  },
  GROUP: {
    path: (groupId) => `/groups/${groupId}`,
    title: "titles.group",
    regex: /^\/groups\/([^/]+)$/,
  },
  USER: {
    path: () => "/user",
    title: "titles.user",
    regex: /^\/user$/,
  },
};
