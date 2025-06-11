import { StatusBar } from 'expo-status-bar';
import {
	Pressable,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	useColorScheme,
	View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import Btn from './components/Btn';
import HR from './components/HR';
import ClearBtn from './components/ClearBtn';

export default function App() {
	const isDark = useColorScheme() === 'dark';

	const styles = StyleSheet.create({
		root: {
			flex: 1,
			padding: 4,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: isDark ? '#000' : '#fff'
		},
		buttonContainer: {
			flex: 0,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			paddingHorizontal: 10
		},
		textRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			paddingHorizontal: 10,
			marginBottom: 20,
			gap: 10
		},
		text: {
			color: isDark ? '#fff' : '#000'
		},
		inputBlock: {
			color: isDark ? '#fff' : '#000',
			borderWidth: 1,
			borderColor: isDark ? '#555' : '#aaa',
			paddingHorizontal: 15,
			paddingVertical: 10,
			borderRadius: 5
		}
	});

	const [intervalMs, setIntervalMs] = useState(100);

	const [intervals, setIntervals] = useState<NodeJS.Timeout[]>([]);

	function clearIntervals() {
		for (const interval of intervals) clearInterval(interval);
		setIntervals([]);
	}

	function addInterval(interval: NodeJS.Timeout) {
		setIntervals((prev) => [...prev, interval]);
	}

	const [singleDispatch, setSingleDispatch] = useState(false);

	const Buttons: [string, Haptics.AndroidHaptics][] = [
		['Segment Tick', Haptics.AndroidHaptics.Segment_Tick],
		['Clock Tick', Haptics.AndroidHaptics.Clock_Tick],
		['Context Click', Haptics.AndroidHaptics.Context_Click]
	];

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.buttonContainer}>
				{Buttons.map(([name, haptic]) => (
					<Btn
						key={name}
						name={name}
						haptic={haptic}
						intervalReceiver={addInterval}
						single={singleDispatch}
						ms={intervalMs}
					/>
				))}
			</View>

			<HR />

			<View style={styles.textRow}>
				<Switch
					value={singleDispatch}
					onValueChange={setSingleDispatch}
					thumbColor='#e0a0ab'
					trackColor={{
						true: '#f0f',
						false: isDark ? '#888' : '#aaa'
					}}
				/>
				<Text style={styles.text}>Single Dispatch Mode</Text>
			</View>

			<View style={styles.textRow}>
				<TextInput
					keyboardType='numeric'
					style={styles.inputBlock}
					value={intervalMs.toString()}
					onChangeText={(v) => setIntervalMs(parseInt(v) || 0)}
				/>
				<Text style={styles.text}>Interval (ms)</Text>
			</View>

			<ClearBtn intervalClearer={clearIntervals} />
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}
