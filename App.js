import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, KeyboardAvoidingView, TextInput, ScrollView, } from 'react-native';
import Tasks from './components/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {



  const [tempInputValue, setTempInputValue] = useState('');
  const [currentTasks, setCurrentTasks] = useState([]);




//  Remove Task
  const removeTask = async (indexNumber, setValue) => {
    let tempTask = await AsyncStorage.getItem('myTasks');
    tempTask = JSON.parse(tempTask);
    tempTask.splice(indexNumber, 1);
    console.log(tempTask);
    await AsyncStorage.setItem('myTasks', JSON.stringify(tempTask));
    setCurrentTasks([...tempTask]);
    if (currentTasks.length != 1) {
      setValue(false);
    }
  } 



// Add Task 
  const addTask = async () => {
    if (tempInputValue) {
      try {
        let tempTask = await AsyncStorage.getItem('myTasks')
        if (tempTask != null) {
          tempTask = JSON.parse(tempTask)
          tempTask.push(tempInputValue);
          await AsyncStorage.setItem('myTasks', JSON.stringify(tempTask));
          setCurrentTasks([...tempTask]);
          setTempInputValue('');
          console.log(JSON.stringify(tempTask));
          console.log(currentTasks);
        }else{
          tempTask = [];
          tempTask.push(tempInputValue);
          await AsyncStorage.setItem('myTasks', JSON.stringify(tempTask));
          setCurrentTasks([...tempTask]);
          setTempInputValue('');
          console.log(JSON.stringify(tempTask+" "+'Else'));
          console.log(currentTasks);
        }
        
      } catch (error) {
        alert.error
      }
    }
  }



// App Load
  const loadTask = async () => {
    try {
      let tempTask = await AsyncStorage.getItem('myTasks');
      if (tempTask != null) {
        setCurrentTasks([...JSON.parse(tempTask)]);
        console.log('Hello world')
      }
      console.log(tempTask);
    } catch (error) {
      alert.error
    }
  }


  useEffect(()=>{
    loadTask()
  },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            My Tasks..
          </Text>
        </View>
        <View style={styles.taskInput}> 
          <TextInput placeholder='Add Task' style={styles.textInput} selectionColor='#428AF8' underlineColorAndroid='#428AF8' value={tempInputValue} onChangeText={(text)=> setTempInputValue(text)} />
          <Button title='Add' onPress={()=> addTask()}/>
        </View>
      
        <View style={styles.items}>
          {currentTasks.map((task, index)=> {return <Tasks removeTask={removeTask} key={index} taskText={task} number={index} taskNumber={index+1} />})}
        </View>
      

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  heading: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    width: '100%',
    paddingHorizontal: 20,
  },
  taskInput: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20
  }
});
