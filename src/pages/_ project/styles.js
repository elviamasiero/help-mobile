import styled from 'styled-components/native';

export const Header = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 15px;
    height: 40px;
`;


export const ViewLogout = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    margin-right: 40px;
`;

export const LogoutText = styled.Text`
    color: #303030;
    font-size: 16px;
    margin-bottom: 40%;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items:center;
    padding: 0 15px;
`;

export const ButtonView = styled.TouchableOpacity`
    background-color: red;
    width: 220px;
    height: 50px;
    justify-content: center;
    align-items:center;
    border-radius: 50px;
    margin-bottom: 40px; 
`;

export const ButtonTextHome = styled.Text`
    color: #fff;
    font-size: 20px;
`;

export const ButtonAdd = styled.TouchableOpacity`
    background-color: green;
    width: 220px;
    height: 50px;
    justify-content: center;
    align-items:center;
    border-radius: 50px;
`;

export const Expandir = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Texto = styled.Text`
    justify-content: space-between;
    width: 200px;
`;

export const Input = styled.TextInput`
    background-color: #fff;
    color: #303030;
    font-size: 18px; 
    width: 250px;
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    margin-bottom: 10px;
`;

export const ButtonSignUp = styled.TouchableOpacity`
    background-color: red;
    width: 250px;
    height: 40px;
    justify-content: center;
    align-items:center;
    border-radius: 8px;   
`;

export const ButtonSignUpText = styled.Text`
    color: #fff;
    font-size: 18px; 
`;

