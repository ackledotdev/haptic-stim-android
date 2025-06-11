import { View, StyleSheet, useColorScheme } from 'react-native';

export default function HR() {
	const styles = StyleSheet.create({
		hr: {
			borderBottomColor: 'white',
			borderBottomWidth: StyleSheet.hairlineWidth,
			width: '80%',
			marginVertical: 40
		}
	});

	return <View style={styles.hr} />;
}
