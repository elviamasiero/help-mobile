import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #ffff;
    padding: 20px;
    justify-content: center;
    align-items: center; 
    
`;

export const Logo = styled.Image`
    width: 230px;
    height: 230px;
    margin: 20px;
`;

export const Input = styled.TextInput`
    background-color: black;
    margin: 10px;
    font-size: 19px
    padding-vertical: 10px;
    padding-horizontal: 180px;
    margin-bottom: 15
    px;
    border-radius: 4px;
`;

export const Button = styled.TouchableOpacity`
    background-color: red;
    padding: 12px;
    align-self: center;
    border-radius: 5px;   
`;

export const ButtonText = styled.Text`
    font-weight: bold;
    font-size: 22px;    
    color: #ffff;  
`;
