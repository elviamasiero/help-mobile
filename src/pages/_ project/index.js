import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Picker } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { ButtonLogout, 
        ButtonLogoutText, 
        Expandir, Texto, 
        Input,
        ButtonCadastro,
        ButtonCadastroText,
        ButtonView,
        ButtonAdd } from './styles.js';
import Accordion from "../../components/Accordion";
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused } from '@react-navigation/native';



const project = () => {
    const [projects, setProjects] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [display, setDisplay] = useState('flex');
    const [newProjects, setNewProjects] = useState();
    const [userAuth, setUserAuth] = useState();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTasks, setNewTasks] = useState();
    const [selectedValue ,setSelectedValue] = useState();
    const { signOut } = useAuth();
    const useFocused = useIsFocused();
    const loadProjects = async () => {
        try {
            const response = await api.get('projetos')
            setProjects(response.data)
        } catch (error) {
            
        }
    }

    const loadUserAuth = async () =>{
        try {
            const user = JSON.parse( await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
            setSelectUser(null)
            setDisplay('flex')
        } catch (error) {
            
        }
    }

    const loadUser = async () =>{
        try {
           const response = await api.get('usuarios') 
           setUsers(response.data)
       
        } catch (error) {
            console.log(error,"Erro ao carregar os usuarios")
        }
    }

    const loadTasks = async () =>{
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    }

    useEffect(() =>{
        loadProjects();
        loadTasks();
        loadUser();
        loadUserAuth();
    },[])

   useEffect(() =>{
        loadUserAuth();
   },[useFocused || false]);
    function validarTasks (proj) {
        return tasks.map( task =>{
               if( task.projetoId === proj.id ){
               return <Expandir key={task.id} > 
                            <Texto > 
                                {task.descricao}
                            </Texto> 
                                {users.map(user => {
                                    if(user.id === task.usuarioId){
                                        return <Text> {user.nome} </Text> 
                                    }
                                })}
                            <Texto>
                                {task.concluido ? "Concluida" : "Pendente" } 
                            </Texto> 
                            
                    </Expandir>
                }
            })
        }

    async function addTasks(proj){

        if(!selectedValue){
            return
        }

        let task = tasks[tasks.length - 1]

        const params = {
            "descricao": newTasks,
            "concluido": false,
            "projetoId": proj.id,
            "usuarioId": selectedValue,
            "id": task.id + 1
        }

        try {
            await api.post('tarefas', params)
            loadProjects();
            loadTasks();
            setNewTasks(null)
            setSelectedValue(null)
        } catch (error) {
            console.log("Erro ao carregar a tarefa", error)
        }
    }

    async function addProjects(){

        if(!newProjects) return;

        let project= projects[projects.length -1];
        
        const params = {
            "descricao": newProjects,
            "idUsuario": userAuth.id,
            "id": project.id + 1
        }

        try {
            await api.post(`projetos`, params)
            setNewProjects(null);
            setSelectUser(null);
            setDisplay('flex');
            loadProjects();
        } catch (error) {
            console.log("eita carai", error)
        }
    }
    

    function InputTasks(proj) {
        let teste = proj;
        return (
               <View>
                    <Input value={newTasks} onChangeText={text => setNewTasks(text)} placeholder="Digite o nome da tarefa">                     
                     </Input>
                     <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            <Picker.Item  label="Selecione um usuario"  />
                        {users.map(user =>{
                            return(
                                <Picker.Item key={user.id} label={user.email} value={user.id} />
                            )
                        })}
                    </Picker>
                    <ButtonCadastro> 
                         <ButtonCadastroText onPress={() => addTasks(teste)}> Cadastrar </ButtonCadastroText>
                     </ButtonCadastro>
               </View>
            )
        }

    function buttonView(){
        setSelectUser('view')
        setDisplay('none')
    }

    function buttonAdd(){
        setSelectUser('addd')
        setDisplay('none')
    }

    async function Delete(proj){

        if(userAuth.id != proj.idUsuario) return;

        try {
          await api.delete(`projetos/${proj.id}`)
          loadProjects();
          loadTasks();
        } catch (error) {
          console.log(error, "delete error")
        }
    }

    return (

        <View style={{padding:20}}>
            <ButtonLogout onPress={() => signOut()}>
                <ButtonLogoutText> Sair </ButtonLogoutText>
            </ButtonLogout>

            <ButtonView style={{display:display}}onPress={() => buttonView()}> 
                <Text> Visualiazar Projetos</Text>
            </ButtonView>

            <ButtonAdd style={{display:display}} onPress={() => buttonAdd()}>
                <Text> Criar Novo Projeto </Text>
            </ButtonAdd>

            {selectUser === 'view' ? (
                <View>
                {projects.map((proj) =>{
                    return (
                        <Accordion
                        key={proj.id}
                        title={proj.descricao}
                        content={validarTasks(proj)}
                        excluir={<TouchableOpacity onPress={() => Delete(proj)}>
                            <Text> Deletar</Text>
                        </TouchableOpacity>}
                        add={'Adicionar'}
                        input={InputTasks(proj)}                   
                    />
                    )
                })}        
            </View>
            ):(
               <View>
                   {selectUser &&
                         <View>
                            <Input value={newProjects} 
                                    onChangeText={text => setNewProjects(text)} 
                                    placeholder="Digite o nome projeto">                     
                            </Input>
                            <ButtonCadastro> 
                                <ButtonCadastroText onPress={() => addProjects()}> Cadastrar </ButtonCadastroText>
                            </ButtonCadastro>      
                        </View>                        
                   }
               </View>
            )}  
        </View>
    )
};

export default project;