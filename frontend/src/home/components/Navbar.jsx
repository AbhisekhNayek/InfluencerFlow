import { Link } from "react-scroll";
import { useEffect, useState } from "react";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const gotop = document.querySelector(".gotop");
      const nav = document.querySelector(".navbar");

      if (!nav) return;

      if (window.screen.width < 768 && window.scrollY > 690) {
        gotop?.classList.add("display");
        nav.classList.add("navopened");
      } else if (window.screen.width > 768 && window.scrollY > 220) {
        gotop?.classList.add("display");
        nav.classList.add("navopened");
      } else {
        gotop?.classList.remove("display");
        nav.classList.remove("navopened");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  function openBar() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        isNavOpen ? "bg-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="flex-1 font-bold text-white text-2xl">
          <Link spy={true} smooth={true} duration={1000} to="headerbg">
            MicroMatch
          </Link>
        </h1>
        <div className="md:hidden" onClick={openBar}>
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-6 h-1 bg-white rounded-full"></div>
          </div>
        </div>
        <div
          className={`absolute ${
            isNavOpen ? "top-full left-0 right-0 bg-gray-800 z-10 p-4 flex flex-col space-y-4" : "hidden top-full left-0 right-0 bg-gray-800 z-10 p-4"
          } md:static md:flex md:space-x-4 md:flex-row md:items-center md:space-y-0 md:p-0 md:bg-transparent md:text-white w-full`}
        >
          <button className="w-full text-left text-white hover:text-gray-300 md:w-auto">
            <Link onClick={openBar} activeClass="active" spy={true} smooth={true} duration={1000} to="headerbg">
              Home
            </Link>
          </button>
          <button className="w-full text-left text-white hover:text-gray-300 md:w-auto">
            <Link onClick={openBar} activeClass="active" to="features" spy={true} smooth={true} duration={1000}>
              Features
            </Link>
          </button>
          <button className="w-full text-left text-white hover:text-gray-300 md:w-auto">
            <Link onClick={openBar} to="about-scroll" spy={true} smooth={true} duration={1000} activeClass="active">
              About
            </Link>
          </button>
          <button className="w-full text-left text-white hover:text-gray-300 md:w-auto">
            <Link onClick={openBar} to="contact" spy={true} smooth={true} duration={1000} activeClass="active">
              Contact
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
