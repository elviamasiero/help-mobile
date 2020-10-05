import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import project from '../pages/_ project';
import tasks from '../pages/tasks'


const Auth= createMaterialTopTabNavigator();

const AppRoutes = () =>{
    return(
        <Auth.Navigator
            initialRouteName="Project"
        >
             <Auth.Screen name="Project" 
             component={project} />

            <Auth.Screen name="Tasks" 
                component={tasks} />
             
        </Auth.Navigator>
    )
}

export default AppRoutes;