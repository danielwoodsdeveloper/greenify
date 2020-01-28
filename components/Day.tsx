import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AsyncStorage } from 'react-native';

export default class Day extends Component<{letter: string, dayNumber: number, taskKey: string, dateUID: string}, {toggled: boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        };
    }

    componentDidMount = () => {
        AsyncStorage.getItem(this.props.dateUID + "_" + this.props.taskKey + "_" + this.props.dayNumber).then((value) =>
            this.setState({toggled: value == "true"})
        );
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.dateUID !== this.props.dateUID) {
            this.setState({toggled: false});
            AsyncStorage.getItem(this.props.dateUID + "_" + this.props.taskKey + "_" + this.props.dayNumber).then((value) =>
                this.setState({toggled: value == "true"})
            );
        }
    }

    onPressButton = () => {
        AsyncStorage.setItem(this.props.dateUID + "_" + this.props.taskKey + "_" + this.props.dayNumber, !this.state.toggled ? "true" : "false");
        this.setState(prevState => ({
            toggled: !prevState.toggled
        }));
    }

	render() {
		return (
            <TouchableWithoutFeedback onPress={this.onPressButton} hitSlop={{top: 15, bottom: 15, left: 15, right: 15}} >
                <View style={styles.wrapper}>
                    <Text style={[styles.letter, {opacity: this.state.toggled ? 1 : 0.5, fontWeight: this.state.toggled ? '800' : '400'}]}>{this.props.letter}</Text>
                </View>
            </TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    letter: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    }
});