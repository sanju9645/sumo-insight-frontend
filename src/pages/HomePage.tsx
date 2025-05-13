import { useAuth0 } from "@auth0/auth0-react";

import { siteContents } from "../lib/siteContents";
import LoginButton from "../components/LoginButton";
import { useTheme } from "../components/theme/ThemeProvider";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const textColor = theme === "dark" ? colors.textDark1 : colors.textLight1;
  const bgColor = theme === "dark" ? colors.bgLight1 : colors.bgDark1;
  const textColor2 = theme === "dark" ? colors.textDark2 : colors.textLight2;

  return (
    <div className="flex flex-col gap-12">
      <div className={`md:px-32 ${bgColor} rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16`}>
        <h1 className={`text-2xl md:text-5xl font-bold tracking-tight ${textColor}`}>
          {siteContents.homePageHeading}
        </h1>
        <span className={`text-xl ${textColor2}`}>{siteContents.homePageSubHeading}</span>
      </div>

      {!isAuthenticated && (
        <div className="flex items-center justify-center">
          <LoginButton className="w-1/2" />
        </div>
      )}
    </div>
  );
};

export default HomePage;