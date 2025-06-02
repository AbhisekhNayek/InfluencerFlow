import { discount, robot } from "../assets";
import "../GeneralDashboard.css";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex md:items-center flex-col md:flex-row gap-10 md:gap-0"
    >
      <div className="flex flex-col gap-5 flex-1 pr-10 md:pr-0">
        <div className="relative">
          <h1 className="text-[3.3rem] sm:text-6xl leading-snug sm:leading-normal md:text-7xl md:leading-snug font-[600] font-poppins text-slate-900">
            Complete
            <br className="md:block hidden" />{" "}
            <span className="text-blue-600">Account to Start</span>{" "}
            <br className="md:block hidden " />
          </h1>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-black sm:mt-5 md:max-w-[470px]">
          Start your journey with MicroMatch, whether you are a business or an
          influencer, we have got your collaborations goals covered. Complete
          your profile and let us handle your marketing.
        </p>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <img src={robot} alt="robot" className="md:w-full md:h-full" />
        {/* <div className="absolute w-[40%] h-[35%] top-0 pink__gradient"></div>
        <div className="absolute w-[80%] h-[80%] rounded-full bottom-40 white__gradient"></div>
        <div className="absolute w-[50%] h-[50%] right-20 bottom-20 blue__gradient"></div> */}
      </div>
    </section>
  );
};

export default Hero;
