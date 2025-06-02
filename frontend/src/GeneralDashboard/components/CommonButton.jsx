
import InfluencerSignIn from "./InfluencerSignIn";
import BrandSignIn from "./BrandSignIn";

const CommonButton = ({ btnText, href, onClick }) => {
  // If onClick is provided, use a regular button
  if (onClick) {
    return (
      <button
        type="button"
        className="p-4 sm:p-5 rounded-lg w-fit capitalize bg-blue-gradient text-primary"
        onClick={onClick}
      >
        {btnText}
      </button>
    );
  }
  
  // Otherwise use an anchor with the provided href
  return (
    <button
      type="button"
      className="p-4 sm:p-5 rounded-lg w-fit capitalize bg-blue-gradient text-primary"
    >
      <a href={href || "#"} target={href?.startsWith("http") ? "_blank" : "_self"}>
        {btnText}
      </a>
    </button>
  );
};

export default CommonButton;
