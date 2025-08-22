
<img width="4096" height="1241" alt="ReadmeBanner" src="https://github.com/user-attachments/assets/11abfe05-711e-4ef1-b0e8-bed27ab93d9f" />

---
<h4 align="center">
A React Native + Expo app that helps users stay safe during activities by setting timers.  
If the user doesn’t check in when the timer ends, alerts are sent to selected emergency contacts.
</h4>

--- 
<h1 align="center">Safely</h1>
<summary>📑 <strong>Table of Contents</strong> (Click to expand)</summary>

1. [**About The Project**](#about-the-project)  
   ↳ 1.1 [Project Description](#11-project-description)  
   ↳ 1.2 [Built With](#12-built-with)  
2. [**Getting Started**](#getting-started)  
   ↳ 2.1 [Prerequisites](#21-prerequisites)  
   ↳ 2.2 [How to Install](#22-how-to-install)  
3. [**Features & Usage**](#features--usage)  
4. [**Demonstration**](#demonstration)  
5. [**Architecture / System Design**](#architecture--system-design)  
6. [**Unit Testing & User Testing**](#unit-testing--user-testing)  
7. [**Highlights & Challenges**](#highlights--challenges)  
8. [**Roadmap & Future Implementations**](#roadmap--future-implementations)  
9. [**Contributing & Licenses**](#contributing--licenses)  
10. [**Authors & Contact Info**](#authors--contact-info)  
11. [**Acknowledgements**](#acknowledgements)  
</details>

<hr style="height:2px; border:none; background:#F0F1A5;">

## About The Project  
A modern cross-platform mobile app for personal safety.


### 1.1 Project Description 
Safely is a React Native app designed to help users feel safer when traveling alone or in unfamiliar environments. It works by setting a timer with periodic check-ins. If the user fails to check in before the timer expires, their emergency contact(s) are alerted with their last known details.
 
 * Encourage peace of mind through regular check-ins.
 * Provide automatic alerts to trusted contacts in case of danger or inactivity.
 * Deliver a clean, modern, and intuitive user experience on both iOS and Android.
 * Provide a simple dashboard summary of user's timer data

#### Features include:
* 🕒 Countdown timer with animated safety waves.
* ✅ Customisable check-in intervals.
* 📲 SMS/Phone number processing for alerts.
* 🔐 Firebase-powered authentication and persistence.
* 📡 Cloud Firestore for real-time storage of user data.
* ➕ Cloud Functions to send SMS alerts

### 1.2 Built With 

**Frontend / Mobile**  
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white) 
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 

**Backend / Cloud**

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Cloud Functions](https://img.shields.io/badge/Firebase_Functions-FF9100?style=for-the-badge&logo=firebase&logoColor=black)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

**Database**

![Firestore](https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**Notifications & Device APIs** 

![Expo Notifications](https://img.shields.io/badge/Notifications-999999?style=for-the-badge)
![Expo SMS](https://img.shields.io/badge/SMS-333333?style=for-the-badge) 


## Getting Started

# 2.1 Prerequisites Ensure you have the following installed before running the app: 

* ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white) (v18 or higher)
* ![Expo](https://img.shields.io/badge/Expo_CLI-000020?style=flat-square&logo=expo&logoColor=white) 
* ![Firebase CLI](https://img.shields.io/badge/Firebase_CLI-FFCA28?style=flat-square&logo=firebase&logoColor=black)

> In order to make use of the SMS functionality with Twilio you will need to upgrade to the firestore Blaze Plan and add Cloud Functions to your project 

---
### 2.2 How to Install 
1. Clone the repository:
```
bash git clone https://github.com/KurtSchwimmbacher/SafelyApp.git 
cd safely
``` 
2. Install dependencies:
 ```
npm install
 ``` 
3. Run the app: 
```
npm start 
``` 
5. Deploy Cloud Functions: 
```
cd functions 
npm install
npm run deploy
```
---
## Features & Usage 
- ⏱️ **Custom Safety Timers**: 
Set safety timers for walks, trips, or activities. 
- 📲 **Check-in Alerts**:
Get reminded to check in when the timer ends. 
- 📩 **SMS Alerts via Twilio**: 
If no check-in is received, SMS alerts are sent to emergency contacts. 
- 📊 **Dashboard Summary**: 
View logged hours and most-used timers. 
- 🔔 **Push Notifications**: 
Expo Notifications for reminders and status updates. 
--- 

### **🎨 Usage Highlights**  
- **Timer Countdown**:
Users can easily configure a custom safety timer by selecting a duration and confirming the start. The setup screen provides a clean, simple interface with smooth controls, ensuring timers are created quickly and without confusion.

- **Timer Setup**: 
Once a timer is active, the countdown screen displays the remaining time with an animated wave effect that visually “drains down” as the timer runs. This gives users both a numerical and visual representation of their safety window, making it engaging and intuitive.

---

## Demonstration 📹 
Link to demo video: [Demo Video](https://drive.google.com/file/d/10KLjwpqMqiMYzO_2HIpNvMB4rxMOCKAp/view?usp=sharing)

--- 

## Architecture / System Design 
### System Design Flow 
- Mobile App (React Native, Expo) 
- Firebase Authentication & Firestore 
- Firebase Cloud Functions (Check-in logic + Twilio SMS) 
- Dashboard summary view (aggregated Firestore data)

### UI Designs

--- 

## Unit Testing & User Testing 
### ✅ Unit Testing Currently 
**not implemented**
Future plans include Jest + React Native Testing Library for: 
- Timer interactions 
- Dashboard summary data fetch 
- Cloud function triggers (mocked) 

### 👥 User Testing conducted informal user feedback rounds targeting: 
- **General Users**: for usability and check-in workflow testing 
- **General Users**: to validate the safety timer concept and dashboard usefulness 

--- 

## Highlights & Challenges
Throughout the development of the CC School Management System 

### Highlights 
| Feature            | Highlights                                   | 
|--------------------|----------------------------------------------|
| **Cloud Functions**| Automated SMS alerts via Twilio.             |
| **Animated Waves** | Animated waves that drain according to timer progress | 
| **Persistence**    | Firebase auth persistence with AsyncStorage. | 
| **Edit Modals**    | Visually aesthetic modal functinoality to edit timers and users  |
| **Dashboard**      | Insightful usage summary with hours logged + most used timers. |

### Challenges 
| Feature            | Challenges                                   | 
|--------------------|----------------------------------------------|
| **Twilio integration** | Functionality to send SMS automatically in backend |
| **Animated Waves**     | Precise Maths based functions to animate waves     |
| **TimerSetup**         | Initially Draggable knob, PanGestureHandler difficulties meant this had to change |
| **Assignment Course Relationship** | Fetching the relevent relationship details      |
| **Assignment File Uploads** | Storing Filees in backend           |

## Roadmap & Future Implementations

## Roadmap & Future Implementations 
- 🌐 **Location Sharing**: Share GPS location with emergency contacts. 
- 🔄 **Recurring Timers**: Auto-scheduled daily timers. 
- 📊 **Analytics Dashboard**: User-level activity insights. 
- 👨‍👩‍👧 **Group Safety Mode**: Track safety in small groups. 

---

## Contributing & Licenses 
> This project was developed as part of a university course requirement and is currently private and non-commercial. No external contributions are being accepted at this time. 

## Authors & Contact Info
Built with ❤️ by:
- **Kurt Schwimmbacher**
  
## Acknowledgements 
Special thanks to:
- **Vue.js** and the open-source community for powerful tools and documentation
- **Microsoft .NET Team** for backend scalability support
- **Code & Cloud Academy** lecturers and students for real-world testing and feedback
- Contributors of [Electron](https://www.electronjs.org/) for enabling seamless cross-platform desktop apps
- [Google Forms](https://forms.google.com) for collecting valuable user insights
