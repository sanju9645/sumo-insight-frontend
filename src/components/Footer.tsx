import { siteContents } from "../lib/siteContents";

const Footer = () => {
  return (
    <div className={`bg-gray-950 py-10 hidden md:block px-5 fixed bottom-0 left-0 right-0`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className={`text-3xl ${siteContents.colors.textLight1} font-bold tracking-tight`}>
          {siteContents.title}
        </span>
        <span className={`${siteContents.colors.textLight1} font-bold tracking-tight flex gap-4`}>
          {/* <span>{siteContents.texts.footerTxt1}</span> */}
          <span>{siteContents.texts.footerTxt2}</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;