import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticOptions, trigger as triggerHaptics } from "react-native-haptic-feedback";

const HapticOpts: HapticOptions = {
// The whole point is to vibrate
	ignoreAndroidSystemSettings: true
};

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Pressable
				hitSlop={10}
				onPressIn={() => {
					triggerHaptics('rigid', HapticOpts)
				}}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.1)',
						padding: 20,
						borderRadius: 10
					}
				]}
			>
				<Text>Rigid</Text>
			</Pressable>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 4,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
