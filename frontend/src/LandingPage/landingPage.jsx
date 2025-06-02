import React from 'react'
import { HeroSection, Navbar,Companies,Courses, About,Categories,FeedBack,CTA,Footer } from './components'
import InfluencerSlider from "./components/InfluencerSlider.jsx";

function LandingPage() {

  return (
    <div className="app">
      


        <Navbar/>
        <HeroSection/>
        <Companies/>
        <InfluencerSlider/>
        <div id="about-section">
        <About/>
        </div>
        
        <Categories/>
        {/* <FeedBack/> */}
        <CTA/>
        
        <div id="support-section">
        <Footer/>
        </div>
    </div>
  )
}

export default LandingPage
