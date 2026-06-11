import { getCliClient } from 'sanity/cli';

const client = getCliClient();

// Helper to make block content
const block = (text, style = 'normal', marks = []) => ({
  _key: Math.random().toString(36).substring(2, 9),
  _type: 'block',
  style,
  markDefs: [],
  children: [{ _key: Math.random().toString(36).substring(2, 9), _type: 'span', text, marks }],
});

const listItem = (text) => ({
  ...block(text),
  listItem: 'bullet',
  level: 1,
});

async function seed() {
  console.log('Seeding Privacy Policy...');
  await client.createOrReplace({
    _id: 'privacyPolicyPage',
    _type: 'privacyPolicyPage',
    title: 'Privacy Policy Page',
    sections: [
      {
        _key: 'sec1',
        title: '1. Introduction',
        body: [
          block('This Privacy Policy explains how JJ Property Partner PTY LTD (ABN 71 687 187 113) (\'we\', \'us\', \'our\') collects, uses, stores, and discloses your personal information when you visit our website at www.jjpropertypartner.com.au, contact us, or engage our buyers agent services. This Privacy Policy forms part of our overall contractual framework and should be read together with our Terms and Conditions, available at www.jjpropertypartner.com.au/terms-and-conditions.'),
          block('By accessing our website or providing us with your personal information, you consent to the collection, use, and disclosure of your personal information in accordance with this Privacy Policy.')
        ]
      },
      {
        _key: 'sec2',
        title: '2. What Personal Information We Collect',
        body: [
          block('We may collect the following types of personal information:'),
          block('2.1 Information You Provide Directly', 'h3'),
          listItem('Full name'),
          listItem('Email address'),
          listItem('Phone number and WhatsApp contact details'),
          listItem('Residential or business address'),
          listItem('Property preferences, budget, and acquisition criteria'),
          listItem('Financial information relevant to your property goals (borrowing capacity, deposit amount, portfolio details)'),
          listItem('Self-Managed Super Fund (SMSF) details where relevant to your service engagement'),
          listItem('Information provided in strategy session enquiry forms, contact forms, or direct communications'),
          listItem('Any other information you choose to provide to us'),
          listItem('Records of referral commissions or benefits received in connection with referrals made on your behalf'),
          block('2.2 Information Collected Automatically', 'h3'),
          listItem('IP address and device type'),
          listItem('Browser type and version'),
          listItem('Pages visited and time spent on our website'),
          listItem('Referring website or search terms used to find our website'),
          listItem('Location data (general, not precise)'),
          listItem('Cookie data and similar tracking technologies'),
          block('2.3 Sensitive Information', 'h3'),
          block('In certain circumstances, our services may involve the collection of sensitive information including financial information and, where relevant to SMSF property acquisitions, superannuation-related information. We will only collect sensitive information with your consent and where it is necessary for the provision of our services.'),
          block('Sensitive financial information we may collect includes borrowing capacity assessments, identification documents, payslips, tax returns, bank statements, and SMSF trust deeds provided in connection with your property acquisition. This information is collected solely for the purpose of providing our buyers agent services and will be handled with the highest degree of confidentiality. Your explicit consent for the collection of sensitive information will be obtained during the onboarding process or within your Engagement Agreement.')
        ]
      },
      {
        _key: 'sec3',
        title: '3. How We Collect Your Personal Information',
        body: [
          block('We collect personal information through the following means:'),
          listItem('Strategy session enquiry forms on our website'),
          listItem('Contact forms and email communications'),
          listItem('Phone calls and WhatsApp communications'),
          listItem('In-person or video call consultations'),
          listItem('Calendly booking system (for strategy session scheduling)'),
          listItem('Third-party referrals from partners, associates, or existing clients'),
          listItem('Google Reviews and publicly available information'),
          listItem('Automatically through website cookies and analytics tools'),
          listItem('Records of cooling-off period notices and Engagement Agreement execution'),
          listItem('Identity verification documents collected for Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) compliance purposes, including government-issued photo identification and proof of address')
        ]
      },
      {
        _key: 'sec4',
        title: '4. Why We Collect and Use Your Personal Information',
        body: [
          block('4.1 Primary Purpose — Service Delivery', 'h3'),
          listItem('To provide buyers agent services including property search, due diligence, negotiation, and settlement coordination'),
          listItem('To understand your property goals, budget, and acquisition criteria'),
          listItem('To identify suitable properties and present acquisition recommendations'),
          listItem('To conduct suburb research, due diligence, and market analysis on your behalf'),
          listItem('To communicate with your legal, financial, and other professional advisers as required'),
          listItem('To manage our ongoing client relationship throughout your property acquisition'),
          block('4.2 Administrative and Business Purposes', 'h3'),
          listItem('To respond to your enquiries and strategy session bookings'),
          listItem('To schedule and manage appointments via our booking system'),
          listItem('To send service-related communications including updates and settlement milestones'),
          listItem('To maintain business records and comply with legal and regulatory obligations'),
          listItem('To manage invoicing, payments, and our engagement agreement with you'),
          listItem('To maintain records of referral commissions received from third-party service providers in accordance with our disclosure obligations under the Property and Stock Agents Act 2002 (NSW)'),
          listItem('To comply with our obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) and related regulations, including identity verification, record keeping, and suspicious matter reporting obligations'),
          listItem('To verify your identity and conduct customer due diligence as required by applicable AML/CTF laws and regulations'),
          block('4.3 Marketing and Communication', 'h3'),
          listItem('To send you relevant property market updates, insights, and blog content (where you have consented)'),
          listItem('To inform you of new services or changes to our existing services'),
          listItem('To improve our website content and user experience'),
          block('You may opt out of marketing communications at any time by contacting us at info@jjpropertypartner.com.au or clicking the unsubscribe link in any marketing email.')
        ]
      },
      {
        _key: 'sec5',
        title: '5. Disclosure of Your Personal Information',
        body: [
          block('We may disclose your personal information to the following third parties where necessary for the provision of our services or as required by law:'),
          block('5.1 Service Providers and Professional Advisers', 'h3'),
          listItem('Selling agents, real estate agencies, and property vendors (as part of property acquisition processes)'),
          listItem('Mortgage brokers and lending institutions (as instructed by you)'),
          listItem('Solicitors and conveyancers coordinating your property settlement'),
          listItem('Building and pest inspection companies conducting inspections on your behalf'),
          listItem('SMSF advisers, accountants, and auditors where relevant to your engagement'),
          listItem('Financial planners or investment advisers you have authorised us to liaise with'),
          block('5.2 Technology and Platform Providers', 'h3'),
          listItem('Website hosting and content management providers (Hostinger)'),
          listItem('Email service providers for business communications'),
          listItem('Calendly (appointment scheduling platform)'),
          listItem('Google Analytics and Google Reviews platform'),
          listItem('WhatsApp Business (Meta Platforms) for client communications'),
          listItem('Cloud storage and document management service providers'),
          block('5.3 Legal and Regulatory Disclosure', 'h3'),
          block('We may disclose your personal information to government bodies, regulators, or law enforcement agencies where required by law, a court order, or in response to a lawful request. This includes disclosure to NSW Fair Trading in connection with our REA licence obligations.'),
          block('5.4 Business Transfers', 'h3'),
          block('In the event of a sale, merger, or acquisition of JJ Property Partner PTY LTD, your personal information may be transferred to the acquiring entity as part of that transaction. We will notify you of any such transfer in accordance with applicable privacy laws. We do not sell, rent, or trade your personal information to third parties for their own marketing purposes.'),
          block('5.5 Referral Partners', 'h3'),
          block('Where the Company refers clients to third-party service providers — including mortgage brokers, accountants, financial planners, solicitors, conveyancers, building and pest inspectors, or other professionals — the Company may disclose your name and contact details to those providers for the purpose of facilitating the referral.'),
          block('The Company may receive a referral commission or benefit in connection with these referrals. All such referrals and commissions will be disclosed to you in writing prior to or at the time of the referral. You are under no obligation to engage any referred provider.')
        ]
      },
      {
        _key: 'sec6',
        title: '6. Overseas Disclosure',
        body: [
          block('Some of the third-party platforms and service providers we use (including Google, Meta/WhatsApp, and Calendly) may store or process personal information outside of Australia. Where we disclose personal information to overseas recipients, we take reasonable steps to ensure those recipients handle your information in accordance with the Australian Privacy Principles or equivalent privacy standards.')
        ]
      },
      {
        _key: 'sec7',
        title: '7. Cookies and Website Tracking',
        body: [
          block('Our website uses cookies and similar tracking technologies to enhance your browsing experience and to analyse website traffic. Cookies are small text files stored on your device when you visit our website.'),
          block('7.1 Types of Cookies We Use', 'h3'),
          listItem('Essential cookies — necessary for the website to function correctly'),
          listItem('Analytics cookies — to understand how visitors interact with our website (Google Analytics)'),
          listItem('Marketing cookies — to track the effectiveness of our marketing activities'),
          listItem('Preference cookies — to remember your settings and preferences'),
          block('7.2 Managing Cookies', 'h3'),
          block('You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. For information on managing cookies in your browser, please refer to your browser\'s help documentation.')
        ]
      },
      {
        _key: 'sec8',
        title: '8. Data Security',
        body: [
          block('We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Our security measures include:'),
          listItem('Secure website hosting with SSL encryption'),
          listItem('Access controls limiting personal information access to authorised personnel only'),
          listItem('Secure email and communication platforms'),
          listItem('Regular review of our data security practices and procedures'),
          block('While we take all reasonable precautions, no data transmission over the internet or electronic storage system can be guaranteed as completely secure. We cannot guarantee the absolute security of your personal information.')
        ]
      },
      {
        _key: 'sec9',
        title: '9. How Long We Retain Your Information',
        body: [
          block('We retain your personal information for as long as necessary to provide our services to you and to comply with our legal obligations. Specifically:'),
          listItem('Client engagement records — retained for a minimum of 7 years following the completion of our services, in accordance with NSW Fair Trading licence requirements'),
          listItem('Enquiry and contact records — retained for up to 3 years from the date of last contact'),
          listItem('Financial and transaction records — retained for 7 years in accordance with Australian taxation law'),
          listItem('Website analytics data — retained in accordance with the applicable platform provider\'s retention policies'),
          listItem('Anti-Money Laundering records — identity verification documents, customer due diligence records, and transaction records are retained for a minimum of 7 years from the date of the transaction or the end of the business relationship, in accordance with the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth)'),
          block('When personal information is no longer required, we will take reasonable steps to destroy or de-identify it securely.')
        ]
      },
      {
        _key: 'sec10',
        title: '10. Your Privacy Rights',
        body: [
          block('Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you have the following rights in relation to your personal information:'),
          block('10.1 Right of Access', 'h3'),
          block('You have the right to request access to the personal information we hold about you. To make an access request, please contact us in writing at info@jjpropertypartner.com.au. We will respond to your request within 30 days. We may charge a reasonable fee for providing access to your information.'),
          block('10.2 Right to Correction', 'h3'),
          block('If you believe that the personal information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, you have the right to request that we correct it. We will take reasonable steps to correct your information within 30 days of your request.'),
          block('10.3 Right to Withdraw Consent', 'h3'),
          block('Where we rely on your consent to use your personal information, you have the right to withdraw your consent at any time. Withdrawal of consent will not affect the lawfulness of any processing carried out prior to your withdrawal.'),
          block('10.4 Right to Complain', 'h3'),
          block('If you believe we have breached the Australian Privacy Principles or mishandled your personal information, you have the right to lodge a complaint with us directly or with the Office of the Australian Information Commissioner (OAIC).'),
          block('To lodge a complaint with the OAIC, visit: www.oaic.gov.au or call 1300 363 992.')
        ]
      },
      {
        _key: 'sec11',
        title: '11. Third-Party Websites and Links',
        body: [
          block('Our website may contain links to third-party websites, including real estate listing portals, government grant information pages, and partner service providers. This Privacy Policy does not apply to those third-party websites. We encourage you to review the privacy policies of any third-party websites you visit through links on our website.')
        ]
      },
      {
        _key: 'sec11a',
        title: '11A. Anti-Money Laundering and Counter-Terrorism Financing',
        body: [
          block('JJ Property Partner PTY LTD is subject to obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) (AML/CTF Act) and the Anti-Money Laundering and Counter-Terrorism Financing Rules Instrument 2007 (Cth). In connection with these obligations, we are required to collect, verify, and retain certain personal information about our clients.'),
          block('11A.1 Identity Verification', 'h3'),
          block('Before or during the onboarding process, we may be required to verify your identity by collecting and checking one or more of the following documents:'),
          listItem('Current Australian passport or foreign passport'),
          listItem('Australian driver\'s licence or state/territory photo identification card'),
          listItem('Medicare card (as a supporting document)'),
          listItem('Birth certificate'),
          listItem('Proof of address (such as a utility bill or government correspondence dated within the past 3 months)'),
          block('For corporate clients, SMSF trustees, or trust structures, additional documentation may be required including company ASIC extracts, trust deeds, and identification of beneficial owners and controlling persons.'),
          block('11A.2 Upcoming AML/CTF Obligations — Effective 1 July 2026', 'h3'),
          block('The Anti-Money Laundering and Counter-Terrorism Financing Amendment Act 2024 (Cth) expands the AML/CTF regime to include real estate professionals, including buyers agents, as designated reporting entities. These expanded obligations take effect from 1 July 2026.'),
          block('From 1 July 2026, JJ Property Partner PTY LTD will be required to:'),
          listItem('Implement and maintain an AML/CTF Program'),
          listItem('Conduct Customer Due Diligence (CDD) on all clients'),
          listItem('Conduct Enhanced Due Diligence (EDD) on higher-risk clients, transactions, or jurisdictions'),
          listItem('Monitor ongoing client relationships for unusual or suspicious activity'),
          listItem('Report suspicious matters to AUSTRAC'),
          listItem('Report threshold transactions (AUD 10,000 or more) to AUSTRAC'),
          listItem('Retain all AML/CTF records for a minimum of 7 years'),
          block('11A.3 Suspicious Matter Reporting', 'h3'),
          block('Under the AML/CTF Act, we are required to submit a Suspicious Matter Report (SMR) to AUSTRAC if we have reasonable grounds to suspect that a transaction or activity may be related to money laundering, terrorism financing, tax evasion, or other serious criminal activity. We are prohibited by law from disclosing to any person (including the subject of the report) that an SMR has been or may be submitted.'),
          block('11A.4 Consequences of Non-Provision', 'h3'),
          block('If you do not provide the identity verification information we request, we may be unable to commence or continue providing our services to you. This is not a choice — it is a legal obligation. We will inform you if we are unable to proceed due to incomplete identity verification.')
        ]
      },
      {
        _key: 'sec12',
        title: '12. Children\'s Privacy',
        body: [
          block('Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, please do not submit any personal information through our website or contact forms. If we become aware that we have inadvertently collected personal information from a child under 18, we will take steps to delete that information promptly.')
        ]
      },
      {
        _key: 'sec13',
        title: '13. Changes to This Privacy Policy',
        body: [
          block('We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we update this Policy, we will revise the \'Last Updated\' date at the top of this document and publish the updated Policy on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your personal information. Your continued use of our website or services after any changes to this Policy constitutes your acceptance of the updated Privacy Policy.')
        ]
      },
      {
        _key: 'sec14',
        title: '14. Contact Us — Privacy Enquiries',
        body: [
          block('For all privacy-related enquiries, requests for access or correction, or complaints, please contact us:'),
          block('Privacy Officer: Alex, Founder & Principal Buyers Agent'),
          block('Email Address: info@jjpropertypartner.com.au'),
          block('Phone / WhatsApp: 0481 33 44 58'),
          block('Office Address: Sydney, New South Wales, Australia')
        ]
      }
    ]
  });
  console.log('Done Seeding Privacy Policy.');
}

seed().catch(console.error);
