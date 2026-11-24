import type { Audience, Difficulty, Question } from './types'

export const QUESTIONS: Record<Audience, Record<Difficulty, Question[]>> = {
  kids: {
    easy: [
      {
        scenario: 'You are playing Roblox and a website claims it can give you free Robux if you enter your Roblox username and password.',
        prompt: 'What should you do?',
        options: [
          'Enter your username and password to get the Robux.',
          'Ask for even more free Robux.',
          'Ignore the website and tell a trusted adult.',
        ],
        answer: 2,
        tip: 'Real Roblox rewards never require your password.',
      },
      {
        scenario: 'You see a TikTok challenge where people are sharing screenshots of their gaming profiles. The screenshot includes your email address.',
        prompt: 'What should you do?',
        options: [
          'Post the screenshot as it is.',
          'Hide your email address before posting.',
          'Add more personal information so others can find you.',
        ],
        answer: 1,
        tip: 'Keep personal information private online.',
      },
      {
        scenario: 'While watching YouTube, a pop-up appears claiming that you have won a free iPhone and asks you to click a link.',
        prompt: 'What should you do?',
        options: [
          'Click the link immediately before the offer expires.',
          'Enter your home address to claim the prize.',
          'Close the pop-up and ask a trusted adult about it.',
        ],
        answer: 2,
        tip: 'If something seems too good to be true, it probably is.',
      },
      {
        scenario: 'You are playing an online game and another player asks for your account password so they can help you unlock special rewards.',
        prompt: 'What should you do?',
        options: [
          'Share your password so they can help.',
          'Give them your password for a short time only.',
          'Never share your password and tell a trusted adult.',
        ],
        answer: 2,
        tip: 'Your password is private. Legitimate players, games, and companies will never ask for it.',
      },
      {
        scenario: 'While watching videos online, a pop-up appears saying your device is infected with a virus and asks you to download a program immediately.',
        prompt: 'What should you do?',
        options: [
          'Download the program right away.',
          'Click the warning to learn more about the virus.',
          'Close the pop-up and ask a trusted adult for help.',
        ],
        answer: 2,
        tip: 'Fake virus warnings are commonly used to trick people into downloading harmful software.',
      },
    ],
    normal: [
      {
        scenario: 'You receive an SMS that says:',
        quote: 'Your school portal account will be locked today. Reset your password now: school-portal-login.com',
        prompt: 'You weren’t expecting a password reset message. What should you do?',
        options: [
          'Click the link and reset your password immediately.',
          'Ignore it and log in through the official school portal or ask a teacher or parent.',
          'Send your password by SMS to confirm your account.',
        ],
        answer: 1,
        tip: 'Scammers often create fake websites that look like real school portals.',
      },
      {
        scenario: 'Your family often uses a food delivery app (Keeta). You receive a message saying:',
        quote: 'Your order cannot be delivered. Click here and enter your parent’s bank card details to continue.',
        prompt: 'But nobody in your family ordered food today. What should you do?',
        options: [
          'Enter the card details quickly.',
          'Click the link to see what’s wrong.',
          'Ignore the message and tell a parent or guardian.',
        ],
        answer: 2,
        tip: 'Scammers often pretend to be delivery companies to trick people into sharing payment information.',
      },
      {
        scenario: 'You’re about to post a TikTok video celebrating your birthday. In the background, a paper on the wall shows your full name, school name, and class number.',
        prompt: 'What should you do?',
        options: [
          'Post it because the information is already at school.',
          'Edit or crop the video so personal information isn’t visible.',
          'Add your home address in the caption too.',
        ],
        answer: 1,
        tip: 'Even small details in photos can reveal personal information.',
      },
      {
        scenario: 'You see an online advertisement for a gaming tournament with a large cash prize. To register, the website asks for your full name, home address, phone number, and school name.',
        prompt: 'What should you do?',
        options: [
          'Enter all the information so you can join quickly.',
          'Ask a parent or guardian to check if the tournament and website are legitimate.',
          'Register using a friend’s information.',
        ],
        answer: 1,
        tip: 'Only share personal information on trusted websites with the approval of a parent or guardian.',
      },
      {
        scenario: 'You receive a friend request from an account using your best friend’s name and photo. The account immediately asks you to share pictures from a recent school event.',
        prompt: 'What should you do?',
        options: [
          'Send the photos because the account looks like your friend.',
          'Accept the request and ask for more photos first.',
          'Contact your friend through a known account or another method to verify it is really them.',
        ],
        answer: 2,
        tip: 'Scammers can create fake accounts using someone else’s name and photo. Always verify unexpected requests.',
      },
    ],
    hard: [
      {
        scenario: 'You receive a message on TikTok from an account using your best friend’s name and profile picture:',
        quote: 'Hey! I got locked out of my account. Can you send me the verification code that was just texted to you?',
        prompt: 'A few seconds later, you receive a code by SMS. What should you do?',
        options: [
          'Send the code because it’s your friend.',
          'Send only part of the code.',
          'Call or contact your friend another way to check if it’s really them.',
        ],
        answer: 2,
        tip: 'Scammers often impersonate friends and ask for verification codes to steal accounts.',
      },
      {
        scenario: 'A player you’ve known on Discord for several months offers to help you fix a game issue. They ask you to share your screen and log into your account while they watch.',
        prompt: 'What should you do?',
        options: [
          'Share your screen because you’ve known them a long time.',
          'Share your screen but hide nothing.',
          'Avoid logging into accounts while screen sharing and ask a trusted adult for help.',
        ],
        answer: 2,
        tip: 'People can steal passwords and personal information simply by watching your screen.',
      },
      {
        scenario: 'You receive an SMS:',
        quote: 'Aramex: Your package could not be delivered due to an incorrect address. Please update your information within 24 hours to avoid cancellation.',
        prompt: 'You are expecting a package this week. What should you do?',
        options: [
          'Click the link and enter your details immediately.',
          'Ignore the message and check your shipment through the official Aramex app or website.',
          'Reply with your address and phone number.',
        ],
        answer: 1,
        tip: 'Scammers often impersonate delivery companies because many people are expecting packages.',
      },
      {
        scenario: 'You receive a call from someone claiming to work for a food delivery company:',
        quote: 'A mistake occurred with your last order. We’re issuing a refund. To process it, please provide the debit card number and security code.',
        prompt: 'You did order food earlier this week. What should you do?',
        options: [
          'Give the details to receive the refund.',
          'Give only the card number.',
          'Refuse and contact the company through the official app.',
        ],
        answer: 2,
        tip: 'Legitimate companies do not ask for sensitive card information over unsolicited calls.',
      },
      {
        scenario: 'You receive a message saying you have won a gaming tournament prize. To claim it, you must first pay a small delivery fee using a debit card.',
        prompt: 'What should you do?',
        options: [
          'Pay the fee so you can receive the prize.',
          'Ask if you can pay a larger amount to get the prize faster.',
          'Do not pay anything and verify the competition through the official organizer.',
        ],
        answer: 2,
        tip: 'Legitimate prizes do not require winners to pay fees upfront to receive their rewards.',
      },
    ],
  },

  adults: {
    easy: [
      {
        scenario: 'In City Center Mall, you enter a lift and see a QR code posted which says “Scan to enter the mall raffle for a car”.',
        prompt: 'What should you do?',
        options: [
          'Ask the mall officials about it.',
          'Tell everyone you know to scan to increase chances of winning.',
          'Post on social media asking if anyone tried scanning.',
        ],
        answer: 0,
        tip: 'Scammers stick fake QR codes in public places. Check with the venue before scanning anything that promises prizes.',
      },
      {
        scenario: 'You are in Primark and the cashier asks for your phone number to provide the receipt. There are other people in the queue behind you.',
        prompt: 'What is the safest way to provide your number in a public area?',
        options: [
          'Say the number louder.',
          'Write the number on your phone and show the cashier.',
          'Wait until other customers finish, then tell.',
        ],
        answer: 2,
        tip: 'Personal details said out loud can be overheard and misused. Share them privately when no one else is listening.',
      },
      {
        scenario: 'You get a call from a number claiming to be from Ila Bank. They said they detected a suspicious transaction and need your card details to confirm you are the right owner of the card.',
        prompt: 'What should you do?',
        options: [
          'Only give the last 4 digits of your card number.',
          'End the call and contact Ila Bank using its official number.',
          'Ask them to first send evidence of the suspicious transaction.',
        ],
        answer: 1,
        tip: 'Banks never ask for your card details over the phone. Hang up and call the number on your card or the bank’s official app.',
      },
      {
        scenario: 'You have an upcoming Gulf Air trip, and you receive an SMS saying your flight schedule has changed and to open the link attached to view changes; no other information is shown. This is not strange as you provided your contact information during booking.',
        prompt: 'What should you do?',
        options: [
          'Open the link.',
          'Reply to the SMS to first confirm the booking reference.',
          'Open the airline’s official app or website and check.',
        ],
        answer: 2,
        tip: 'Scammers time fake messages around real plans. Check bookings yourself through the official app or website, not a link.',
      },
      {
        scenario: 'You park your car at Seef Mall. A sign near the exit says to scan a QR to validate your parking and avoid additional charges. The QR code opens a page requesting your phone number, vehicle details and payment information.',
        prompt: 'What should you do?',
        options: [
          'Continue if the charge is less than 1 BHD.',
          'Enter only your vehicle details.',
          'Verify the process with the mall customer service.',
        ],
        answer: 2,
        tip: 'Fake parking QR codes are a common way to steal card details. If a scan asks for payment, confirm with the venue first.',
      },
    ],
    normal: [
      {
        scenario: 'You are expecting a package from Amazon. You receive a call from someone claiming to be the delivery driver saying they are outside but cannot find your house. They request that you send your location to double check.',
        prompt: 'What should you do?',
        options: [
          'Verify the delivery status through the courier’s official tracking service before sharing your location.',
          'Provide your address details over the phone.',
          'Send the location of the house near you, to be safe.',
        ],
        answer: 0,
        tip: 'Anyone can claim to be a driver. Confirm the delivery through the official tracking service before sharing where you live.',
      },
      {
        scenario: 'You attended the Autumn Fair in Exhibition World Center. A few days later, you receive an email addressed to you by name with a link to view event photos. However, the sender’s email address differs from previous event communications.',
        prompt: 'What should you do?',
        options: [
          'Continue with the link if it does not request any payment information.',
          'Check whether the sender’s name matches the event organizer’s name.',
          'Verify the email through an official event contact.',
        ],
        answer: 2,
        tip: 'Knowing your name doesn’t make an email genuine. A sender address that has changed is a red flag, so verify before clicking.',
      },
      {
        scenario: 'You receive a message from your friend on Instagram. They shared a link that looks suspicious, saying that this post reminded them of you.',
        prompt: 'What should you do?',
        options: [
          'Click on the link if it is from their official account.',
          'Contact your friend another way to confirm they really sent it.',
          'Switch to your mobile data, then click.',
        ],
        answer: 1,
        tip: 'Hacked accounts send scam links to friends. Check with your friend another way before opening anything.',
      },
      {
        scenario: 'At Jasmis, you scan a QR code on the table to view the menu. A page opens asking you to sign in with your email account to continue.',
        prompt: 'What should you do?',
        options: [
          'Continue if your phone doesn’t show a security warning.',
          'Sign in if the restaurant’s name and logo appear on the page.',
          'Ask the restaurant staff why an email login is required.',
        ],
        answer: 2,
        tip: 'A menu should never need your email password. Fake QR stickers can lead to login pages built to steal accounts.',
      },
      {
        scenario: 'It is your birthday and you receive a call from someone claiming to be Lilou Cafe. They said that they require your home address to deliver a birthday cake which someone ordered for you as a surprise.',
        prompt: 'What should you do?',
        options: [
          'Contact the bakery on their official number to confirm the delivery.',
          'Check with your close contacts, then decide if you should give the address.',
          'Ask the caller if they know your full name.',
        ],
        answer: 0,
        tip: 'A nice surprise is a perfect cover story. Call the business on its official number before giving out your home address.',
      },
    ],
    hard: [
      {
        scenario: 'You receive a call from someone claiming to be from a clinic where you recently booked an appointment. They ask you to send a photocopy of your CPR via WhatsApp to confirm your booking, or your appointment will be cancelled.',
        prompt: 'What should you do?',
        options: [
          'Contact the clinic through their official number to confirm it is real.',
          'Provide the photocopy if the clinic already has your CPR number.',
          'First ask the caller for the name of the doctor you booked the appointment with.',
        ],
        answer: 0,
        tip: 'Your CPR can be used to steal your identity. Pressure like “or it will be cancelled” is a warning sign, so call the clinic yourself.',
      },
      {
        scenario: 'You receive a call claiming to be from Batelco. The caller says there is a security issue with your router and asks you to install an app on your phone or computer so they can assist remotely.',
        prompt: 'What should you do?',
        options: [
          'Install it, but don’t provide any banking information.',
          'Ask for the name of the application and check its reviews first.',
          'End the call and contact Batelco through their official number.',
        ],
        answer: 2,
        tip: 'Remote access apps give strangers full control of your device. Never install one because of an unexpected call.',
      },
      {
        scenario: 'On an advertisement board near your local supermarket, you find a flyer advertising a free course and internship opportunity, supported by Tamkeen. You simply need to scan the QR code to register.',
        prompt: 'What should you do?',
        options: [
          'Scan it, there is nothing suspicious.',
          'Verify the opportunity through Tamkeen’s official website or channels.',
          'Ignore it, as it is too good to be true.',
        ],
        answer: 1,
        tip: 'Scammers use trusted names like Tamkeen to look real. Check opportunities on the official website before you register.',
      },
      {
        scenario: 'You park at a location you regularly use. A QR code attached to the parking meter says “Scan to Pay for Parking by BenefitPay”.',
        prompt: 'What should you do?',
        options: [
          'Scan the QR because it is on the parking meter.',
          'Ask another driver whether they used it.',
          'Verify the payment method through the official parking provider.',
        ],
        answer: 2,
        tip: 'A sticker can be placed on top of a real meter. Pay through the parking provider’s official app or method you already know.',
      },
      {
        scenario: 'You receive a call from someone claiming to represent a charity collecting donations for families in need. They offer to send you a payment link via WhatsApp to make donating faster and more convenient.',
        prompt: 'What should you do?',
        options: [
          'Donate immediately because charities rely on public trust and support.',
          'Search for the charity’s website or official account and donate from there.',
          'First ask for more information about the charity.',
        ],
        answer: 1,
        tip: 'Fake charities use good causes to rush you. Donate only through the charity’s official website or account.',
      },
    ],
  },
}
