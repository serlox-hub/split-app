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
  LOGIN_LINK: {
    path: (token) => `/login?token=${token}`,
    regex: /^\/login(\?token=.+)?$/,
  },
  USER: {
    path: () => "/user",
    title: "titles.user",
    regex: /^\/user$/,
  },
};
