# The HackTX Attendee App
The application is split into a client and server folder, each of which has its own setup.  Click into each folder to see how to setup each individual portion.

# The HackTX Attendee App Frontend
This application was written to serve the needs of HackTX Attendees.

## How set up test environment

Make sure that the following are installed and configured for your respective device
* React Native (the cli, not Expo)
* npm (should come with node.js)
* cocoapods (only needed for iOS development, can only be done through a Mac)

First install all dependencies
```
npm install
```

For iOS, install all cocoapods dependencies
```
cd ios
pod install
cd ..
```

Then, run the following command in 1 window
```
npx react-native start
```

Finally, run the either of the following commands in another window, depending on which device you wish to work on the app
```
npx react-native run-android
npx react-native run-ios
```
