import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { siteContents } from "../../lib/siteContents";
import { useTheme } from "../theme/ThemeProvider";
import ConfigureButton from "../ConfigureButton";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const bgColor2 = theme === "dark" ? colors.bgLight2 : colors.bgDark2;

  return (
    <>
      <Button
        onClick={() => logout({
          logoutParams: {
            returnTo: `${window.location.origin}`
          }
        })}
        className={`flex items-center px-3 font-bold hover:${bgColor2}`}
      >
        <LogOut /> {siteContents.buttons.btnLabel2}
      </Button>

      <ConfigureButton />
    </>
  );
};

export default MobileNavLinks;