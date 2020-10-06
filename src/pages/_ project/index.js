import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { ButtonLogout, ButtonLogoutText } from './styles.js';
import Accordion from "../../components/Accordion";
import api from '../../services/api'



const project = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const { signOut } = useAuth();
    const loadProjects = async () => {
        try {
            const response = await api.get('projetos')
            setProjects(response.data)
        } catch (error) {
            
        }
    }

    const loadTasks = async () =>{
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            
        }
    }

    useEffect(() =>{
        loadProjects();
        loadTasks();
    },[])

    function validarTasks (proj) {
        return tasks.map( task =>{
               if( task.projetoId === proj.id ){
               return <Text style={{width:20}}> {task.descricao} {task.concluido ? "Concluida" : "Pendente" }</Text> 
               }
        })
    }

    return (

        <View>
            <ButtonLogout onPress={() => signOut()}>
                <ButtonLogoutText> Sair </ButtonLogoutText>
            </ButtonLogout>

            <View className="App">
                {projects.map((proj) =>{
                    return (
                        <Accordion
                        key={proj.id}
                        title={proj.descricao}
                        content={validarTasks(proj)}
                    />
                    )
                })}
                
            </View>
        </View>
    )
};

export default project;