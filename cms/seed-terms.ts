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
  console.log('Seeding Terms & Conditions...');
  await client.createOrReplace({
    _id: 'termsAndConditionsPage',
    _type: 'termsAndConditionsPage',
    title: 'Terms and Conditions Page',
    sections: [
      {
        _key: 'sec1',
        title: '1. Definitions',
        body: [
          block('In these Terms and Conditions, the following definitions apply:'),
          listItem('\'Company\', \'we\', \'us\', \'our\' means JJ Property Partner PTY LTD (ABN 71 687 187 113), its directors, employees, agents, and assigns.'),
          listItem('\'Client\', \'you\', \'your\' means the person or entity engaging the Company\'s services or accessing the Company\'s website.'),
          listItem('\'Services\' means buyers agent services, property acquisition services, negotiation services, auction bidding services, strategy consultations, research services, and any other services provided by the Company.'),
          listItem('\'Engagement Agreement\' means the written agreement signed between the Company and the Client specifying the scope, fees, and conditions of the Services.'),
          listItem('\'Property\' means any real property, including residential property, commercial property, or property acquired through a Self-Managed Super Fund, that is the subject of the Company\'s Services.'),
          listItem('\'Website\' means www.jjpropertypartner.com.au and all associated pages and subdomains.'),
          listItem('\'Fee\' means the remuneration payable by the Client to the Company as specified in the Engagement Agreement.'),
          listItem('\'GST\' means Goods and Services Tax as defined under the A New Tax System (Goods and Services Tax) Act 1999 (Cth).')
        ]
      },
      {
        _key: 'sec2',
        title: '2. Acceptance of Terms',
        body: [
          block('By engaging the Company\'s Services, signing an Engagement Agreement, submitting an enquiry form, booking a strategy session, or using the Company\'s website, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms set out in your Engagement Agreement.'),
          block('If you do not agree with any part of these Terms and Conditions, you must not engage our Services or use our website. These Terms and Conditions apply to all persons who engage our Services or access our website, regardless of their location within Australia.')
        ]
      },
      {
        _key: 'sec3',
        title: '3. Buyers Agent Services',
        body: [
          block('3.1 Nature of Services', 'h3'),
          block('JJ Property Partner PTY LTD provides professional buyers agent services to purchasers of residential property, commercial property, and property acquired through Self-Managed Super Funds across Australia. Our Services are provided exclusively in the interests of the buyer and we do not act for or receive remuneration from vendors, developers, or selling agents.'),
          block('3.2 Licence and Regulatory Compliance', 'h3'),
          block('The Company holds a current REA Licence (No. 20543356) issued by NSW Fair Trading under the Property and Stock Agents Act 2002 (NSW). All Services are provided in accordance with the conditions of this licence and applicable Australian laws and regulations.'),
          block('3.3 Scope of Services', 'h3'),
          block('The specific scope of Services to be provided will be set out in your Engagement Agreement, which may include:'),
          listItem('Property search and identification'),
          listItem('Suburb/market research & data analysis'),
          listItem('Property inspections and due diligence'),
          listItem('Building and pest inspection coordination'),
          listItem('Contract review coordination'),
          listItem('Price negotiation at private treaty'),
          listItem('Auction bidding representation'),
          listItem('Settlement coordination support'),
          listItem('Negotiation-only service option'),
          listItem('SMSF property acquisition coordination'),
          listItem('Free strategy session (preliminary)'),
          block('3.4 Limitations of Service', 'h3'),
          block('The Company provides property acquisition services and strategic property advice. The Company does not provide financial advice, legal advice, tax advice, accounting advice, or financial planning services. Clients are strongly encouraged to engage independent licensed professionals including mortgage brokers, financial planners, solicitors, and accountants before making any property acquisition decision.'),
          block('Referral Commissions Disclosure: The Company may receive referral commissions, fees, or other benefits from third-party service providers including mortgage brokers, accountants, financial planners, solicitors, conveyancers, and other professionals when the Company refers clients to those providers. The receipt of any such referral commission or benefit will be disclosed to the Client in writing prior to or at the time of the referral, in accordance with the Property and Stock Agents Act 2002 (NSW) and the Australian Consumer Law. Clients are under no obligation to engage any referred service provider and may freely choose their own independent professionals.'),
          block('Recommendations made by the Company are based on research, market analysis, and professional judgment. Past performance of any property, suburb, or market does not guarantee future results. The Company does not guarantee any particular capital growth, rental yield, or investment outcome.')
        ]
      },
      {
        _key: 'sec4',
        title: '4. Engagement and Contract Formation',
        body: [
          block('4.1 Engagement Agreement', 'h3'),
          block('The Company\'s Services are provided under a written Engagement Agreement signed by both parties. The Engagement Agreement sets out the specific services to be provided, the fee structure, payment terms, duration of engagement, and any special conditions. No binding obligation arises on the Company to provide Services until a signed Engagement Agreement is in place.'),
          block('4.2 Free Strategy Session', 'h3'),
          block('The Company offers a complimentary, no-obligation strategy consultation of approximately 30 minutes. This session does not constitute a binding engagement and no property acquisition services are provided during or as a result of this session unless an Engagement Agreement is subsequently signed.'),
          block('4.3 SMSF Engagements', 'h3'),
          block('For SMSF property acquisitions, the Client warrants that they have obtained appropriate advice from a licensed financial adviser, SMSF specialist, and accountant regarding the suitability of property investment for their fund prior to engaging the Company\'s Services. The Company\'s role is limited to the property acquisition process and does not include SMSF compliance advice.'),
          block('4.4 Cooling-Off Period', 'h3'),
          block('In accordance with Section 59 of the Property and Stock Agents Act 2002 (NSW), the Client is entitled to a cooling-off period in respect of the Engagement Agreement. The cooling-off period commences at the time the Client signs the Engagement Agreement and ends at 5:00 PM on the next business day or Saturday following the date of signing.'),
          block('During the cooling-off period, the Client may rescind the Engagement Agreement by giving written notice to the Company. Notice of rescission must be delivered to the Company in writing (including by email to info@jjpropertypartner.com.au) before the expiry of the cooling-off period. The Client acknowledges that the cooling-off right applies to the Engagement Agreement and that these Terms and Conditions, which form part of the overall contractual framework, do not independently create a cooling-off right beyond that provided by the Act.')
        ]
      },
      {
        _key: 'sec5',
        title: '5. Fees and Payment',
        body: [
          block('5.1 Fee Structures', 'h3'),
          block('The Company offers the following fee structures, as agreed in the Engagement Agreement: Fixed fee, Percentage-based fee, or Hybrid fee (upfront retainer + success fee). All fees quoted by the Company are GST-inclusive unless expressly stated otherwise in the Engagement Agreement. The applicable fee will be set out in your Engagement Agreement.'),
          block('5.2 Engagement Retainer', 'h3'),
          block('The Company may require payment of an upfront engagement retainer upon signing the Engagement Agreement. The retainer amount and its treatment (whether refundable, credited against the success fee, or non-refundable) will be specified in the Engagement Agreement.'),
          block('5.3 Success Fee', 'h3'),
          block('Where the Engagement Agreement provides for a success fee, this fee becomes payable upon exchange of contracts for the property acquired by the Company on the Client\'s behalf. The success fee is payable regardless of whether the acquisition is subject to finance approval, cooling-off rights, or other conditions, unless the Engagement Agreement expressly provides otherwise.'),
          block('5.4 Payment Terms', 'h3'),
          block('Fees are payable within the timeframe specified in the Engagement Agreement and the Company\'s invoice. Late payments may incur interest at the rate of 10% per annum calculated daily on the outstanding balance. The Company reserves the right to suspend Services where fees remain unpaid beyond their due date.'),
          block('5.5 GST', 'h3'),
          block('All fees quoted by the Company are GST-inclusive as stated in Clause 5.1. Tax invoices compliant with the A New Tax System (Goods and Services Tax) Act 1999 (Cth) will be issued for all payments. The GST component will be itemised on each tax invoice for the Client\'s records.'),
          block('5.6 Expenses', 'h3'),
          block('Unless included in the agreed fee, the Client is responsible for all out-of-pocket expenses reasonably incurred by the Company in performing the Services, including building and pest inspection fees, travel expenses for interstate property inspections, and report costs. All expenses will be approved by the Client prior to being incurred.'),
          block('5.7 Referral Commission Income', 'h3'),
          block('The Company\'s fee as set out in the Engagement Agreement is separate from any referral commissions or benefits the Company may receive from third-party service providers referred to the Client. The receipt of referral commissions does not reduce or offset the Company\'s fees payable by the Client under the Engagement Agreement. Full disclosure of all referral commissions will be provided in accordance with Clause 7 of these Terms and Conditions.')
        ]
      },
      {
        _key: 'sec6',
        title: '6. Client Obligations',
        body: [
          block('The Client agrees to:'),
          listItem('Provide accurate, complete, and up-to-date information regarding their financial position, borrowing capacity, and property criteria'),
          listItem('Inform the Company promptly of any changes in their financial circumstances or instructions'),
          listItem('Engage and maintain appropriate finance pre-approval before or shortly after engaging the full search service'),
          listItem('Engage a licensed solicitor or conveyancer for contract review and settlement coordination'),
          listItem('Not engage multiple buyers agents simultaneously without disclosure to the Company'),
          listItem('Respond promptly to requests for instructions, approvals, or information from the Company to avoid delays'),
          listItem('Review and execute documents in a timely manner as required by the acquisition process'),
          listItem('Comply with all obligations under any property contract executed on their behalf'),
          listItem('Provide valid government-issued photo identification and any other identity verification documents requested by the Company for Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) compliance purposes'),
          listItem('Disclose any matters relevant to AML/CTF obligations, including the source of funds and beneficial ownership details'),
          listItem('Not use the Company\'s services for any unlawful purpose, including money laundering, terrorism financing, fraud, or tax evasion')
        ]
      },
      {
        _key: 'sec7',
        title: '7. Conflicts of Interest',
        body: [
          block('The Company acts exclusively as a buyers agent representing the interests of the Client in all property acquisition matters. The Company does not receive commissions, fees, or other payments from vendors, real estate agents, or property developers in connection with property acquisitions performed on behalf of the Client.'),
          block('7.1 Referral Commissions', 'h3'),
          block('The Company may receive referral commissions, fees, rebates, or other benefits from third-party service providers when the Company refers clients to those providers, including mortgage brokers, tax advisers, financial planners, solicitors, building and pest inspectors, and property managers.'),
          block('The Company is required under the Property and Stock Agents Act 2002 (NSW), the Property and Stock Agents Regulation 2022 (NSW), and the Australian Consumer Law to disclose to the Client any referral commission or benefit the Company receives or expects to receive in connection with any referral. The Company will provide written disclosure to the Client prior to or at the time of making any referral, specifying the nature and estimated value of any referral commission or benefit received.'),
          block('Clients are under no obligation to engage any third-party service provider referred by the Company. The Company\'s recommendations are based on the provider\'s suitability for the Client\'s needs and are not influenced by the receipt of referral commissions. Clients may freely select their own independent professionals at any time.'),
          block('7.2 Conflict Management', 'h3'),
          block('Where any actual or potential conflict of interest arises — including in connection with referral commissions — the Company will disclose this to the Client in writing promptly and will obtain the Client\'s informed consent before continuing to act. The Client may terminate the engagement without penalty where a conflict of interest cannot be appropriately managed with the Client\'s informed consent.')
        ]
      },
      {
        _key: 'sec8',
        title: '8. Confidentiality',
        body: [
          block('8.1 Company Obligations: The Company agrees to keep confidential all personal and financial information provided by the Client and will not disclose such information to any third party except as necessary to provide the Services or as required by law. This obligation survives the termination of the engagement.'),
          block('8.2 Client Obligations: The Client agrees to keep confidential all proprietary research, suburb analysis, market data, and acquisition strategies provided by the Company and will not disclose such information to third parties without the Company\'s prior written consent.')
        ]
      },
      {
        _key: 'sec9',
        title: '9. Intellectual Property',
        body: [
          block('All content on the Company\'s website — including text, images, graphics, logos, case studies, blog content, and research reports — is the intellectual property of JJ Property Partner PTY LTD or its licensors. You may not copy, reproduce, distribute, publish, or create derivative works from any website content without the Company\'s prior written consent.'),
          block('Research reports, property analysis documents, and suburb data provided to Clients during an engagement remain the intellectual property of the Company. Clients may use this material for their own personal property acquisition decisions but may not reproduce or distribute it commercially.')
        ]
      },
      {
        _key: 'sec10',
        title: '10. Limitation of Liability',
        body: [
          block('10.1 General Limitation', 'h3'),
          block('To the maximum extent permitted by Australian law, the Company\'s total liability to the Client for any claim arising out of or in connection with the Services — whether in contract, tort (including negligence), statute, or otherwise — is limited to the total fees paid by the Client to the Company under the relevant Engagement Agreement.'),
          block('10.2 Exclusion of Consequential Loss', 'h3'),
          block('To the maximum extent permitted by Australian law, the Company excludes all liability for indirect, consequential, special, or incidental loss or damage, including loss of profits, loss of expected capital gains, loss of rental income, or any other economic loss arising from or in connection with the Services or the Client\'s reliance on any advice or information provided by the Company.'),
          block('10.3 Consumer Guarantees', 'h3'),
          block('Nothing in these Terms and Conditions excludes, restricts, or modifies any right or remedy, or any guarantee, warranty, or other term or condition, implied or imposed by the Australian Consumer Law (Schedule 2, Competition and Consumer Act 2010 (Cth)) that cannot be lawfully excluded or limited. Where the Australian Consumer Law applies, our liability is limited to the re-supply of the relevant services.'),
          block('10.4 Property Market Risks', 'h3'),
          block('The Client acknowledges that property investment involves inherent risks including market fluctuations, changes in interest rates, legislative changes, and economic conditions beyond the Company\'s control. The Company does not guarantee any particular investment outcome, capital growth, or rental yield. The Client accepts full responsibility for their property acquisition decisions.')
        ]
      },
      {
        _key: 'sec11',
        title: '11. Indemnity',
        body: [
          block('The Client indemnifies and holds harmless the Company, its directors, employees, and agents from and against any claims, losses, damages, costs (including legal costs on a solicitor-client basis), and expenses arising out of or in connection with:'),
          listItem('Any breach of these Terms and Conditions by the Client'),
          listItem('The Client\'s failure to comply with their obligations under any property contract'),
          listItem('False or misleading information provided by the Client to the Company'),
          listItem('The Client\'s failure to obtain appropriate financial, legal, or SMSF advice before making an acquisition decision')
        ]
      },
      {
        _key: 'sec12',
        title: '12. Termination',
        body: [
          block('12.1 Termination by the Client', 'h3'),
          block('The Client may terminate the Engagement Agreement at any time by providing written notice to the Company. Upon termination, the Client is liable for:'),
          listItem('Payment of all fees for Services performed to the date of termination'),
          listItem('Any non-refundable retainer fees as specified in the Engagement Agreement'),
          listItem('Reimbursement of any out-of-pocket expenses incurred by the Company prior to termination'),
          block('Where the Client terminates the engagement after the Company has identified a property and the Client subsequently purchases that property within 12 months of termination, the full success fee will remain payable.'),
          block('12.2 Termination by the Company', 'h3'),
          block('The Company may terminate the Engagement Agreement by providing written notice to the Client if: the Client materially breaches these Terms and Conditions and fails to remedy the breach within 14 days; the Client provides false/misleading information; payment of fees is overdue by 30 days; a conflict of interest arises; the Company must terminate to comply with AML/CTF obligations; or the Client\'s conduct is unreasonable/abusive.'),
          block('12.3 Effect of Termination', 'h3'),
          block('Termination of the Engagement Agreement does not affect any accrued rights or obligations of either party prior to termination. Clauses relating to confidentiality, intellectual property, limitation of liability, and dispute resolution survive termination.')
        ]
      },
      {
        _key: 'sec13',
        title: '13. Dispute Resolution',
        body: [
          block('13.1 Negotiation: If a dispute arises, the parties agree to first attempt to resolve the dispute through good-faith negotiation within 14 days of written notice of the dispute.'),
          block('13.2 Mediation: If the dispute is not resolved through negotiation within 14 days, either party may refer the dispute to mediation with an agreed mediator or a mediator nominated by the Law Society of New South Wales. The costs of mediation will be shared equally.'),
          block('13.3 Regulatory Complaints: Disputes relating to the conduct of a licensed buyers agent may be referred to NSW Fair Trading at any time.'),
          block('13.4 Governing Law: These Terms and Conditions are governed by the laws of New South Wales, Australia. Each party submits to the non-exclusive jurisdiction of the courts of New South Wales.')
        ]
      },
      {
        _key: 'sec14',
        title: '14. Website Terms of Use',
        body: [
          block('14.1 Website Access: Access to and use of the Company\'s website is provided on an \'as is\' basis. While we endeavour to keep the website current and accurate, we do not warrant that the website will be available at all times, free from errors or viruses, or that content is complete and up to date.'),
          block('14.2 Website Content: The information on our website is provided for general information purposes only and does not constitute financial, legal, or investment advice. You should not rely on website content as a substitute for professional advice specific to your circumstances.'),
          block('14.3 Prohibited Use: You must not use our website for any unlawful purpose or in a way that infringes the rights of others. Specifically, you must not scrape/crawl data, copy content without consent, or attempt to gain unauthorized access to our systems.'),
          block('14.4 External Links: Our website may contain links to third-party websites. These links are provided for convenience only. The Company does not endorse, control, or accept responsibility for the content of any linked third-party website.')
        ]
      },
      {
        _key: 'sec15',
        title: '15. Testimonials and Case Studies',
        body: [
          block('Client testimonials and case studies published on our website reflect the genuine experiences of past clients. All identifying information (names, property addresses) has been removed or altered to protect client privacy. Past client outcomes do not guarantee similar results for other clients.')
        ]
      },
      {
        _key: 'sec16',
        title: '16. Force Majeure',
        body: [
          block('The Company will not be liable for any delay or failure to perform its obligations under these Terms and Conditions where such delay or failure is caused by circumstances beyond the Company\'s reasonable control, including acts of God, natural disasters, pandemic, government action, legislative changes, market conditions, or communication/technology failures.')
        ]
      },
      {
        _key: 'sec17',
        title: '17. Amendments to Terms and Conditions',
        body: [
          block('The Company reserves the right to amend these Terms and Conditions at any time. Amended Terms will be published on the Company\'s website and will take effect from the date of publication. For existing engagements, amended Terms will apply to the extent they do not affect accrued rights under the existing Engagement Agreement. Your continued use of our website or engagement of our Services after any amendment constitutes your acceptance of the updated Terms and Conditions.')
        ]
      },
      {
        _key: 'sec18',
        title: '18. General Provisions',
        body: [
          block('18.1 Entire Agreement: These Terms and Conditions, together with the Engagement Agreement and the Company\'s Privacy Policy, constitute the entire agreement between the Company and the Client.'),
          block('18.2 Severability: If any provision of these Terms and Conditions is found to be invalid or unenforceable, that provision will be severed and the remaining provisions will continue in full force and effect.'),
          block('18.3 Waiver: The failure of either party to enforce any right or remedy will not constitute a waiver of that right or remedy in the future.'),
          block('18.4 Assignment: The Client may not assign or transfer their rights without prior written consent from the Company.'),
          block('18.5 Electronic Execution and Delivery: The Engagement Agreement, these Terms, and any notices may be executed and delivered electronically (e.g. DocuSign, Adobe Sign, or email PDF). An electronic signature has the same legal effect as a handwritten signature in accordance with the Electronic Transactions Act 2000 (NSW) and the Electronic Transactions Act 1999 (Cth).'),
          block('18.6 Privacy Policy: These Terms are to be read together with the Company\'s Privacy Policy, which is available on the Company\'s website at www.jjpropertypartner.com.au/privacy-policy.')
        ]
      },
      {
        _key: 'sec19',
        title: '19. Anti-Money Laundering and Counter-Terrorism Financing',
        body: [
          block('19.1 AML/CTF Obligations', 'h3'),
          block('JJ Property Partner PTY LTD is subject to obligations under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) (AML/CTF Act) and related rules and regulations to prevent financial crime in connection with property transactions.'),
          block('19.2 Client Identity Verification', 'h3'),
          block('The Company is required to verify the identity of all clients. The Client agrees to provide, upon request, required identity verification documents including government-issued photo ID, proof of residential address, and additional details for company/trust/SMSF structures showing beneficial owners.'),
          block('19.3 Expanded AML/CTF Obligations from 1 July 2026', 'h3'),
          block('From 1 July 2026, expanded AML/CTF obligations will apply to real estate professionals including buyers agents. The Company will be required to maintain an AML/CTF Program, conduct Customer Due Diligence (CDD), monitor transactions, submit Threshold Transaction Reports and Suspicious Matter Reports to AUSTRAC, and retain records for 7 years.'),
          block('19.4 Right to Refuse or Terminate', 'h3'),
          block('The Company reserves the right to refuse to commence services, suspend services, or terminate the Engagement Agreement immediately if the Client fails to provide identity verification documents, or if the Company has reasonable grounds to suspect illegal activity. The Company is prohibited by law from disclosing reasons for termination to the extent that it would involve tipping off.'),
          block('19.5 Tipping-Off Prohibition', 'h3'),
          block('Under the AML/CTF Act, the Company is prohibited from disclosing to the Client that a Suspicious Matter Report has been or may be submitted to AUSTRAC, or that an investigation is being considered.'),
          block('19.6 No Liability for AML/CTF Compliance Actions', 'h3'),
          block('The Company will not be liable to the Client for any loss, delay, damage, or inconvenience arising from the Company\'s compliance with its obligations under the AML/CTF Act.')
        ]
      },
      {
        _key: 'sec20',
        title: '20. Contact Us',
        body: [
          block('For all enquiries relating to these Terms and Conditions, please contact us:'),
          block('Contact Person: Alex, Founder & Principal Buyers Agent'),
          block('Email Address: info@jjpropertypartner.com.au'),
          block('Phone / WhatsApp: 0481 33 44 58'),
          block('Office Address: Sydney, New South Wales, Australia')
        ]
      }
    ]
  });
  console.log('Done Seeding Terms & Conditions.');
}

seed().catch(console.error);
