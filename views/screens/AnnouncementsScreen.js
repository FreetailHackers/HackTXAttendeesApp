import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { LocalNotification } from '../../android/app/src/services/LocalPushController'
import { RemotePushController } from '../../android/app/src/services/RemotePushController'
 

<<<<<<< HEAD
 export default function AnnouncementsScreen() {
		return (
			<View style={styles.container}>
				<Text>Press a button to trigger the notification</Text>
				<View style={{ marginTop: 20 }}>
					<Button title={'Local Push Notification'} onPress={handleButtonPress} />
				</View>
			</View>
		 )
}

function handleButtonPress() {
	LocalNotification();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20
  }
})
=======
export default function AnnouncementsScreen ({navigation}) {
    return (
        <>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{flex : 1, backgroundColor: "#00FF00"}}>
                <Text>announcements</Text>
            </SafeAreaView>
        </>
    );
}
>>>>>>> origin/interface
