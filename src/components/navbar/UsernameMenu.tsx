import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { useTheme } from "../theme/ThemeProvider";
import { siteContents } from "../../lib/siteContents";
import UserProfileCircle from "./UserProfileCircle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UsernameMenu = () => {
  const { logout } = useAuth0();
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const textColor2 = theme === "dark" ? colors.textLight2 : colors.textDark2;
  const bgColor = theme === "dark" ? colors.bgLight1 : colors.bgDark1;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center px-3 font-bold hover:${textColor2} gap-2`}>
        <UserProfileCircle />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button
            onClick={() => logout({
              logoutParams: {
              returnTo: `${window.location.origin}`
            }}
          )}
            className={`flex flex-1 font-bold ${bgColor}`}
          >
            <LogOut /> {siteContents.buttons.btnLabel2}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;