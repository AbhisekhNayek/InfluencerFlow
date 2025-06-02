import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import lock from '../assets/lock.svg'
import Hamburger from '../assets/hamburgerMenu.svg'
import Close from '../assets/close.svg'
import { motion } from 'framer-motion'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const scrollToSection = (elementId) => {
        const element = document.getElementById(elementId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setToggle(false) // Close mobile menu if open
        }
    }

    return (
        <div className='w-full h-[96px] bg-white shadow-sm'>
            <div className='p-4 md:max-w-[1080px] max-w-[400px] m-auto w-full h-full flex justify-between items-center'>
                <img src={Logo} alt="logo" className='h-[25px] cursor-pointer' />
                <div className="flex items-center">
                    <ul className='hidden md:flex gap-4 '>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer' onClick={() => scrollToSection('about-section')}>About</li>
                        <li className='cursor-pointer' onClick={() => scrollToSection('support-section')}>Support</li>
                    </ul>
                </div>
                <div className='md:flex hidden gap-4'>
                    <Link to="/login">
                        <button className='flex justify-center items-center bg-transparent px-6 py-2 gap-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all'>
                            <img src={lock} alt='lock' />
                            <span className='text-gray-800'>Login</span>
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className='px-8 py-3 bg-[#104581] text-white rounded-lg hover:bg-[#0d3a6d] transition-all'>
                            Sign up for free
                        </button>
                    </Link>
                </div>
                <motion.div whileTap={{ scale: 0.6 }} className="md:hidden cursor-pointer" onClick={handleToggle}>
                    <img src={toggle ? Close : Hamburger} alt="hamburger" />
                </motion.div>
            </div>
            <div>
                <motion.ul
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className={toggle ? 'absolute z-10 p-4 bg-white w-full px-8 md:hidden' : 'hidden'}>
                    <li className='p-4 hover:bg-gray-50 cursor-pointer'>Home</li>
                    <li className='p-4 hover:bg-gray-50 cursor-pointer' onClick={() => scrollToSection('about-section')}>About</li>
                    <li className='p-4 hover:bg-gray-50 cursor-pointer' onClick={() => scrollToSection('support-section')}>Support</li>
                    <div className='flex flex-col my-4 gap-4'>
                        <Link to="/login" className='w-full'>
                            <button className='flex w-full border border-gray-300 rounded-lg justify-center items-center bg-transparent px-6 gap-2 py-4 hover:bg-gray-100 transition-all'>
                                <img src={lock} alt='lock' />
                                <span className='text-gray-800'>Login</span>
                            </button>
                        </Link>
                        <Link to="/signup" className='w-full'>
                            <button className='w-full text-white px-8 py-5 bg-[#104581] rounded-lg hover:bg-[#0d3a6d] transition-all'>
                                Sign up for free
                            </button>
                        </Link>
                    </div>
                </motion.ul>
            </div>
        </div>
    )
}

export default Navbar