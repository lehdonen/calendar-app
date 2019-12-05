import * as React from 'react';
import { Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Calendar extends React.Component {
    months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];
    days = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"];
    numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        selectedDate: new Date()
    }

    viewArray() {
        var array = [];
        array[0] = this.days;
 
        var month = this.state.selectedDate.getMonth();
        var daysInAMonth = this.numberOfDays[month];
        var counter = 1;

        for (var row = 1; row < 7; row++) {
            array[row] = [];

            for (var col = 0; col < 7; col++) {
                array[row][col] = -1;

                if (row >= 1 && counter <= daysInAMonth) {
                    array[row][col] = counter++;
                }
            }
        }

        return array;
    }

    changeMonth = (n) => {
        this.setState(() => {
            this.state.selectedDate.setMonth(this.state.selectedDate.getMonth() + n);
            return this.state;
        });
    }

    _onPress = (day) => {    
        this.setState(() => {
                this.state.selectedDate.setDate(day);
                return this.state;
        });
    };

    render() {
    
    var array = this.viewArray();
    var rows = [];

    rows = array.map((row, rowIndex) => {
    var rowContent = row.map((day) => {
        return (
            <Text style={{
                flex: 1,
                height: rowIndex == 0 ? 45 : 25,
                backgroundColor: day == this.state.selectedDate.getDate() ? '#777': '#fff',
                textAlign: 'center'}}

                onPress={() => this._onPress(day)}>
                {day != -1 ? day : ''}
            </Text>
            );
        });

        return (
            <View style={styles.rowStyle}>
                {rowContent}
            </View>
        );
    });

    return (
        <View>
            <Text style={styles.headerText}>
                {this.months[this.state.selectedDate.getMonth()]} &nbsp;
                {this.state.selectedDate.getFullYear()}
            </Text>
            <View style={styles.container}>
                <Button title="---            <---" onPress={() => this.changeMonth(-1)}/>
                <Button title="--->            ---" onPress={() => this.changeMonth(+1)}/>
            </View>
            {rows}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    headerText: {
        paddingTop: 40,
        paddingBottom: 40,
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center'
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 40,
        borderStyle: 'solid',
        borderWidth: 1, 
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});