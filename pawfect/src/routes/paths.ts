export const rootPaths = {
  homeRoot: '',
  pagesRoot: 'pages',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  livefeed: `/${rootPaths.pagesRoot}/live-feed`,
  activitylog: `/${rootPaths.pagesRoot}/activity-log`,
  calendar: `/${rootPaths.calendarRoot}`,

  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,

  404: `/${rootPaths.errorRoot}/404`,
};
