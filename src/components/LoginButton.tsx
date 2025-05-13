import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "../components/ui/button";
import { siteContents } from "../lib/siteContents";
import { useTheme } from "./theme/ThemeProvider";

type Props = {
  className?: string;
};

const LoginButton: React.FC<Props> = ({ className }) => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const bgColor = theme === "dark" ? colors.bgLight1 : colors.bgDark1;
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button
        onClick={async () => {
          await loginWithRedirect();
        }}
        className={`font-bold text-center ${bgColor} ${className}`}
      >
        {siteContents.buttons.btnLabel1}
      </Button>
    </>
  );
};
export default LoginButton;