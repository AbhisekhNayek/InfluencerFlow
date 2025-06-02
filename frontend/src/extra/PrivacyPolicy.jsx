import { useState } from 'react';
export default function PrivacyPolicy() {
  const [expanded, setExpanded] = useState({});

    const toggleSection = (section) => {
        setExpanded((prevExpanded) => {
          // If the section is already expanded, collapse it
          if (prevExpanded[section]) {
            return { ...prevExpanded, [section]: false };
          }
          // Otherwise, collapse all other sections and expand the clicked section
          const newExpanded = {};
      newExpanded[section] = true;
      return newExpanded;
    });
  };

  const sections = [
    {
      id: 'information-collected',
      title: '1. Information We Collect',
      content: [
        {
          subheading: 'a) Account Information',
          items: [
            'Name',
            'Email address',
            'Username',
            'Profile image',
            'Payment details (processed via third-party providers)'
          ]
        },
        {
          subheading: 'b) Influencer Data via Meta API',
          items: [
            'If you authorize us to connect with your Meta (Facebook/Instagram) account, we may access the following information via Meta\'s API:',
            '• Instagram username and bio',
            '• Profile picture',
            '• Follower count',
            '• Engagement metrics (likes, comments, etc.)',
            '• Recent media content',
            '• Content insights (if permission granted)',
            '✅ This access is read-only and used solely to evaluate your eligibility for campaigns and improve brand-influencer matching. We comply with Meta\'s Platform Policies.'
          ]
        },
        {
          subheading: 'c) Campaign Interactions',
          items: [
            'Campaigns you apply to',
            'Content submitted for campaigns',
            'Communication with brands'
          ]
        },
        {
          subheading: 'd) Usage Data',
          items: [
            'IP address',
            'Browser type',
            'Device information',
            'Pages visited and activity logs'
          ]
        }
      ]
    },
    {
      id: 'use-information',
      title: '2. How We Use Your Information',
      content: [
        {
          items: [
            'We use your information to:',
            '• Operate and maintain the MicroMatch platform',
            '• Connect influencers with brand campaigns',
            '• Analyze influencer performance for better campaign matches',
            '• Process payments and send notifications',
            '• Improve user experience and platform security',
            '• Comply with legal and contractual obligations'
          ]
        }
      ]
    },
    {
      id: 'sharing-information',
      title: '3. Sharing Your Information',
      content: [
        {
          items: [
            'We do not sell your personal data. We may share data with:',
            '• Brands (only the data necessary to evaluate influencers for campaign participation)',
            '• Service providers (e.g., payment processors, analytics tools)',
            '• Legal authorities (if required by law or in response to legal process)'
          ]
        }
      ]
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      content: [
        {
          items: [
            'We implement appropriate technical and organizational measures to protect your personal data. However, no system is 100% secure. You use the platform at your own risk.'
          ]
        }
      ]
    },
    {
      id: 'data-retention',
      title: '5. Data Retention',
      content: [
        {
          items: [
            'We retain your information as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.'
          ]
        }
      ]
    },
    {
      id: 'your-rights',
      title: '6. Your Rights',
      content: [
        {
          items: [
            'Depending on your jurisdiction, you may have the right to:',
            '• Access the personal data we hold about you', 
            '• Request correction or deletion of your data',
            '• Object to or restrict certain data processing',
            '• Withdraw consent at any time (e.g., disconnect Meta account)',
            'To exercise your rights, contact us at privacy@micromatch.com'
          ]
        }
      ]
    },
    {
      id: 'third-party-links',
      title: '7. Third-Party Links',
      content: [
        {
          items: [
            'Our platform may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.'
          ]
        }
      ]
    },
    {
      id: 'childrens-privacy',
      title: '8. Children\'s Privacy',
      content: [
        {
          items: [
            'MicroMatch is not intended for individuals under 18. We do not knowingly collect personal information from children.'
          ]
        }
      ]
    },
    {
      id: 'changes-to-policy',
      title: '9. Changes to This Policy',
      content: [
        {
          items: [
            'We may update this Privacy Policy periodically. We will notify users of significant changes and post the updated policy with a new effective date.'
          ]
        }
      ]
    },
    {
      id: 'contact-us',
      title: '10. Contact Us',
      content: [
        {
          items: [
            'For questions or concerns regarding this policy, contact:',
            '📧 privacy@micromatch.com'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="bg-[#488ae9] text-white p-10 rounded-t-3xl shadow-lg text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 italic text-sm">Last Updated: [Insert Date]</p> 
        </div>
        {/* Main Body */}
        <div className="bg-white p-10 shadow-lg rounded-b-3xl">
          {/* Intro */}
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            At <span className="font-semibold text-[#488ae9]">MicroMatch</span>, we are committed to protecting your personal data and ensuring transparency about how we collect, use, and share information. This Privacy Policy explains how we handle your data when you use our influencer marketing platform.
          </p>
          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-6"> 
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <span className="text-2xl font-semibold text-[#488ae9]">{section.title}</span>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${expanded[section.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {(expanded[section.id]) && (
                  <div className="mt-4 pl-4 text-gray-600 space-y-5">
                    {section.content.map((contentBlock, contentIdx) => (
                      <div key={contentIdx}>
                        {contentBlock.subheading && (
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{contentBlock.subheading}</h3>
                        )}
                        <ul className="list-disc list-inside space-y-1">
                          {contentBlock.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-base">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Contact Info Box */}
          <div className="mt-12 p-6 bg-[#f0f8ff] rounded-2xl shadow-md border-l-4 border-[#488ae9]">
            <p className="text-lg font-semibold mb-2 text-[#488ae9]">Have privacy concerns?</p>
            <p className="text-gray-700">
              If you have any questions about our Privacy Policy, please contact our privacy team at:
              <span className="block mt-2 font-semibold text-[#488ae9]">📧 privacy@micromatch.com</span>
            </p> 
          </div>
          {/* Data Protection Statement */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-600 leading-relaxed">
              MicroMatch is committed to protecting your privacy and maintaining the security of your personal information. We regularly review our privacy practices to ensure they align with industry standards and legal requirements.
            </p>
          </div>
          {/* Footer */}
          <div className="mt-12 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} <span className="font-semibold text-[#488ae9]">MicroMatch</span>. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}