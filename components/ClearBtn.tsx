import { Pressable, Text, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function ClearBtn({
	intervalClearer
}: {
	intervalClearer: () => void;
}) {
	const isDark = useColorScheme() === 'dark';

	return (
		<Pressable
			hitSlop={10}
			onPressIn={async () => intervalClearer()}
			style={({ pressed }) => [
				{
					backgroundColor: pressed
						? isDark
							? 'rgba(255, 93, 93, 0.6)'
							: 'rgba(255, 59, 59, 0.6)'
						: isDark
							? 'rgba(255, 90, 90, 0.4)'
							: 'rgba(255, 81, 81, 0.4)',
					padding: 20,
					borderRadius: 10
				}
			]}
		>
			<Text
				style={{
					color: isDark ? 'white' : 'black'
				}}
			>
				Stop
			</Text>
		</Pressable>
	);
}
