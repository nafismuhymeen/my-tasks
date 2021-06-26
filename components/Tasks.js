import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
const Tasks = ({ taskText, taskNumber, removeTask, number }) => {

    const [checkValue, setCheckValue] = useState(false);

    const checkOnChange = () =>{
        setCheckValue(true)
    }
    
    return (
        <View style={styles.tasks}>
            <View style={styles.taskLeft}>
                <Text style={styles.taskNumber}>{taskNumber}.</Text>        
                <Text style={styles.taskText}>{taskText}</Text>
            </View>
            {checkValue ? <Pressable onPress={()=> removeTask(number, setCheckValue)}><Icon name='delete' type='material-community' color='red' /></Pressable> : <CheckBox value={checkValue} disabled={checkValue} onChange={()=> checkOnChange()} />}
        </View>
    );
};

const styles = StyleSheet.create({
    tasks: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        borderColor: '#f8f8ff',
        borderStyle: 'solid',
        borderWidth: 2
    },
    taskLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    taskNumber: {
        fontSize: 16,
        fontWeight: '700'
    },
    taskText: {
        paddingLeft: 10,
        fontSize: 16,
        width: '85%'
    }
})


export default Tasks;