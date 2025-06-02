import React from 'react'
import AboutImage from '../assets/achievement.png'
import { FaHandshake } from 'react-icons/fa'
import { AiOutlineGlobal } from 'react-icons/ai'
import { FaChartLine } from 'react-icons/fa'
import { FaUserFriends } from 'react-icons/fa'

const About = () => {
  return (
    <section className='w-full bg-white p-5'>
        <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
            <div className='flex flex-col justify-start gap-4'>
                <h1 className='md:leading-[42px] py-2 text-3xl font-semibold'>
                    About <span className='text-[#104581]'>MicroMatch</span>
                </h1>
                <p className='text-[#536e96] text-2xl'>The Smart Platform Connecting Brands with Perfect Influencers</p>
                <p className='text-[#536e96]'>MicroMatch is an influencer marketing platform designed for businesses to connect with multiple influencers by prioritizing nano and micro-influencers due to their high engagement rates as compared to big influencers.</p>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaHandshake size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>Connect</h1>
                            <p className='text-[#60737a]'>With Influencers</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <AiOutlineGlobal size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>Expand</h1>
                            <p className='text-[#60737a]'>Your Reach</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaChartLine size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>Track</h1>
                            <p className='text-[#60737a]'>Performance</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaUserFriends size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>Build</h1>
                            <p className='text-[#60737a]'>Relationships</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" justify-center items-center">
                <img src={AboutImage} alt="about us" className='md:order-last m-auto order-first'/>
            </div>
        </div>
    </section>
  )
}

export default About