import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native'

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
   const [tasks, setTasks] = useState<Task[]>([]);
  const [darkSelected, setDarkSelected] = useState(false);
  
  function handleTemaMode() {
    setDarkSelected(!darkSelected)
  }

  function handleAddTask(newTaskTitle: string) {

    if (newTaskTitle) {

      setTasks(oldTasks => [
        {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        },
        ...oldTasks
      ])

    }
  }

  function handleMarkTaskAsDone(id: number) {

    const doneAndTasks = tasks.map( task => {

      if( task.id === id ){
        task.done = !task.done
      }
      return task
    })
    setTasks(doneAndTasks)

    setTimeout(() => {

      const noDoneTasks = doneAndTasks.filter(task => task.done === false )
      const doneTasks = doneAndTasks.filter(task => task.done === true )
  
      setTasks([...noDoneTasks, ...doneTasks])
    }, 250)
  }

  function handleRemoveTask(id: number) {

    setTasks(oldTasks => oldTasks.filter(
      task => task.id != id
    ))
  }

  return (
    <View style={
      darkSelected ? {backgroundColor: '#191D3A', flex: 1} : {backgroundColor: '#ffffff'}
    }>
      <Header isDark={darkSelected} changeTheme={handleTemaMode} />

      <TodoInput isDark={darkSelected} addTask={handleAddTask} />

      <MyTasksList
        isDark={darkSelected}
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
      
    </View>
  )
}
