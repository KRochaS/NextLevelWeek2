import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';


const {Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                inactiveBackgroundColor: '#FAFAFC',
                activeBackgroundColor: '#EBEBF5',
                inactiveTintColor: '#C1BCCC',
                activeTintColor: '#32264D'
            }}
        
        
        >
            <Screen name="TeacherList" options={{
                tabBarLabel: 'Proffys',
                tabBarIcon: ({color, size, focused}) => {
                    return (
                        <Ionicons name="ios-easel" size={size} color={focused ? '#8563ec' : color }/>
                    )
                }
            }} component={TeacherList} />
            <Screen options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({color, size, focused}) => {
                    return (
                        <Ionicons name="ios-heart" size={size} color={focused ? '#8563ec' : color }/>
                    )
                }
            }} name="Favorites" component={Favorites} />            
        </Navigator>
    )
}

export default StudyTabs;