<br />

![GitHub repo size](https://img.shields.io/github/repo-size/KurtSchwimmbacher/SafelyApp?color=%23000000)

![GitHub watchers](https://img.shields.io/github/watchers/KurtSchwimmbacher/SafelyApp?color=%23000000)

![GitHub language count](https://img.shields.io/github/languages/count/KurtSchwimmbacher/SafelyApp?color=%23000000)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/KurtSchwimmbacher/SafelyApp?color=%23000000)

[![Instagram][instagram-shield]][instagram-url]

<!-- HEADER SECTION -->

<h5 align="center" style="padding:0;margin:0;">Kurt Schwimmbacher</h5>

<h5 align="center" style="padding:0;margin:0;">Student Number</h5>

<h6 align="center">Subject Name & Year</h6>

</br>

<p align="center">

  <a href="https://github.com/KurtSchwimmbacher/SafelyApp">

    <img src="https://github.com/user-attachments/assets/11abfe05-711e-4ef1-b0e8-bed27ab93d9f" alt="Logo" width="140" height="140">

  </a>

  <h3 align="center">SafelyApp</h3>

  <p align="center">

    A React Native + Expo app that helps users stay safe during activities by setting timers. If the user doesn't check in when the timer ends, alerts are sent to selected emergency contacts. <br>

      <a href="https://github.com/KurtSchwimmbacher/SafelyApp"><strong>Explore the docs »</strong></a>

   <br />

   <br />

<a href="https://drive.google.com/file/d/1PL75TUhcxyMy6YqxieeKrW-DU1f1sp7W/view?usp=sharing">View Demo</a>

    ·

    <a href="https://github.com/KurtSchwimmbacher/SafelyApp/issues">Report Bug</a>

    ·

    <a href="https://github.com/KurtSchwimmbacher/SafelyApp/issues">Request Feature</a>

</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)

  - [Project Description](#project-description)

  - [Built With](#built-with)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [How to install](#how-to-install)

- [Features and Functionality](#features-and-functionality)

- [Concept Process](#concept-process)

  - [Ideation](#ideation)

  - [Wireframes](#wireframes)

  - [User-flow](#user-flow)

- [Development Process](#development-process)

  - [Implementation Process](#implementation-process)

    - [Highlights](#highlights)

    - [Challenges](#challenges)

  - [Reviews and Testing](#reviews-and-testing)

    - [Feedback from Reviews](#feedback-from-reviews)

    - [Unit Tests](#unit-tests)

  - [Future Implementation](#future-implementation)

- [Final Outcome](#final-outcome)

  - [Mockups](#mockups)

  - [Video Demonstration](#video-demonstration)

- [Conclusion](#conclusion)

- [Roadmap](#roadmap)

- [Contributing](#contributing)

- [License](#license)

- [Contact](#contact)

- [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->

## About the Project

<!-- header image of project -->

![ReadmeBanner][image1]

### Project Description

Safely is a React Native app designed to help users feel safer when traveling alone or in unfamiliar environments. It works by setting a timer with periodic check-ins. If the user fails to check in before the timer expires, their emergency contact(s) are alerted with their last known details.

The app encourages peace of mind through regular check-ins, provides automatic alerts to trusted contacts in case of danger or inactivity, and delivers a clean, modern, and intuitive user experience on both iOS and Android.

### Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Twilio](https://www.twilio.com/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native SVG](https://github.com/react-native-svg/react-native-svg)

<!-- GETTING STARTED -->

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of the following installed on your machine:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **Expo CLI** - Install via `npm install -g expo-cli`
- **Firebase CLI** - Install via `npm install -g firebase-tools`

> **Note:** In order to make use of the SMS functionality with Twilio you will need to upgrade to the Firestore Blaze Plan and add Cloud Functions to your project. A second note is that you will need a Twilio account for the SMS functionality to work and a `.env` file with Twilio SID, Token, and phone number linked. If you don't want to set up Twilio, the message sending is console logged.

### How to install

#### Installation

Here are a couple of ways to clone this repo:

1. **Clone Repository** </br>

Run the following in the command-line to clone the project:

```sh
git clone https://github.com/KurtSchwimmbacher/SafelyApp.git
cd SafelyApp
```

2. **Install Dependencies** </br>

Run the following in the command-line to install all the required dependencies:

```sh
npm install
```

3. **Deploy Cloud Functions** </br>

Navigate to the functions directory and install dependencies:

```sh
cd functions
npm install
npm run deploy
```

4. **Run the App** </br>

Return to the root directory and start the Expo development server:

```sh
cd ..
npm start
```

5. **Get a free API Key** </br>

Set up your Firebase project and configure your environment variables. For Twilio SMS functionality, create a `.env` file in the functions directory with:

```js
TWILIO_ACCOUNT_SID = "ENTER YOUR SID";
TWILIO_AUTH_TOKEN = "ENTER YOUR TOKEN";
TWILIO_PHONE_NUMBER = "ENTER YOUR PHONE NUMBER";
```

<!-- FEATURES AND FUNCTIONALITY-->

## Features and Functionality

![EditTimerMockup][image2]

### Custom Safety Timers

Set safety timers for walks, trips, or activities. Users can easily configure a custom safety timer by selecting a duration and confirming the start. The setup screen provides a clean, simple interface with smooth controls, ensuring timers are created quickly and without confusion.

![TimerScreenMockup][image3]

### Timer Countdown with Animated Waves

Once a timer is active, the countdown screen displays the remaining time with an animated wave effect that visually "drains down" as the timer runs. This gives users both a numerical and visual representation of their safety window, making it engaging and intuitive.

![CreateTimerMockup][image4]

### Check-in Alerts

Get reminded to check in when the timer ends. The app uses Expo Notifications for push notifications and reminders to ensure users stay on top of their safety check-ins.

### SMS Alerts via Twilio

If no check-in is received, SMS alerts are automatically sent to emergency contacts through Firebase Cloud Functions integrated with Twilio. This ensures that trusted contacts are notified immediately if something goes wrong.

### Dashboard Summary

View logged hours and most-used timers. The dashboard provides insightful usage summary with hours logged and most used timers, giving users a clear overview of their safety activity.

<!-- CONCEPT PROCESS -->

## Concept Process

The `Conceptual Process` is the set of actions, activities and research that was done when starting this project.

### Ideation

The concept for SafelyApp was born from the need to provide a simple, effective solution for personal safety. The idea focused on creating a non-intrusive safety net that works in the background, allowing users to go about their activities with peace of mind.

Key ideation points:

- Simple timer-based check-in system
- Automatic alert system for emergency contacts
- Clean, modern user interface
- Cross-platform compatibility

### Wireframes

Wireframes were created to map out the user flow and interface design. The focus was on simplicity and ease of use, ensuring that users could set up and manage their safety timers with minimal effort.

### User-flow

The user flow was designed to be straightforward:

1. User creates an account or logs in
2. User sets up emergency contacts
3. User creates a safety timer with desired duration
4. Timer runs with visual countdown
5. User checks in before timer expires, or emergency contacts are alerted

<!-- DEVELOPMENT PROCESS -->

## Development Process

The `Development Process` is the technical implementations and functionality done in the frontend and backend of the application.

### Implementation Process

- Made use of **React Native** and **Expo** to implement a cross-platform mobile application.

- **Firebase Authentication** and **Firestore** for user authentication and data persistence.

- **Firebase Cloud Functions** integrated with **Twilio** for automated SMS alert functionality.

- **React Native Reanimated** and **React Native SVG** for smooth animations and custom wave effects.

- **Expo Notifications** for push notification reminders and status updates.

- **TypeScript** for type safety and improved developer experience.

- **AsyncStorage** for local data persistence and authentication state management.

#### Highlights

- **Automated SMS Alerts**: Successfully implemented automated SMS alerts via Twilio through Firebase Cloud Functions, providing reliable emergency contact notifications.

- **Animated Waves**: Created visually appealing animated waves that drain according to timer progress, providing both aesthetic appeal and functional visual feedback.

- **Persistence**: Implemented Firebase auth persistence with AsyncStorage, ensuring users remain logged in across app sessions.

- **Edit Modals**: Developed visually aesthetic modal functionality to edit timers and users, enhancing the user experience.

- **Dashboard**: Built an insightful usage summary with hours logged and most used timers, providing users with valuable insights into their safety activity.

#### Challenges

- **Twilio Integration**: Implementing functionality to send SMS automatically in the backend required careful configuration of Firebase Cloud Functions and Twilio API integration.

- **Animated Waves**: Creating precise math-based functions to animate waves that accurately reflect timer progress required extensive testing and refinement.

- **Timer Setup**: Initially attempted to use a draggable knob with PanGestureHandler, but encountered difficulties that required a pivot to a different input method for better reliability and user experience.

### Reviews & Testing

#### Feedback from Reviews

`Peer Reviews` were conducted by fellow students and lecturers. The following feedback was found useful:

- General users provided valuable feedback on usability and check-in workflow testing.
- Validation of the safety timer concept and dashboard usefulness was confirmed through user testing.

#### Unit Tests

`Unit Tests` are currently not implemented. Future plans include Jest + React Native Testing Library for:

- Timer interactions
- Dashboard summary data fetch
- Cloud function triggers (mocked)

### Future Implementation

- **Location Sharing**: Share GPS location with emergency contacts for enhanced safety tracking.

- **Recurring Timers**: Auto-scheduled daily timers for regular activities.

- **Analytics Dashboard**: User-level activity insights with detailed statistics and trends.

- **Group Safety Mode**: Track safety in small groups, allowing multiple users to share their safety status.

<!-- MOCKUPS -->

## Final Outcome

### Mockups

![EditTimerMockup][image2]

<br>

![TimerScreenMockup][image3]

<br>

![CreateTimerMockup][image4]

<!-- VIDEO DEMONSTRATION -->

### Video Demonstration

To see a run through of the application, click below:

[View Demonstration](https://drive.google.com/file/d/1PL75TUhcxyMy6YqxieeKrW-DU1f1sp7W/view?usp=sharing)

<!-- CONCLUSION -->

## Conclusion

SafelyApp successfully delivers a modern, intuitive solution for personal safety through a simple timer-based check-in system. The app combines clean design with robust backend functionality, providing users with peace of mind during their daily activities. The integration of Firebase, Twilio, and React Native technologies creates a reliable and scalable platform for safety management.

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/KurtSchwimmbacher/SafelyApp/issues) for a list of proposed features (and known issues).

Planned features include:

- Location sharing with emergency contacts
- Recurring timer functionality
- Enhanced analytics dashboard
- Group safety mode

<!-- CONTRIBUTING -->

## Contributing

This project was developed as part of a university course requirement and is currently private and non-commercial. No external contributions are being accepted at this time.

<!-- AUTHORS -->

## Authors

- **Kurt Schwimmbacher** - [KurtSchwimmbacher](https://github.com/KurtSchwimmbacher)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

- **Kurt Schwimmbacher** - [@kurts.portfolio](https://www.instagram.com/kurts.portfolio/)

- **Project Link** - https://github.com/KurtSchwimmbacher/SafelyApp

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [React Native](https://reactnative.dev/) - For providing the foundation to build cross-platform mobile applications
- [Expo](https://expo.dev/) - For simplifying the development and testing process
- [Firebase](https://firebase.google.com/) - For authentication, Firestore, and backend support
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - For enabling smooth animations
- [React Native SVG](https://github.com/react-native-svg/react-native-svg) - For custom wave effects and graphics
- [Twilio](https://www.twilio.com/) - For SMS functionality
- Open-source contributors – whose libraries, guides, and shared knowledge made development faster and more enjoyable

<!-- MARKDOWN LINKS & IMAGES -->

[image1]: https://github.com/user-attachments/assets/11abfe05-711e-4ef1-b0e8-bed27ab93d9f
[image2]: https://github.com/user-attachments/assets/8f19137d-8eb0-4d93-bc2e-f9c6880b9c7f
[image3]: https://github.com/user-attachments/assets/9c466d5b-0530-4b31-8edb-13c6eaed6c07
[image4]: https://github.com/user-attachments/assets/c596053e-1538-4d6d-8905-a3f18989f499

<!-- Refer to https://shields.io/ for more information and options about the shield links at the top of the ReadMe file -->

[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&colorB=555
[instagram-url]: https://www.instagram.com/kurts.portfolio/
