import { Link } from "react-router-dom";

import { siteContents } from "../lib/siteContents";
import MobileNav from "./navbar/MobileNav";
import MainNav from "./navbar/MainNav";
import Logo from "./Logo";
import { ModeToggle } from "./theme/ModeToggle";
import { useTheme } from "./theme/ThemeProvider";

const Header = () => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const textColor = theme === "dark" ? colors.textLight1 : colors.textDark1;

  return (
    <div className={`border-b-2 py-6 px-3`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to={siteContents.pages.apiInsight} className={`flex items-center space-x-2 gap-x-2 text-3xl font-bold tracking-tight ${textColor}`}>
          <Logo />
          {siteContents.title}
        </Link>

        <div className="flex items-center gap-x-4">
          <ModeToggle />

          <div className="md:hidden">
            <MobileNav />
          </div>

          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;