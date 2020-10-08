import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Picker } from 'react-native';
import { useAuth } from '../../hooks/auth';
import Accordion from "../../components/Accordion";
import api from '../../services/api'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {Header,
        ViewLogout,
        Container,
        LogoutText,
        ButtonTextHome,
        Expandir, 
        Texto,
        Input,
        ButtonSignUp,
        ButtonSignUpText,
        ButtonView,
        ButtonAdd} from './styles.js';



const project = () => {
    const [projects, setProjects] = useState([]);
    const [selectUser, setSelectUser] = useState();
    const [display, setDisplay] = useState('flex');
    const [newProjects, setNewProjects] = useState();
    const [userAuth, setUserAuth] = useState();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTasks, setNewTasks] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const { signOut } = useAuth();
    const useFocused = useIsFocused();
    const loadProjects = async () => {
        try {
            const response = await api.get('projetos')
            setProjects(response.data)
        } catch (error) {

        }
    }

    const loadUserAuth = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('@HELP:user'));
            setUserAuth(user)
            setSelectUser(null)
            setDisplay('flex')
        } catch (error) {

        }
    }

    const loadUser = async () => {
        try {
            const response = await api.get('usuarios')
            setUsers(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar os usuarios")
        }
    }

    const loadTasks = async () => {
        try {
            const response = await api.get('tarefas')
            setTasks(response.data)
        } catch (error) {
            console.log(error, "Erro ao carregar as tasks")
        }
    }

    useEffect(() => {
        loadProjects();
        loadTasks();
        loadUser();
        loadUserAuth();
    }, [])

    useEffect(() => {
        loadUserAuth();
        loadTasks();
    }, [useFocused || false]);
    function validarTasks(proj) {
        return tasks.map(task => {
            if (task.projetoId === proj.id) {
                return <Expandir key={task.id} >
                    <Texto >
                        {task.descricao}
                    </Texto>
                    {users.map(user => {
                        if (user.id === task.usuarioId) {
                            return <Text key={user.id}> {user.nome} </Text>
                        }
                    })}
                    <Texto>
                        {task.concluido ? "Concluida" : "Pendente"}
                    </Texto>
                </Expandir>
            }
        })
    }

    async function addTasks(proj) {

        if (!selectedValue || selectedValue === 0) {
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

    async function addProjects() {

        if (!newProjects) return;

        let project = projects[projects.length - 1];

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
                    <Picker.Item label="Selecione um usuario" value={0} />
                    {users.map(user => {
                        return (
                            <Picker.Item key={user.id} label={user.nome} value={user.id} />
                        )
                    })}
                </Picker>
                <TouchableOpacity>
                    <Text onPress={() => addTasks(teste)}> Cadastrar </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function buttonView() {
        setSelectUser('view')
        setDisplay('none')
    }

    function buttonAdd() {
        setSelectUser('addd')
        setDisplay('none')
    }

    async function Delete(proj) {

        if (userAuth.id != proj.idUsuario) return;

        try {
            await api.delete(`projetos/${proj.id}`)
            loadProjects();
            loadTasks();
        } catch (error) {
            console.log(error, "delete error")
        }

        tasks.map(async (task) => {
            if (task.projetoId === proj.id) {
                try {
                    await api.delete(`tarefas/${task.id}`)
                } catch (error) {
                    console.log(error, 'Erro ao deletar a tarefa')
                }
            }
        })

    }

    return (
        <>  
            <Header>
                <ViewLogout>
                    <Feather name="arrow-left" size={28} color="#3b3b3b" onPress={() => signOut() } />
                    <LogoutText onPress={() => signOut() }> Logout </LogoutText>
                </ViewLogout>
            </Header>
           
            <Container >
                <ButtonView style={{ display: display }} onPress={() => buttonView()}>
                    <ButtonTextHome> Visualiazar Projetos</ButtonTextHome>
                </ButtonView>

                <ButtonAdd style={{ display: display }} onPress={() => buttonAdd()}>
                    <ButtonTextHome> Criar Novo Projeto </ButtonTextHome>
                </ButtonAdd>

                {selectUser === 'view' ? (
                    <View>
                        {projects.map((proj) => {
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
                ) : (
                        <View>
                            {selectUser &&
                                <View>
                                    <Input value={newProjects}
                                        onChangeText={text => setNewProjects(text)}
                                        placeholder="Digite o nome projeto">
                                    </Input>
                                    <ButtonSignUp>
                                        <ButtonSignUpText onPress={() => addProjects()}> Cadastrar </ButtonSignUpText>
                                    </ButtonSignUp>
                                </View>
                            }
                        </View>
                    )}
            </Container>
        </>
    )
};

export default project;