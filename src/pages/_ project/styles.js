import styled from 'styled-components/native';

export const ButtonLogout = styled.TouchableOpacity`
    background-color: red;
    margin: 90px;
    width: 120px;
    height: 30px;
    justify-content:center;
    align-items: center;
    border-radius: 8px;
    
`;

export const  ButtonLogoutText = styled.Text`
    color: #fff;
    font-size: 16px;
`;

export const Expandir = styled.Text`
    background-color: #ccc;
    margin: 1px;
    width: 400px;
    height: 40px;
    justify-content:center;
    align-items: center;
`;

export const AccordionContentArea = styled.View`
  padding: 20px;
  ${({ accordionState }) => accordionState && `display: none;`}
`;
