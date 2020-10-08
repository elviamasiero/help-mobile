import React, {useEffect, useState, useCallback} from 'react';
import {Text, View} from 'react-native';
import { Icons } from './styles';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';


const tasks = () =>{
    const [tasks, setTasks] = useState([]);
    const [userAuth, setUserAuth] = useState([]);
    const [notTasks ,setNotTasks] = useState('');

    const loadTasks = async () =>{
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    }

    const loadUserAuth = async () =>{
        try {
            const user = JSON.parse( await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
        } catch (error) {
            console.log("Erro ao carregar o usuario", error)
        }
    }

    useEffect(() =>{
        loadTasks();
        loadUserAuth();
    },[])

    

    const updateTasks = useCallback(
        async (task) => {
        const params = {
            ...task,
            concluido: !task.concluido
          }
         try {
            await api.put(`tarefas/${task.id}`, params);
            loadTasks();
         } catch (error) {
             console.log('Erro ao atualizar a tarefa', error)
         }
        },[loadTasks],
      );

      async function deleteTasks(task){
          try {
              await api.delete(`tarefas/${task.id}`)
              loadTasks();
          } catch (error) {
              console.log("Erro ao deletar a tarefa", error)
          }
      }


    function listTasks(){
       return tasks.map( task =>{
            if(task.usuarioId === userAuth.id){
                return (
                    <View key={task.id}> 
                        <Text> {task.descricao}</Text> 
                        <Text> {task.concluido ? (
                                <Icons>
                                    <Feather name="check-circle" size={36} color="black" onPress={() => updateTasks(task)} />
                                    <Feather name="delete" size={36} color="black" onPress={() => deleteTasks(task)} />
                                </Icons>
                            ): (
                                    <Feather name="circle" size={36} color="black" onPress={() => updateTasks(task)}/>
                            )} 
                        </Text>
                    </View>
                 )    
            }
        }) 
         
    }


                            
    return (
        <View>
            {listTasks()}
        </View>
    )
};

export default tasks;