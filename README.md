
# InfoStream Mobile App

InfoStream Mobile is a React Native application that provides users with the latest news from various categories using **The Guardian API**. It includes user authentication for sign-in and sign-out, managed via a **Django** backend.

## Features

- **News Feeds**: Displays the latest articles from various categories such as technology, business, sports, and more.
- **Search Functionality**: Allows users to search for specific news articles.
- **User Authentication**: Sign-up, sign-in, and sign-out functionality using a Django backend.
- **Modern Mobile UI**: Built with React Native for a seamless mobile experience on both iOS and Android.

## Technologies Used

### Mobile:
- **React Native**: Framework for building native mobile apps using JavaScript and React.
- **Expo**: A toolchain for developing and deploying React Native apps quickly.
- **The Guardian API**: Provides real-time news data.

### Backend:
- **Django**: Python-based web framework for handling user authentication and serving as the API backend.
- **Django REST Framework (DRF)**: Used for creating REST APIs that manage user authentication and data access.

## Installation and Setup

### Prerequisites:

- **Node.js**: Download and install Node.js [here](https://nodejs.org/).
- **Expo CLI**: Install Expo CLI globally using:
  ```bash
  npm install -g expo-cli
  ```


### Clone the Repository

```bash
git clone https://github.com/Osamaabdullahi/Infostream-Mobile-App.git
cd Infostream-Mobile-App
```

### Install Mobile Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
GUARDIAN_API_KEY=your_guardian_api_key
```

### Running the Application

Start the Expo development server:

```bash
expo start
```

The app can be tested on a physical device using the Expo Go app, or on an emulator/simulator.


