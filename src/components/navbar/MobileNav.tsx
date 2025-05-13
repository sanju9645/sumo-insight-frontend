import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "../ui/separator";
import { siteContents } from "../../lib/siteContents";
import LoginButton from "../LoginButton";
import { useTheme } from "../theme/ThemeProvider";
import MobileNavLinks from "./MobileNavLinks";
import UserProfileCircle from "./UserProfileCircle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";


const MobileNav = () => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const textColor = theme === "dark" ? colors.textLight1 : colors.textDark1;
  const { isAuthenticated } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className={`${textColor}`} />
      </SheetTrigger>

      <SheetContent className={`space-y-3`}>
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <UserProfileCircle />
            </span>
          ) : (
            <span> {siteContents.texts.mobileNavTxt1} </span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <LoginButton />
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;