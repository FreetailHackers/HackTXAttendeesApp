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

Finally, run the either of the following commands in another window, depending on which device you wish to work on the app.  Make sure when testing that the device is on the same connection as the server.  If you are unable to log into due to a failed request, make sure you have Quill set up, and try starting the Metro bundler with the cache reset (```npx react-native start --reset-cache```)
```
npx react-native run-android
npx react-native run-ios
```

## Quill
NOTE: For this application to run, you must have a working instance of HackTX Quill, which can be found [here](https://github.com/FreetailHackers/quill)

### Setting up/Configuration:

1. Clone the Quill repo and create a new branch based off the sponsorship-support branch
    1. git checkout -b <new-branch-name> sponsorship-support
2. Change your running version of Node to 10.17.0
    1. nvm install 10.17.0
    2. nvm use 10.17.0
3. Run 'npm install'
4. Run 'gulp server'

Finally, create a .env file, which contains the following
```
# Should work 99% of the time
SERVER_URL="http://<insert your local ip here>:3000"
```
