import React,{useState} from 'react';
import {View, Text, TouchableOpacity, ViewPagerAndroid} from 'react-native';
import { Container, Input, Button, ButtonText, Logo} from './styles';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';


const Login = () =>{
    var {signIn} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async () => {
        if(!email) return;
        if(!password) return;
        
      try {
        await signIn({email, password});
        console.log("handleSubmit success");

      } catch (error) {
        console.log("handleSubmit error", error);
      } 
    };

    return(
        <Container>
            <Logo source={{uri:"https://i.imgur.com/wv5M5jt.jpg"}} />
            <Input placeholder = "Email" value={email} onChangeText={text => setEmail(text)}/> 
            <Input placeholder = "Senha" value={password} onChangeText={text => setPassword(text)}/> 
            <Button onPress={() => handleSubmit()}>
                <ButtonText> Acessar </ButtonText>
            </Button>
        </Container>
    )
}

export default Login;