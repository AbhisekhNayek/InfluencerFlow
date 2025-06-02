import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { BiBarChartSquare } from "react-icons/bi";
import CommonButton from "./CommonButton";
import CommonTitle from "./CommonTitle";
import '../GeneralDashboard.css';
import { useNavigate } from 'react-router-dom';

const BusinessCard = (props) => {
  const { icon, title, desc } = props;
  return (
    <div className="flex items-center gap-2 ss:p-7 ss:gap-5 p-3 sm:p-5 feature-card rounded-2xl ss:rounded-3xl hover:bg-black-gradient cursor-pointer">
      <div className="p-4 bg-dimBlue rounded-full">
        <span className="text-2xl ss:text-[2rem] text-secondary">{icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-black text-base sm:text-lg font-semibold">
          {title}
        </h3>
        <p className="text-black text-xs sm:text-base">{desc}</p>
      </div>
    </div>
  );
};

const Business = () => {
  const navigate = useNavigate();

  const handleInfluencerClick = () => {
    navigate('/influencer-signin');
  };

  const handleBrandClick = () => {
    navigate('/brand-signin');
  };

  return (
    <section id="features" className="font-poppins pb-10 md:py-16 bg-white">
  <div className="flex items-center flex-col md:flex-row gap-10 md:gap-10 ss:gap-16 justify-between">
    <div className="flex flex-col gap-8 ss:gap-12 flex-1">
      <CommonTitle title="You want to reach out to influencers?" />
      <p className="text-slate-800 text-base sm:text-lg">
        Microinfluencers get noticed, grow their following, and earn through real brand partnerships—no huge audience required. At the same time, local businesses reach engaged, hyper-targeted communities at a fraction of traditional ad costs. It's a win-win: real people, real stories, real impact—right where it matters most.
      </p>

      {/* Buttons placed horizontally in a flex row container */}
      <div className="flex flex-row gap-4">
        <CommonButton btnText="as Influencer" onClick={handleInfluencerClick} />
        <CommonButton btnText="as Brand" onClick={handleBrandClick} />
      </div>
    </div>

    <div className="flex flex-col gap-5 flex-1">
      <BusinessCard
        icon={<AiOutlineSearch className="text-blue-600" />}
        title="Smart Matchmaking"
        desc="AI-powered matching connects the right influencers with the right local brands effortlessly."
      />
      <BusinessCard
        icon={<MdOutlineSecurity className="text-green-600" />}
        title="100% Secured"
        desc="We take proactive steps to make sure your information and transactions are secure."
      />
      <BusinessCard
        icon={<BiBarChartSquare className="text-purple-600" />}
        title="Performance Insights"
        desc="Track campaign impact with real-time engagement and ROI analytics tailored for both sides."
      />
    </div>
  </div>
</section>

  );
};

export default Business;