import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #f0f0f5;
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
    background-color: #ffff;
    color: #303030;
    font-size: 18px; 
    width: 250px;
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    margin-top:10px;
    margin-bottom:10px;
    text-align:center;
`;

export const Button = styled.TouchableOpacity`
    background-color: #F25E28;
    width: 250px;
    height: 38px;
    justify-content: center;
    align-items:center;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 5px; 
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px; 
`;
