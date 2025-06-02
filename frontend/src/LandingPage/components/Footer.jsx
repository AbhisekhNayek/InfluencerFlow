import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#96AED0] py-8 px-4">
      <div className="md:max-w-[1100px] m-auto">
        
        {/* Horizontal Navigation Links */}
        <div className="pt-6 border-t border-gray-200">
          <ul className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-8 text-gray-600">
            <li className="cursor-pointer hover:text-gray-900" onClick={scrollToTop}>Home</li>
            <li className="cursor-pointer hover:text-gray-900">
                <Link to="/terms-conditions">Terms and Conditions</Link>
              </li>
              <li className="cursor-pointer hover:text-gray-900">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            <li className="cursor-pointer hover:text-gray-900">Support</li>
            <li className="cursor-pointer hover:text-gray-900">Contact</li>
          </ul>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer