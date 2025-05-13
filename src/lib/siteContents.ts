export interface SiteContents {
  title: string;
  homePageHeading: string;
  homePageSubHeading: string;
  buttons: {
    [key: string]: string;
  };
  texts: {
    [key: string]: string;
  };
  colors: {
    [key: string]: string;
  };
  apis: {
    [key: string]: string;
  };
  pages: {
    [key: string]: string;
  };
  errorMsgs: {
    [key: string]: string;
  };
}

export const siteContents: SiteContents = {
  title: "Sumo Insight",
  homePageHeading: "Transform Your API Data into Actionable Insights",
  homePageSubHeading: "Monitor. Optimize. Repeat",
  buttons: {
    btnLabel1: "Log In",
    btnLabel2: "Log Out",
    btnLabel3: "Configure",
    btnLabel4: "Back to Main Page",
    btnLabel5: "Save",
    btnLabel6: "Save & Exit",
  },
  texts: {
    mobileNavTxt1: "Welcome to Sumo Insight",
    footerTxt1: "Privacy Policy",
    footerTxt2: "Terms of Service",
    apiLogsEmptyText: "No API logs found"
  },
  colors: {
    bgDark1: "bg-gray-800",
    bgLight1: "bg-white",
    textDark1: "text-gray-800",
    textLight1: "text-white",
    textDark2: "text-gray-600",
    textLight2: "text-slate-300",
    border1: "border-b-gray-500",
  },
  apis: {
    userApi: "/api/user",
    getSumoLogsApi: "/api/insight/get-logs",
    insightConfigureApi: "/api/insight/configure",
    getConfigureInsightApi: "/api/insight/get-configure",
    getAllApiEndpointsApi: "/api/insight/get-all-api-endpoints",
  },
  pages: {
    authCallback: "/auth-callback",
    apiInsight: "/api-insight",
    insightConfigure: "/insight-configure"
  },
  errorMsgs: {
    userCreationErr: "Failed to create user",
    AuthInitialiseErr: "Unable to initialise auth",
    userUpdationErr: "Failed to update user",
    userFetchErr: "Failed to fetch user",
    apiLogsFetchErr: "Failed to fetch api logs",
  },
};
