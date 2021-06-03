import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Color from "../constants/color"
import AuthContext from '../store/AuthContext'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TaskButton = props => {
    const styles = StyleSheet.create({
        taskContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 30,
            paddingHorizontal: 34,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: Color.secondaryDark,
            borderLeftWidth: 10,
            borderLeftColor: props.task.done ? Color.pelleGreen : Color.red,

            marginTop: 20,
            //-- Border and Shadow ---//
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            // Works only on IOS
            shadowColor: 'black',
            shadowOffset:{ width: 0, height:2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,

            // Works only on Android
            elevation: 5
        },
        taskContent: {
            display: 'flex',
            color: 'white',
            fontSize: 24,

        }
    })
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.taskContainer}>
            <Text style={styles.taskContent}>
                {props.task.title}
            </Text>
            <Icon name="caret-right" size={36} color="white" />
        </TouchableOpacity>
    )
}


export default TaskButton