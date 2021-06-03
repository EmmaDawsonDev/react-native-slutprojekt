import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Color from "../../constants/color"
import Icon from 'react-native-vector-icons/FontAwesome5';

//dynamiska variabler via props: Icon, Text, borderColor
const BaseCard = props => {
    return(
        <TouchableOpacity style={styles.card}>
            <Icon name="key" size={36} color="white" />
            <Text style={styles.cardText}>Base Card</Text> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Color.secondaryDark,
        height: 160,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',

        //-- BordeRadiusr and Shadow ---//
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        shadowColor: 'black',
        shadowOffset:{ width: 0, height:2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        
        borderBottomWidth: 10,
        borderBottomColor: Color.blue // from props

    },
    cardText:{
        color: 'white',
        marginTop: 30
    }
})

export default BaseCard