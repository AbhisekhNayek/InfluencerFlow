import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './signup/signup.jsx';
import Login from './login/login.jsx';
import GeneralDashboard from './GeneralDashboard/GeneralDashboard.jsx';
import InfluencerSignIn from './SignIn/InfluencerSignIn.jsx';
import BrandSignIn from './SignIn/BrandSignIn.jsx';
import InfluencerDashboard from './InfluencerDashboard/InfluencerDashboard.jsx';
import CampaignsBrowsePage from './InfluencerDashboard/components/CampaignsBrowsePage.jsx';
import AdminDashboard from './AdminDashboard/AdminDashboard.jsx';
import BusinessDashboard from './BusinessDashboard/BusinessDashboard.jsx';
import LandingPage from './LandingPage/landingPage.jsx';
import TermsAndConditions from './extra/TermsAndConditions.jsx';
import PrivacyPolicy from './extra/PrivacyPolicy.jsx';
import Guidelines from './InfluencerDashboard/components/Guidelines.jsx';
import Settings from './InfluencerDashboard/components/Settings.jsx';
import BusinessSettings from './BusinessDashboard/components/Settings.jsx';
import BusinessProfile from './BusinessDashboard/components/Profile.jsx';
import InfluencerProfile from './InfluencerDashboard/components/Profile.jsx';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/general-dashboard" element={<GeneralDashboard />} />
        <Route path = "/influencer-signin" element = {<InfluencerSignIn/>}></Route>
        <Route path = "/brand-signin" element = {<BrandSignIn/>}></Route>
        <Route path = "/influencer-dashboard" element = {<InfluencerDashboard/>}></Route>
        <Route path="/campaigns-browse-page" element={<CampaignsBrowsePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/business-dashboard/settings" element={<BusinessSettings />} />
        <Route path="/business-dashboard/profile" element={<BusinessProfile />} />
        <Route path="/influencer-dashboard/profile" element={<InfluencerProfile />} />
        <Route path="/influencer-dashboard/settings" element={<Settings />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/guidelines/:campaignId" element={<Guidelines />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />        
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
