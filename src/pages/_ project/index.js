import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { ButtonLogout, ButtonLogoutText, Expandir, Texto } from './styles.js';
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
               return <Expandir> 
                            <Texto> 
                                {task.descricao}
                            </Texto> 
                            <Texto>
                                {task.concluido ? "Concluida" : "Pendente" } 
                            </Texto> 
                    </Expandir>
               }
        })
    }

    async function Delete(proj){
        try {
          await api.delete(`projetos/${proj.id}`)
          console.log("Foi")
        } catch (error) {
          console.log(error, "delete error")
        }
      }

    return (

        <View style={{padding:20}}>
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
                        excluir={<TouchableOpacity onPress={() => Delete(proj)}>
                            <Text> Deletar</Text>
                        </TouchableOpacity>}
                    />
                    )
                })}
                
            </View>
        </View>
    )
};

export default project;