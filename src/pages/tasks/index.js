import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';


const tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [userAuth, setUserAuth] = useState([]);
    const [listTask, setLitsTask] = useState([]);
    const useFocused = useIsFocused();

    const loadTasks = async () => {
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    }

    const loadUserAuth = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
        } catch (error) {
            console.log("Erro ao carregar o usuario", error)
        }
    }

    useEffect(() => {
        loadTasks();
        loadUserAuth();
        validarTasks()
    }, []);

    useEffect(() => {
        loadTasks();
        validarTasks();
    }, [useFocused ]);

    function validarTasks() {
        let colletionTasks = [];
        tasks.map(task => {
            if (task.usuarioId === userAuth.id) {
                colletionTasks.push(task)
            }
        })
        setLitsTask(colletionTasks)
    }
    async function updateTasks(task) {

        const params = {
            ...task,
            concluido: !task.concluido
        }
        try {
            await api.put(`tarefas/${task.id}`, params);
        } catch (error) {
            console.log('Erro ao atualizar a tarefa', error)
        }finally{
            loadTasks();
            validarTasks();
        }
    }


    async function deleteTasks(task) {
        try {
            await api.delete(`tarefas/${task.id}`)
        } catch (error) {
            console.log("Erro ao deletar a tarefa", error)
        }finally{
            loadTasks();
            validarTasks();
        }
    }

    return (
        <View>
            {listTask.length === 0 ? (
                <Text> Você não possui tarefas</Text>
            ) : (
                    <View>
                        {listTask.map(task => {
                            return (
                                <View key={task.id}>
                                    <Text> {task.descricao}</Text>
                                    <Text> {task.concluido ? (
                                        <>
                                            <TouchableOpacity onPress={() => updateTasks(task)}>
                                                <Feather name="check-circle" size={36} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteTasks(task)}>
                                                <Feather name="delete" size={36} color="black" />
                                            </TouchableOpacity>

                                        </>
                                    ) : (
                                            <TouchableOpacity onPress={() => updateTasks(task)}>
                                                <Feather name="circle" size={26} color="black"  />
                                            </TouchableOpacity>

                                        )}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                )}
        </View>
    )
};

export default tasks;