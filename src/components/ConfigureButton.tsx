import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Settings } from "lucide-react";
import { siteContents } from "../lib/siteContents";
import { useTheme } from "./theme/ThemeProvider";

const ConfigureButton = () => {
  const { theme } = useTheme();
  const colors = siteContents.colors;
  const bgColor2 = theme === "dark" ? colors.bgLight2 : colors.bgDark2;
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(siteContents.pages.insightConfigure)}
      className={`flex items-center px-3 font-bold hover:${bgColor2}`}
    >
      <Settings />
      <span className="block md:hidden">{siteContents.buttons.btnLabel3}</span>
    </Button>
  );
};

export default ConfigureButton;