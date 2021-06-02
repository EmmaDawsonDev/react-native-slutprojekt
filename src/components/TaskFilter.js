import React, { useState, useContext } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Color from "../constants/color"
import { getTasks } from '../api'
import AuthContext from '../store/AuthContext'
import Icon from 'react-native-vector-icons/FontAwesome5';

const TaskFilter = ({ setTasks }) => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const user = useContext(AuthContext)

  const getFilteredTasks = async () => {
    const tasks = await getTasks(user.token, filter, search)
    setTasks([...tasks])
  }

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.searchInput} placeholder="Search name..." />
      <RNPickerSelect style={{ inputIOS: styles.searchInput, inputAndroid: styles.searchInput }}
        placeholder={{}}
        onValueChange={(value) => setFilter(value)}
        items={[
          { label: 'All tasks', value: '' },
          { label: 'Done', value: 'done' },
          { label: 'Incomplete', value: 'incomplete' },
        ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    backgroundColor: Color.secondaryDark,
    width: '90%',
    borderLeftColor: Color.blue,
    borderLeftWidth: 10
  },
  searchInput: {
    backgroundColor: Color.grey,
    height: 50,
    borderRadius: 6,
    paddingLeft: 10
  }
})

export default TaskFilter