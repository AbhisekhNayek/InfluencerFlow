import React from 'react'
import { Link } from 'react-router-dom'
import cta from '../assets/cta.png'

const CTA = () => {
  return (
    <section className='w-full bg-white py-24 p-4 items-center'>
      <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 gap-8 max-w-[400px]'>
        <img src={cta} alt="hero" className='w-[500px] mx-auto'/>
        <div className='flex flex-col justify-start gap-4'>
          <div>
            <h1 className='md:leading-[42px] py-8 md:text-3xl text-lg font-semibold'>
              Join one of the best <span className='text-[#104581]'>platforms for Influencer</span> Marketing from all over the world
            </h1>
            <p className='py-2 text-lg text-gray-900'>Witness a New Era of Influencer Marketing</p>
            <Link to="/signup">
              <button className='max-[780px]:w-full px-8 text-white py-3 bg-[#104581] rounded-lg hover:bg-[#0d3a6d] transition-all'>
                Sign up for free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA