import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const UserTypeSelection = ({ onClose }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-30 flex items-center justify-center z-50">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Choose your account type</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div className="space-y-6">
                    <Link to="/influencer-signin" className="w-full block mb-6">
                        <button
                            className="w-full py-4 bg-[#104581] text-white rounded-lg hover:bg-[#0d3a6d] transition-all flex items-center justify-center"
                            onClick={onClose}
                        >
                            <span className="text-lg">Sign in as Influencer</span>
                        </button>
                    </Link>
                    
                    <Link to="/brand-signin" className="w-full block">
                        <button
                            className="w-full py-4 border-2 border-[#104581] text-[#104581] bg-white rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                            onClick={onClose}
                        >
                            <span className="text-lg">Sign in as Brand</span>
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default UserTypeSelection