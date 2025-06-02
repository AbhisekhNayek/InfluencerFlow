import React from 'react'
import Achieve from '../assets/achievement.png'
import {FaGraduationCap} from 'react-icons/fa'
import { AiFillVideoCamera } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'

const Achievement = () => {
  return (
    <section className='w-full bg-white p-5'>
        <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
            <div className='flex flex-col justify-start gap-4'>
                <h1 className='md:leading-[42px] py-2 text-3xl font-semibold'>
                    Our <span className='text-[#104581]'>Achievements</span>
                </h1>
                <p className=' text-[#536e96] text-2x1'>Leading Brands and Local Shops use MicroMatch for Advertisement</p>
                <div className='grid md:grid-cols-2 grid-cols-1'>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaGraduationCap size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>1000 +</h1>
                            <p className='text-[#60737a]'>Brands</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <AiFillVideoCamera size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>1000 +</h1>
                            <p className='text-[#60737a]'>Videos</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaPeopleCarry size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>20000 +</h1>
                            <p className='text-[#60737a]'>Posts</p>
                        </div>
                    </div>
                    <div className="py-6 flex">
                        <div className="p-4 bg-[#e9f8f3] rounded-xl">
                            <FaGraduationCap size={30} style={{ color:'#104581' }}/>
                        </div>
                        <div className='px-3'>
                            <h1 className='text-2xl font-semibold'>10000 +</h1>
                            <p className='text-[#60737a]'>Influencers</p>
                            </div>
                    </div>
                </div>
            </div>
            <div className="border justify-center items-center">
                <img src={Achieve} alt="hero" className='md:order-last m-auto order-first'/>
            </div>
        </div>
    </section>
  )
}

export default Achievement