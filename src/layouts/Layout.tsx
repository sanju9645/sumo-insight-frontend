import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

type Props = {
  children: React.ReactNode;
  showFooter?: boolean;
  showHero?: boolean;
};

const Layout = ({ children, showFooter = true, showHero=false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {showHero && <Hero />}

      <div className="container mx-auto flex-1 p-5 mt-20">
        {children}
      </div>

      { showFooter && <Footer /> }
    </div>
  )
}

export default Layout;