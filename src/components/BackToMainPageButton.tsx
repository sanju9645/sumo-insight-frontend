import { ArrowBigLeftDash } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { siteContents } from "../lib/siteContents";
import { useTheme } from "./theme/ThemeProvider";

const BackToMainPageButton = () => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const bgColor2 = theme === "dark" ? colors.bgLight2 : colors.bgDark2;
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(siteContents.pages.apiInsight)}
      className={`flex items-center px-3 font-bold hover:${bgColor2}`}
    >
      <ArrowBigLeftDash />
      <span>{siteContents.buttons.btnLabel4}</span>
    </Button>
  );
};

export default BackToMainPageButton;