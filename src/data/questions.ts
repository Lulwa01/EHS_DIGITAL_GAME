import type { Audience, Difficulty, Question } from './types'

export const QUESTIONS: Record<Audience, Record<Difficulty, Question[]>> = {
  kids: {
    easy: [
      {
        scenario:
          'Ali loves playing online games. One day, he receives a message in the game from someone saying:',
        quote:
          'Congratulations! You won 1,000 free coins. Just tell me your username and password to claim your prize!',
        prompt: 'What should Ali do?',
        options: [
          'Share his username and password to get the free coins.',
          'Ignore the message and tell a parent or teacher.',
          'Reply and ask for even more coins.',
          'Send the player a friend request to say thanks.',
        ],
        answer: 1,
        tip: 'Real games never ask for your password in chat. Free prizes that need your password are always a trick.',
      },
      {
        scenario: 'Sara is watching videos on a tablet when a big flashing box pops up:',
        quote: 'YOU WON A NEW TABLET! Click here and type your mum’s phone number!',
        prompt: 'What should Sara do?',
        options: [
          'Click it quickly before the prize is gone.',
          'Type in her mum’s phone number.',
          'Close the pop-up and tell a grown-up.',
          'Send the link to her friends so they win too.',
        ],
        answer: 2,
        tip: 'Pop-ups that say “You won!” are fake. Close them and tell an adult. Never type family details.',
      },
      {
        scenario: 'Omar is making a new account for his favourite learning app.',
        prompt: 'Which password is the strongest?',
        options: ['123456', 'omar2016', 'Blue!Tiger7Jumps', 'password'],
        answer: 2,
        tip: 'Strong passwords are long and mix words, numbers and symbols. Never use your name or birthday.',
      },
    ],
    normal: [
      {
        scenario: 'Maryam is chatting in a game with a player she doesn’t know. They ask:',
        quote: 'Cool! Which school do you go to? And what street do you live on?',
        prompt: 'What should Maryam do?',
        options: [
          'Tell them, since they seem friendly.',
          'Only tell them her school, not her street.',
          'Don’t share it, stop chatting and tell a grown-up.',
          'Send a photo of her school instead.',
        ],
        answer: 2,
        tip: 'Your school, address and phone number are private. People online aren’t always who they say they are.',
      },
      {
        scenario: 'Yusuf’s best friend says:',
        quote: 'Give me your game password and I’ll level up your character while you sleep!',
        prompt: 'What should Yusuf do?',
        options: [
          'Share it. He’s his best friend.',
          'Keep it secret. Passwords are only shared with parents.',
          'Write it on a paper and give it to him at school.',
          'Share it, then change it next month.',
        ],
        answer: 1,
        tip: 'Even best friends shouldn’t have your password. Only a parent or guardian should know it.',
      },
      {
        scenario: 'Huda sees a website offering a “FREE premium version” of a paid game. It says to download a file.',
        prompt: 'What should Huda do?',
        options: [
          'Download it. Free is great!',
          'Ask a parent and only get apps from the official app store.',
          'Turn off the tablet’s safety settings so it installs.',
          'Download it on her parent’s phone instead.',
        ],
        answer: 1,
        tip: 'Downloads from random websites can hide viruses. Use the official app store and ask a grown-up first.',
      },
    ],
    hard: [
      {
        scenario: 'Ali gets an email that looks like it’s from his game company, but the address is support@plaayzone-help.com:',
        quote: 'Your account will be DELETED today! Log in here to save it.',
        prompt: 'What should Ali do?',
        options: [
          'Click the link fast so he doesn’t lose his account.',
          'Reply and ask if it’s real.',
          'Don’t click. Show a grown-up and open the real game app himself.',
          'Forward it to his friends to warn them.',
        ],
        answer: 2,
        tip: 'Scammers use scary deadlines and fake addresses that look almost right. Check with an adult and go to the real app yourself.',
      },
      {
        scenario: 'Noor’s new online friend says they’re 10 years old too, but their camera is “always broken”. Now they ask:',
        quote: 'Send me a photo of you! And don’t tell your parents, it’s our secret.',
        prompt: 'What should Noor do?',
        options: [
          'Send one photo. It’s only one.',
          'Send a photo of her pet instead.',
          'Keep chatting but don’t send anything.',
          'Don’t send anything, stop chatting and tell a trusted adult.',
        ],
        answer: 3,
        tip: 'Anyone who asks you to keep secrets from your parents is a red flag. Tell a trusted adult right away.',
      },
      {
        scenario: 'The family laptop suddenly shows a loud red screen:',
        quote: 'VIRUS DETECTED! Call this number NOW or your computer will break!',
        prompt: 'What should you do?',
        options: [
          'Call the number right away.',
          'Don’t call. Show a grown-up because it’s probably fake.',
          'Type your parent’s card number to fix it.',
          'Click every button until it goes away.',
        ],
        answer: 1,
        tip: 'Real virus alerts never ask you to call a number. These scary screens are fake and want to trick you.',
      },
    ],
  },

  teens: {
    easy: [
      {
        scenario: 'Layla gets a DM from a friend’s account with a link:',
        quote: 'omg is this you in this video?? 😂😂',
        prompt: 'What’s the safest move?',
        options: [
          'Click it to see what the video is.',
          'Log in when the link asks, to watch it.',
          'Don’t click. Message the friend another way to check if it’s really them.',
          'Share the link in the group chat to ask others.',
        ],
        answer: 2,
        tip: 'Hacked accounts send “is this you?” links to steal logins. Check with your friend outside that chat.',
      },
      {
        scenario: 'Hamad is at a café using the free, open Wi-Fi with no password.',
        prompt: 'What should he avoid doing?',
        options: [
          'Reading the news.',
          'Logging into his bank or important accounts.',
          'Checking the weather.',
          'Watching a video.',
        ],
        answer: 1,
        tip: 'Open Wi-Fi can be watched by others. Use mobile data for logins and anything private.',
      },
      {
        scenario: 'Zain gets a 6-digit login code by text he didn’t ask for. Then a message arrives:',
        quote: 'Sorry! I sent my verification code to your number by mistake. Can you send it back?',
        prompt: 'What should Zain do?',
        options: [
          'Send it back. It was a mistake.',
          'Never share the code. Someone is trying to log into his account.',
          'Send only the first three digits.',
          'Ask them to call him first.',
        ],
        answer: 1,
        tip: 'A code you didn’t request means someone is trying to get into your account. Never share it, and change your password.',
      },
    ],
    normal: [
      {
        scenario: 'A big influencer seems to message Fatima from @realjenna.officiall (two Ls):',
        quote: 'You won my giveaway!! 🎉 Just pay the $4 shipping fee and the new phone is yours.',
        prompt: 'What should Fatima do?',
        options: [
          'Pay the $4. It’s cheap for a phone.',
          'Send her address but not payment.',
          'Recognise the fake account, don’t pay, and report it.',
          'Ask the account to lower the fee.',
        ],
        answer: 2,
        tip: 'Copycat accounts with tiny spelling changes run fake giveaways. Real prizes never need a fee.',
      },
      {
        scenario: 'Ahmed finds a cheap pair of sneakers online. The seller says:',
        quote: 'I only accept gift cards. Send me photos of the card codes and I’ll ship today.',
        prompt: 'What should Ahmed do?',
        options: [
          'Buy the gift cards. Great deal.',
          'Refuse. Gift-card payment is a classic scam sign.',
          'Pay half now with gift cards, half later.',
          'Send the codes but keep the receipt.',
        ],
        answer: 1,
        tip: 'Gift cards can’t be traced or refunded, which is why scammers love them. Use protected payment methods.',
      },
      {
        scenario: 'A fun quiz, “Which anime character are you?”, asks to sign in with your social account and see your contacts and messages.',
        prompt: 'What’s the best choice?',
        options: [
          'Allow everything. It’s just a quiz.',
          'Allow it, then delete the app later.',
          'Deny the permissions. A quiz doesn’t need your messages.',
          'Give it your friend’s account instead.',
        ],
        answer: 2,
        tip: 'Check app permissions. If an app wants more than it needs, it may be collecting your data.',
      },
    ],
    hard: [
      {
        scenario: 'Dana has chatted with someone for weeks. They now say:',
        quote: 'Let’s move to a private app nobody can see. Don’t tell anyone about us, okay?',
        prompt: 'What should Dana do?',
        options: [
          'Move apps. They’ve been friends for weeks.',
          'Move apps but keep screenshots.',
          'Say no to secrecy and talk to a trusted adult.',
          'Delete her account and tell no one.',
        ],
        answer: 2,
        tip: 'Groomers build trust over time, then push for secrecy and private apps. Secrecy is the warning sign.',
      },
      {
        scenario: 'Khalid hears that a gaming forum he joined was hacked. He uses the same password for his email and social media.',
        prompt: 'What should he do?',
        options: [
          'Nothing. He never posts on that forum.',
          'Change only the forum password.',
          'Change the password everywhere he used it, make each one unique, and turn on 2FA.',
          'Add a “1” to the end of the same password.',
        ],
        answer: 2,
        tip: 'Hackers try leaked passwords on other sites. Use a different password for every account and turn on two-factor login.',
      },
      {
        scenario: 'A poster at the mall says “Scan for FREE concert tickets!” The QR code opens a page asking for your email password.',
        prompt: 'What’s happening?',
        options: [
          'It’s normal. Ticket sites need your email password.',
          'It’s a phishing page. No real site needs your email password.',
          'It’s safe because it was on a real poster.',
          'It’s fine if the page looks professional.',
        ],
        answer: 1,
        tip: 'QR codes can lead to fake pages. Check the address and never enter a password for a different account.',
      },
    ],
  },

  adults: {
    easy: [
      {
        scenario: 'You receive an SMS:',
        quote: 'Your bank account has been LOCKED. Verify now at bank-secure-verify.co to restore access.',
        prompt: 'What should you do?',
        options: [
          'Tap the link and verify your details.',
          'Reply “STOP” to the message.',
          'Contact your bank using the official app or the number on your card.',
          'Forward it to family to check if they got it too.',
        ],
        answer: 2,
        tip: 'Banks don’t send login links by SMS. Reach them through channels you already trust.',
      },
      {
        scenario: 'A text says:',
        quote: 'Your parcel is on hold. Pay the $1.99 redelivery fee here: parcel-redeliver.info',
        prompt: 'You are expecting a delivery. What do you do?',
        options: [
          'Pay it. It’s only $1.99.',
          'Check the tracking number on the courier’s official website instead.',
          'Enter your card but not the CVV.',
          'Reply with your address to confirm.',
        ],
        answer: 1,
        tip: 'Small fees are bait to steal card details. Track parcels through the courier’s official site or app.',
      },
      {
        scenario: 'An email from an unknown sender has the subject “Overdue invoice” and an attachment named Invoice_2291.pdf.exe.',
        prompt: 'What should you do?',
        options: [
          'Open it to check the amount.',
          'Open it on your phone instead of your laptop.',
          'Don’t open it. Report it as phishing and delete it.',
          'Reply asking what the invoice is for.',
        ],
        answer: 2,
        tip: 'A “.pdf.exe” is a program pretending to be a document. Unexpected attachments are a top malware route.',
      },
    ],
    normal: [
      {
        scenario: 'An email from your CEO’s name, sent from a personal address, reads:',
        quote: 'I need you to process an urgent wire transfer today. Keep this confidential, I’m in meetings and can’t talk.',
        prompt: 'What’s the right response?',
        options: [
          'Process it. The CEO said it’s urgent.',
          'Reply to the email asking for confirmation.',
          'Verify through a separate, known channel before doing anything.',
          'Transfer half to be safe.',
        ],
        answer: 2,
        tip: 'Business email compromise relies on urgency, authority and secrecy. Always verify out-of-band.',
      },
      {
        scenario: 'Someone calls saying they’re from IT support:',
        quote: 'We’re fixing a problem with your account. Read me the code you just got on your phone.',
        prompt: 'What should you do?',
        options: [
          'Read them the code. They’re from IT.',
          'Ask for their name, then give the code.',
          'Refuse, hang up, and call IT on the official number.',
          'Text the code instead of saying it.',
        ],
        answer: 2,
        tip: 'Real IT staff never need your MFA code. Anyone asking for it is trying to take over your account.',
      },
      {
        scenario: 'A social media ad shows a celebrity promoting a crypto platform that “guarantees 30% monthly returns”.',
        prompt: 'What’s the smartest move?',
        options: [
          'Start small with $100 to test it.',
          'Invest because a celebrity endorsed it.',
          'Walk away. Guaranteed high returns are a scam signal.',
          'Invest and withdraw quickly before it collapses.',
        ],
        answer: 2,
        tip: 'No legitimate investment guarantees high returns. Celebrity endorsements in ads are often faked.',
      },
    ],
    hard: [
      {
        scenario: 'You get a voice note that sounds exactly like your brother:',
        quote: 'I’ve been in an accident and my phone is broken. Please send money to this account right now!',
        prompt: 'What should you do?',
        options: [
          'Send the money. It’s clearly his voice.',
          'Send half now, half after he calls.',
          'Call him back on his known number or ask a family code word first.',
          'Reply to the voice note asking for more details.',
        ],
        answer: 2,
        tip: 'AI can clone a voice from a few seconds of audio. Verify by calling back on a number you already have.',
      },
      {
        scenario: 'A regular supplier emails from their usual address:',
        quote: 'Please note our bank details have changed. Use the new account below for all future invoices.',
        prompt: 'What should you do?',
        options: [
          'Update the details. It came from their real address.',
          'Reply to the email to confirm the change.',
          'Call the supplier on the number already on file to verify.',
          'Pay the next invoice to both accounts.',
        ],
        answer: 2,
        tip: 'Compromised supplier mailboxes are common. Payment detail changes must be verified by phone using known contacts.',
      },
      {
        scenario: 'You bank with examplebank.com. You need to log in.',
        prompt: 'Which address is genuinely the bank’s?',
        options: [
          'examplebank.com.secure-login.net',
          'examplebank-login.com',
          'login.examplebank.com',
          'examp1ebank.com',
        ],
        answer: 2,
        tip: 'Read the domain right before the first single “/”. Only “…examplebank.com” at the end belongs to the bank.',
      },
    ],
  },
}
