# Soltech Quote Builder

SOLTECH ENERGY — GET FREE QUOTE FORM

Build a complete, production-ready Soltech Energy – Get Free Quote web application.

The purpose of this page is to allow potential customers to quickly submit their details and electricity usage information so that the Soltech Energy team can review the enquiry and contact them.

The experience should be short, professional, mobile-friendly and designed primarily for customers opening the link through WhatsApp, Instagram or Facebook.

This must be a real functional application, not a visual mockup.

1. BRANDING

The entire application must look like an official Soltech Energy platform.

Use the existing Soltech Energy logo.

Use the Soltech Energy brand identity with:

 Blue

 Yellow

 White

 Clean neutral backgrounds where necessary

The overall visual style should feel:

Premium • Clean • Modern • Professional • Trustworthy • Energy-focused • Friendly

Do NOT create a completely new branding system.

Do NOT use:

 Excessive gradients

 Excessive glassmorphism

 Cartoon illustrations

 Generic SaaS styling

 Stock solar images

 Unnecessary decorative elements

 Excessive animations

Use subtle solar/energy-inspired elements only where they improve the design.

2. BRAND CREDENTIALS

Properly incorporate Soltech Energy's credibility into the page without making it feel like an advertisement.

Include a small credibility section or supporting line such as:

8+ Years of Experience

1,800+ Solar Sites

These should be visually integrated into the design rather than presented as a large promotional banner.

The page should communicate that the customer is submitting their enquiry to an established solar company.

3. FORM HEADER

At the top of the form:

Soltech Energy logo

Get Free Quote

Supporting text:

Get personalised guidance for your solar requirements.

Keep the header compact and premium.

4. FORM FIELDS

Keep the form short.

Do NOT add unnecessary questions.

The form should contain only these fields:

Full Name

Input field.

Placeholder:

Enter your full name

Required.

WhatsApp Number

Input field.

Placeholder:

Enter your WhatsApp number

Required.

Add proper Indian mobile number validation.

The user should be able to enter a standard 10-digit Indian mobile number.

Do not ask the user to enter the number twice.

Monthly Electricity Bill

Present this as selectable options rather than a free-text field.

Question:

What is your average monthly electricity bill?

Options:

 Less than ₹1,500

 ₹1,500 – ₹2,500

 ₹2,500 – ₹4,000

 ₹4,000 – ₹8,000

 More than ₹8,000

Only one option should be selectable.

Required.

Use clean selectable cards/pills that match the blue, yellow and white design.

The selected option should have a clear visual state.

PIN Code

Input field.

Placeholder:

Enter your PIN code

Keep this simple.

Required.

Validate that it is a valid 6-digit Indian PIN code.

5. DO NOT ADD THESE FIELDS

Do NOT ask for:

 Email

 Address

 City

 State

 Electricity bill upload

 Electricity connection number

 Property type

 Roof area

 Number of floors

 Solar system size

 Name of electricity provider

 Project details

 Login

 Signup

 Password

The form should remain extremely short.

The customer should be able to complete it in under 30 seconds.

6. TERMS & CONDITIONS

REMOVE TERMS AND CONDITIONS COMPLETELY.

Do NOT include:

 Terms & Conditions checkbox

 Privacy Policy checkbox

 "I agree..." text

 Terms of Use

 Privacy Policy links

 Consent checkbox

 Any similar legal text

There should be no checkbox before submission.

7. SUBMIT BUTTON

Use a prominent CTA:

Get My Free Quote

The button should use the Soltech blue/yellow/white brand combination.

Make it large enough for comfortable mobile tapping.

Add a subtle hover/press interaction.

While submitting, show a loading state:

Submitting...

Prevent duplicate submissions.

8. VALIDATION

Required fields:

 Full Name

 WhatsApp Number

 Monthly Electricity Bill

 PIN Code

If a field is missing, show a short friendly message.

Examples:

Please enter your name.

Please enter your WhatsApp number.

Please select your monthly electricity bill range.

Please enter a valid 6-digit PIN code.

Do not show technical error messages to customers.

9. DATABASE

Use Supabase for persistent storage.

Create the required database table for quote enquiries.

Store:

full_name

whatsapp_number

monthly_electricity_bill

pin_code

submitted_at

Automatically generate the submission timestamp.

Do not require customer authentication.

Do not expose Supabase credentials or secret keys on the client side.

Use the existing Supabase integration if already configured in the project.

10. SUCCESS SCREEN

After successful submission, replace the form with a clean confirmation screen.

Display:

Thank you, [Name]! ☀️

Supporting text:

We've received your details. Our Soltech Energy team will review your requirements and get in touch with you shortly.

You can also include:

8+ Years of Experience · 1,800+ Solar Sites

Keep this screen minimal.

Do not redirect the customer to another website.

Do not automatically open WhatsApp.

Do not attempt to send a WhatsApp API message.

11. ADMIN / LEAD DASHBOARD

Create a simple admin dashboard for Soltech Energy to view submitted enquiries.

The dashboard should show:

Overview

 Total enquiries

 Today's enquiries

 This week's enquiries

Lead List

Display:

 Full Name

 WhatsApp Number

 Monthly Electricity Bill

 PIN Code

 Date & Time

Allow sorting by:

 Newest

 Oldest

Allow filtering by monthly electricity bill range.

Keep the dashboard functional and simple.

Do NOT populate it with fake/sample leads.

If there are no submissions, show:

No enquiries yet.

12. MOBILE-FIRST DESIGN

The majority of users will open this page from WhatsApp.

Prioritize mobile.

On mobile:

 Form should fit comfortably within a short scroll

 Inputs should be large and easy to tap

 Bill options should be easy to select

 Submit button should be prominent

 Logo should be clearly visible

 No unnecessary navigation

 No unnecessary footer content

On desktop:

 Center the form

 Use generous whitespace

 Keep the form compact

 Use a premium card layout

 Maintain strong visual hierarchy

13. DESIGN DETAILS

Use:

 Rounded but professional cards

 Subtle shadows

 Clean borders

 Proper spacing

 Strong typography hierarchy

 Blue primary actions

 Yellow accent elements

 White card/background areas

The form should feel similar to the existing Soltech Energy website, chatbot and portfolio.

Reuse existing Soltech assets and styling if they are already available in the project.

Do not invent a different logo.

Do not replace the Soltech logo with a generic solar icon.

14. SOLTECH LOGO

Use the actual Soltech Energy logo prominently at the top of the form.

The logo should be:

 Properly sized

 Sharp

 Centered/aligned appropriately

 Not stretched

 Not distorted

Do not use an emoji as the company logo.

15. NO WHATSAPP API

Do NOT implement WhatsApp API automation.

The WhatsApp number is collected only so that the Soltech Energy team can contact the lead manually.

Do not integrate:

 Meta WhatsApp Cloud API

 360dialog

 Twilio WhatsApp

 Any paid WhatsApp API

 Any third-party messaging API

The form should simply save the customer's WhatsApp number in the database.

16. ACCESSIBILITY

Use semantic HTML.

Ensure:

 Proper labels

 Keyboard accessibility

 Visible focus states

 Readable contrast

 Large touch targets

 Accessible form controls

 Clear validation messages

17. TECHNICAL REQUIREMENTS

Build this as a real production-ready application.

Use reusable components for:

 Header / Logo

 Quote Form

 Bill Selection

 Form Validation

 Submission Handling

 Success Screen

 Admin Dashboard

 Lead Table

Handle:

 Loading states

 Validation errors

 Database errors

 Successful submission

 Empty database

 Duplicate submission prevention

18. COMPLETE USER FLOW

The final flow should be:

Customer receives Soltech link

↓

Opens Get Free Quote page

↓

Sees Soltech logo + Get Free Quote

↓

Enters Full Name

↓

Enters WhatsApp Number

↓

Selects Monthly Electricity Bill

↓

Enters PIN Code

↓

Clicks Get My Free Quote

↓

Data is saved to Supabase

↓

Customer sees confirmation screen

↓

Soltech team can open the admin dashboard and see the enquiry

↓

Soltech team manually contacts the customer on WhatsApp

19. FINAL QUALITY REQUIREMENT

The final result must look like an official Soltech Energy customer lead-generation platform, not an AI-generated template.

Prioritize:

Short form + premium design + strong branding + easy mobile experience + reliable data storage.

Do not add extra sections simply to make the page longer.

Every element should have a purpose.

Keep the experience simple enough that a customer can submit the enquiry in under 30 seconds.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/702d3287-a249-479c-9e13-98deec05298f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
