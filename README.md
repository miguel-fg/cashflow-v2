# Cash Flow

Cash Flow is a mobile application designed to help users manage their finances by tracking income, expenses, and budgets. This is the second iteration of Cash Flow, now built with React Native and Expo, running on a local SQLite database. The app provides an intuitive and convenient way to log transactions, monitor account balances, and set spending limits directly from your mobile device.


## Features

- **Authentication**: Secure local user authentication with hashed and salted passwords.
- **Account Management**: Add and manage multiple accounts, with balance, income, and expense tracking.
- **Transaction Tracking**: Log income and expenses with ease, view transaction history, and monitor balance changes over time with a dynamic graph.
- **Budget Management**: Set spending limits for categories, visualize spending distribution with a pie chart, and receive alerts when budget limits are reached or exceeded.
- **Data Visualization**: Balance and category spending charts to help users understand their financial habits.


## Run Locally

### Dependencies

- Node.js (LTS)
- Device with [Expo Go App](https://expo.dev/go) installed (Android OS preferred).

### Server setup

```bash
  git clone https://github.com/miguel-fg/cashflow-v2
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx expo start -c
```

Open the Expo Go App and scan the QR code shown in the terminal to  use the application.

## Installation on Android Device
An .apk file for Cash Flow will be available soon for direct download. This will allow you to install and use the app on your Android device without going through the Play Store or Expo Go.

The app will eventually be published to the Google Play Store once it has been thoroughly tested and I'm satisfied with its performance for the general public. Stay tuned for updates!

## Usage

- **Authentication**: Start by creating an account or logging in with existing credentials. 
- **Account Setup**: Add your financial accounts in the `Accounts` tab.
- **Home Page**: View your account balance, total expenses, and total income. Use the dropdown to switch between accounts. Add transactions to the selected account from this page.
- **Budgets**: View your top 5 spending categories, set budget limits for different categories and track their progress with visual indicators.
## Motivation

The motivation behind Cash Flow was to create a budgeting tool that meets my personal financial management needs. Most budgeting apps either lack essential features or come with a hefty price tag. I wanted an app that allows me to set budgets, track spending by category, and manage multiple accounts.
## Lessons Learned

This was my first time working with React Native, and transitioning from a web environment presented several challenges. Mainly ensuring cross-device compatibility, but also consideration of additional elements like notifications, navigation, and platform-specific behavior. Big big BIG thanks to [Expo](https://expo.dev) for making the experience much more familiar. 

**Disclaimer**: I was only able to test the app on Android devices and emulators, so I cannot confirm that it works as expected on iOS.


## Acknowledgements

This project would not be possible without 

 - [Icons8 Icons](https://icons8.com)
 - [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
 - [unDraw Illustrations](https://undraw.co)
 - [Expo](https://expo.dev)


## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
