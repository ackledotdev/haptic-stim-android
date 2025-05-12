import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

/**
	import {
		HapticOptions,
		trigger as triggerHaptics
	} from 'react-native-haptic-feedback';

	const HapticOpts: HapticOptions = {
		// The whole point is to vibrate
		ignoreAndroidSystemSettings: true,
		enableVibrateFallback: false
	};
*/

export default function App() {
	const isDark = useColorScheme() === 'dark';

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding: 4,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: isDark ? '#000' : '#fff'
		},
		text: {
			color: isDark ? '#fff' : '#000'
		}
	});

	return (
		<SafeAreaView style={styles.container}>
			<Pressable
				hitSlop={10}
				onPressIn={async () => {
					// Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
					// Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
					setInterval(
						() =>
							Haptics.performAndroidHapticsAsync(
								Haptics.AndroidHaptics.Segment_Tick
							),
						100
					);
				}}
				style={({ pressed }) => [
					{
						backgroundColor: pressed
							? isDark
								? 'rgba(255, 255, 255, 0.3)'
								: 'rgba(0, 0, 0, 0.3)'
							: isDark
							? 'rgba(255, 255, 255, 0.2)'
							: 'rgba(0, 0, 0, 0.1)',
						padding: 20,
						borderRadius: 10
					}
				]}
			>
				<Text style={styles.text}>Test</Text>
			</Pressable>
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}
