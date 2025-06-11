import { Pressable, Text, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
// import { HapticOptions } from 'react-native-haptic-feedback';

/**
	const HapticOpts: HapticOptions = {
		// The whole point is to vibrate
		ignoreAndroidSystemSettings: true
	};
*/

export default function Btn({
	name,
	haptic,
	intervalReceiver,
	ms = 100,
	single = false
}: {
	name: string;
	haptic: Haptics.AndroidHaptics;
	intervalReceiver: (interval: NodeJS.Timeout) => void;
	ms?: number;
	single?: boolean;
}) {
	const isDark = useColorScheme() === 'dark';

	return (
		<Pressable
			hitSlop={5}
			onPressIn={async () => {
				// Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
				// Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
				Haptics.performAndroidHapticsAsync(haptic);
				single ||
					intervalReceiver(
						setInterval(() => Haptics.performAndroidHapticsAsync(haptic), ms)
					);
			}}
			style={({ pressed }) => ({
				backgroundColor: pressed
					? isDark
						? 'rgba(255, 255, 255, 0.3)'
						: 'rgba(0, 0, 0, 0.3)'
					: isDark
						? 'rgba(255, 255, 255, 0.2)'
						: 'rgba(0, 0, 0, 0.1)',
				padding: 15,
				borderRadius: 10,
				margin: 10
			})}
		>
			<Text
				style={{
					color: isDark ? 'white' : 'black',
					fontSize: 14
				}}
			>
				{name}
			</Text>
		</Pressable>
	);
}
