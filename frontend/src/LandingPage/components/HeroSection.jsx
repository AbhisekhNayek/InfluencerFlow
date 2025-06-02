import React from 'react'
import heroImg from '../assets/heroImg.png'
import { AiOutlineSearch } from 'react-icons/ai'

const HeroSection = () => {
  return (
    <>
      {/* Wave SVG that creates the wavy boundary */}
      <div className="w-full overflow-hidden bg-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 100" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <path 
            fill="#96AED0" 
            fillOpacity="1" 
            d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,21.3C840,11,960,21,1080,32C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section className='w-full bg-[#96AED0] py-16 p-4'>
        <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
            <div className='flex flex-col justify-start gap-4'>
                <p className='py-2 text-4xl text-[#104581] font-bold'>Connect with Influencers</p>
                <h1 className='md:leading-[42px] py-2 md:text-3xl text-lg font-semibold'>
                MicroMatch makes influencer marketing smarter, faster, and more effective. Discover the perfect <span className='text-[#398ef7]'>micro-influencers</span> to elevate your brand.
                </h1>
                <p className='py-2 text-lg text-gray-900'>Witness a New Era of Influencer Marketing</p>
            </div>
            <img src={heroImg} alt="hero" className='md:order-last order-first'/>
        </div>
      </section>
    </>
  )
}

export default HeroSection