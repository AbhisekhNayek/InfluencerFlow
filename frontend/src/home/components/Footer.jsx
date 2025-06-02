
import { Link, animateScroll as scroll } from 'react-scroll';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    const handleScroll = () => {
      const gotop = document.querySelector('.gotop');
      if (window.scrollY > 200) {
        gotop?.classList.add('display');
      } else {
        gotop?.classList.remove('display');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // cleanup
  }, []);

  return (
    <footer className="mt-12 bg-gray-800 text-white py-12 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl font-bold">MicroMatch</h1>
              <p className="footer-text">
                Lorem ipsum Here are thirteen health benefits of apples Lorem
              </p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold">Important Link</h3>
                <ul>
                  <li>
                    <Link
                      className="hover:text-gray-300"
                      spy={true}
                      smooth={true}
                      duration={1000}
                      to="headerbg"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-gray-300" to="features" spy={true} smooth={true} duration={1000}>
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-gray-300" to="about-scroll" spy={true} smooth={true} duration={1000}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-gray-300" to="contact" spy={true} smooth={true} duration={1000}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>  
             <div className="flex flex-col space-y-4">
               <h3 className="text-lg font-semibold">Contact</h3>
               <ul className="flex flex-col space-y-2">
                 <li><Link className="hover:text-gray-300" to="#">burhankcd@gmail.com</Link></li>
                 <li><Link className="hover:text-gray-300" to="#">Burhan #3265</Link></li>
                 <li><Link className="hover:text-gray-300" to="#">0212 444 44 44</Link></li>
              </ul>
             </div>
            </div>
          </div>
         <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-semibold">Social Media</h3>
                <ul className="flex flex-col space-y-2">
                  <li><a className="hover:text-gray-300" target="_blank" rel="noreferrer" href="https://github.com/darkleas">Github</a></li>
                  <li><a className="hover:text-gray-300" target="_blank" rel="noreferrer" href="https://twitter.com/burhankocadag0">Twitter</a></li>
                  <li><a className="hover:text-gray-300" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/burhan-kocada%C4%9F-49a3331a5/">Linkedin</a></li>
                </ul>
              </div>
          </div>
      </div>
      <button
        onClick={() => scroll.scrollToTop(2500)}
        className="gotop fixed bottom-8 right-8 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 z-50 transition-colors duration-300 hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
export default Footer;
