import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { APP_ID, APP_SIGN } from '../config';
export default function CallScrenn({ route, navigation }) {
    const { room } = route.params;
    console.log(room)
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={APP_ID}
                appSign={APP_SIGN}
                userID={`user-id-${Math.random().toString(7)}`}
                userName={"userName"}
                callID={`call-id-${Math.random().toString(7)}`}

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VOICE_CALL_CONFIG,
                    onCallEnd: (callID, reason, duration) => {
                        navigation.navigate('HomeScreen', {
                            callID,
                            reason,
                            duration
                        })
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});
