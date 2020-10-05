import React from 'react';
import {Text} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {ButtonLogout, ButtonLogoutText} from './styles.js'


const project = () =>{
    const { signOut} = useAuth();
    return (
       <ButtonLogout onPress={() => signOut()}> 
           <ButtonLogoutText> Sair </ButtonLogoutText> 
        </ButtonLogout> 
    )
};

export default project;