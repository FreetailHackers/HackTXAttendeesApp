
//Depricated. Leaving here in case is needed later

import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
export const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token)
		//TODO: Add to database
      },
	  // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
		// process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '518755674815',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
return null
}