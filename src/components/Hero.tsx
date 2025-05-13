import hero from "../assets/hero.webp";


const Hero = () => {
  return (
    <div>
      <img 
        src={hero} 
        className="w-full max-h-[600px] object-cover" 
        loading="lazy"
        alt="Hero"
      />
    </div>
  );
};

export default Hero;