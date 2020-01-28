import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Day from './Day';

export default class Task extends Component<{title: string, description: string, color: string, taskKey: string, dateUID: string}, {expanded: boolean}> {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
	}

	onExpandCollapse = () => {
		this.setState(prevState => ({
				expanded: !prevState.expanded
		}));
	}

	renderDescription() {
		if (this.state.expanded) {
			return (
				<Text style={styles.description}>{this.props.description}</Text>
			);
		} else {
			return null
		}
	}

	render() {
		return (
			<View style={[styles.wrapper, {backgroundColor: this.props.color}]}>
				<View style={styles.titleWrapper}>
					<Text style={styles.title}>{this.props.title}</Text>
					<TouchableOpacity onPress={this.onExpandCollapse} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}} ><Icon style={[styles.expandCollapse, {transform: [{rotate: this.state.expanded ? '180deg' : '0deg'}]}]} name='ios-arrow-down' size={20} /></TouchableOpacity>
				</View>
				{this.renderDescription()}
				<View style={styles.days}>
					<Day letter="M" dayNumber={0} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="T" dayNumber={1} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="W" dayNumber={2} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="T" dayNumber={3} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="F" dayNumber={4} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="S" dayNumber={5} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
					<Day letter="S" dayNumber={6} taskKey={this.props.taskKey} dateUID={this.props.dateUID} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		borderBottomWidth: 0.5,
		padding: 10,
		borderBottomColor: '#ccc',
		marginHorizontal: 10,
		marginTop: 10,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	title: {
		fontSize: 20,
		fontWeight: '300',
		color: '#fff'
	},
	description: {
		fontSize: 16,
		paddingTop: 10,
		color: '#fff'
	},
	expandCollapse: {
		paddingLeft: 10,
		paddingRight: 10,
		color: '#fff',
		opacity: 0.5
	},
	titleWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	days: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10
	}
});