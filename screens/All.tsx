import React, { Component } from 'react';
import { FlatList, Share, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { all_tasks } from '../global';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from '../components/Task';
import { AsyncStorage } from 'react-native';

export default class All extends Component<{}, { date: Date }> {
	constructor(props) {
		super(props);

		this.state = {
			date: new Date()
		};
	}

	// Passing today's date and an offset of 1 will return Monday
	getLastDayOfWeek = (date: Date, offset: number): Date => {
		var d = new Date(date);
		d.setDate(d.getDate() + offset - d.getDay());
		return d;
	}

	// Takes a date and returns the date a certain number of days away
	getDateDaysFromDate = (date: Date, offset: number): Date => {
		var d = new Date(date);
		d.setDate(d.getDate() + offset);
		return d;
	}

	// Formats the date to show Mon - Sun
	getFormattedDate = (date: Date): string => {
		return this.getLastDayOfWeek(date, 1).toDateString().slice(0, -5) + " — " + this.getDateDaysFromDate(this.getLastDayOfWeek(date, 1), 6).toDateString().slice(0, -5);
	}

	// Decreases date by 7 days
	onLeft = (): void => {
		var d = new Date(this.state.date);
		d.setDate(d.getDate() - 7);
		this.setState(prevState => ({
			date: d
		}));
	}

	// Increases date by 7 days
	onRight = (): void => {
		var d = new Date(this.state.date);
		d.setDate(d.getDate() + 7);
		this.setState(prevState => ({
			date: d
		}));
	}

	getMessageForTask = async (task) => {
		var count = 0;

		const dateUID = this.dateToUID(this.state.date);
		
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_1") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_2") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_3") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_4") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_5") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_6") == "true") count++;
		if (await AsyncStorage.getItem(dateUID + "_" + task.key + "_7") == "true") count++;

		if (count > 0) {
			return "- " + task.message.replace("{days}", count == 1 ? "1 day" : count + " days") + "\r\n";
		}

		return "";
	}

	generateMessage = async () => {
		var res = "Thanks to Greenify, I reduced my environmental footprint by:";
		res += "\r\n";
		res += "\r\n";

		for (var i = 0; i < all_tasks.length; i++) {
			const str = await this.getMessageForTask(all_tasks[i]);
			if (str) {
				res += str;
			}
		}

		return res;
	}

	onShare = async () => {
		var msg = await this.generateMessage();
		await Share.share(
		{
			message: msg
		},
		{
			dialogTitle: 'Share'
		});
	}

	dateToUID = (date: Date): string => {
		return this.getLastDayOfWeek(date, 1).toDateString();
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={[styles.headerWrapper, styles.topPadding]}>
					<Text style={styles.header}>Greenify</Text>
					<View style={styles.datesWrapper}>
						<TouchableOpacity onPress={this.onLeft}><Icon style={styles.datesWrapperIcon} name='ios-arrow-back' size={20} /></TouchableOpacity>
						<Text style={styles.subheader}>{this.getFormattedDate(this.state.date)}</Text>
						<TouchableOpacity onPress={this.onRight}><Icon style={styles.datesWrapperIcon} name='ios-arrow-forward' size={20} /></TouchableOpacity>
					</View>
				</View>
				<FlatList contentContainerStyle={{paddingBottom: 100}} data={all_tasks} renderItem={({ item, index }) => <Task title={item.title} description={item.description} color={item.color} taskKey={item.key} dateUID={this.dateToUID(this.state.date)} />} />
				<TouchableHighlight onPress={this.onShare} style={styles.shareButtonWrapper} underlayColor="#dbb312">
					<Icon style={styles.shareIcon} name='md-share' size={30} />
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		flex: 1
	},
	header: {
		fontSize: 28,
		fontWeight: '300'
	},
	subheader: {
		fontSize: 18,
		fontWeight: '300'
	},
	headerWrapper: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		alignItems: 'center',
		backgroundColor: '#C4E538',
		paddingBottom: 10
	},
	topPadding: {
		paddingTop: 40
	},
	datesWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	datesWrapperIcon: {
		paddingLeft: 20,
		paddingRight: 20
	},
	shareButtonWrapper: {
		position: 'absolute',
		bottom: 25,
		right: 25,
		backgroundColor: '#f1c40f',
		borderRadius: 35,
		minHeight: 70,
		minWidth: 70,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10
	},
	shareIcon: {
		color: '#fff'
	}
});