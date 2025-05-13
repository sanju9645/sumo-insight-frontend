import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useTheme } from "../theme/ThemeProvider";
import { siteContents } from "../../lib/siteContents";

const UserProfileCircle = () => {
  const { user } = useAuth0();
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const textColor = theme === "dark" ? colors.textLight1 : colors.textDark1;

  return (
    <div className="flex items-center gap-x-2">
      { user?.picture ? (
        <>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.picture} />
          <AvatarFallback>
            <CircleUserRound className={`${textColor}`} />
          </AvatarFallback>
        </Avatar>
        </>
      ) : (
        <CircleUserRound className={`${textColor}`} />
      )}
      { user?.name }
    </div>
  );
};

export default UserProfileCircle;